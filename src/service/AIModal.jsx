import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_PROMPT } from "@/constants/options";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sendMessageWithRetry = async (prompt, maxRetries = 3) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Gemini request attempt ${attempt + 1}`);

      const result = await chatSession.sendMessage(prompt);

      console.log("Gemini response received successfully.");

      return result;
    } catch (error) {
      console.error(
        `Gemini attempt ${attempt + 1} failed:`,
        error?.message || error,
      );

      const errorMessage = error?.message || "";

      const isTemporaryError =
        errorMessage.includes("503") ||
        errorMessage.includes("high demand") ||
        errorMessage.includes("UNAVAILABLE") ||
        errorMessage.includes("overloaded");

      // If it isn't a temporary server error, don't retry.
      if (!isTemporaryError) {
        throw error;
      }

      // Last attempt failed.
      if (attempt === maxRetries) {
        throw error;
      }

      // 5s → 10s → 20s
      const delay = 5000 * Math.pow(2, attempt);

      console.log(
        `Gemini is temporarily busy. Retrying in ${delay / 1000} seconds...`,
      );

      await sleep(delay);
    }
  }
};
