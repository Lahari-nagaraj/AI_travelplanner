import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
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
  history: [
    {
      role: "user",
      parts: [
        {
          text: "General travel plan for location :Las Vegas for 3 days for couple with cheap budget give me hotels option with hotel name hotel address, price, hotel image URL geo co-ordinates rating description and suggest itinerary with place name place details place image URL show coordinates ticket pricing, rating, time travel each of location for 3 days with each day plan with best time to visit in JSON on format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'I cannot directly access and display real-time information like hotel prices, availability, images, and live geo-coordinates.  Hotel prices and availability fluctuate constantly.  Similarly, I can\'t access and display images from URLs.  My responses are based on information available to me at the time of training.\n\nTo get the most up-to-date information, you should use online travel agencies (like Expedia, Booking.com, Kayak) and map services (like Google Maps) to find current pricing, availability, images, and geo-coordinates.\n\nHowever, I can provide you with a JSON template that you can populate with the information you gather from these online resources.  This template outlines a possible 3-day budget-friendly Las Vegas itinerary for a couple.  Remember to replace the bracketed placeholders with the actual data.\n\n```json\n{\n  "trip": {\n    "destination": "Las Vegas, Nevada",\n    "duration": "3 days",\n    "budget": "cheap",\n    "travelers": "Couple"\n  },\n  "hotels": [\n    {\n      "name": "[Hotel Name 1]",\n      "address": "[Hotel Address 1]",\n      "price": "[Price per night]",\n      "imageUrl": "[Image URL 1]",\n      "geoCoordinates": "[Latitude, Longitude]",\n      "rating": "[Rating]",\n      "description": "[Hotel Description]"\n    },\n    {\n      "name": "[Hotel Name 2 (Alternative)]", \n      "address": "[Hotel Address 2]",\n      "price": "[Price per night]",\n      "imageUrl": "[Image URL 2]",\n      "geoCoordinates": "[Latitude, Longitude]",\n      "rating": "[Rating]",\n      "description": "[Hotel Description]"\n    }\n\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "place": "[Place Name, e.g., Fremont Street Experience]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price, if any]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      },\n      "afternoon": {\n        "place": "[Place Name, e.g., Mob Museum]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      },\n      "evening": {\n        "place": "[Place Name, e.g., Free show on the Strip]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price, if any]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      }\n    },\n    "day2": {\n      "morning": {\n        "place": "[Place Name, e.g., Hoover Dam (day trip - consider transportation costs)]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price]",\n        "rating": "[Rating]",\n        "time": "[Time spent, including travel]"\n      },\n      "afternoon": {\n        "place": "[Place Name, e.g.,  Seven Magic Mountains (free, but factor in travel time)]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price, if any]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      },\n      "evening": {\n        "place": "[Place Name, e.g.,  Cheap Buffet]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      }\n    },\n    "day3": {\n      "morning": {\n        "place": "[Place Name, e.g., Explore a different part of the Strip]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price, if any]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      },\n      "afternoon": {\n        "place": "[Place Name, e.g.,  Pool time at your hotel (if available)]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price, if any]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      },\n      "evening": {\n        "place": "[Place Name, e.g.,  Final Dinner & Departure]",\n        "details": "[Place Description]",\n        "imageUrl": "[Image URL]",\n        "geoCoordinates": "[Latitude, Longitude]",\n        "ticketPrice": "[Price]",\n        "rating": "[Rating]",\n        "time": "[Time spent]"\n      }\n    }\n  }\n}\n```\n\nRemember to research cheap food options and consider walking or using the monorail to save on transportation costs in Las Vegas.  Prioritize free activities and shows to keep your budget low.  Have a great trip!\n',
        },
      ],
    },
  ],
});
