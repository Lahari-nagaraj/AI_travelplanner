import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input, Button } from "antd";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log("Updated formData:", updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      try {
        console.log("Login Success:", tokenInfo);
        await GetUserProfile(tokenInfo);
      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
    onError: (error) => console.log("Login Error:", error),
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    console.log("Saving Trip:", {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });

    await setDoc(doc(db, "travelai", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    window.dispatchEvent(new Event("tripGenerated"));

    navigate('/view-trip/'+docId)
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("User Info:", data);
      localStorage.setItem("user", JSON.stringify(data));
    window.dispatchEvent(new Event("userUpdated"));
    
        setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.noOfDays ||
      formData?.noOfDays < 1 ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the details correctly.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("AI Generation Error:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for the trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            className="border p-2 rounded-md"
            onChange={(e) =>
              handleInputChange("noOfDays", parseInt(e.target.value, 10) || "")
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.budget === item.title ? "shadow-lg border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.traveler === item.people
                  ? "shadow-lg border-black"
                  : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button type="primary" disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="flex items-center gap-4">
              <img src="/travel.png" className="w-[50px] h-[50px]" />
              <h2 className="font-bold text-black text-lg">Sign in with Google</h2>
            </DialogDescription>
          </DialogHeader>
          <p className="text-gray-600 text-sm text-center">
            Sign in to the app with Google Authentication securely
          </p>
          <Button
            onClick={login}
            className="w-full mt-5 flex gap-4 items-center justify-center"
          >
            <FcGoogle className="h-6 w-6 text-black" />
            Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
