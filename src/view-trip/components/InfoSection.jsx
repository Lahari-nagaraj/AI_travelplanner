import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { IoIosSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState("/placeholder.jpg");
  const [tripLink, setTripLink] = useState("");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip.userSelection.location,
      };

      console.log("Searching photo for:", data.textQuery);

      const response = await GetPlaceDetails(data);

      console.log("Places response:", response.data);

      const places = response?.data?.places;

      if (!places || places.length === 0) {
        console.warn("No place found");
        setPhotoUrl("/placeholder.jpg");
        return;
      }

      const photos = places[0]?.photos;

      if (!photos || photos.length === 0) {
        console.warn("No photos found for:", trip.userSelection.location);
        setPhotoUrl("/placeholder.jpg");
        return;
      }

      // Safely use the first available photo
      const photoName = photos[0]?.name;

      if (!photoName) {
        setPhotoUrl("/placeholder.jpg");
        return;
      }

      const url = PHOTO_REF_URL.replace("{NAME}", photoName);

      setPhotoUrl(url);
    } catch (error) {
      console.error(
        "Error fetching place photo:",
        error?.response?.data || error,
      );

      setPhotoUrl("/placeholder.jpg");
    }
  };

  const handleShare = () => {
    const generatedLink = `${window.location.origin}/view-trip/${trip?.id}`;

    setTripLink(generatedLink);
    setShowCard(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tripLink);
    alert("Link copied to clipboard!");
    setShowCard(false);
  };

  return (
    <div>
      <img
        src={PhotoUrl}
        alt={trip?.userSelection?.location || "Travel destination"}
        className="h-[350px] w-full object-cover rounded-xl"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpg";
        }}
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>

          <div className="flex gap-5 flex-wrap">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🗓️ {trip?.userSelection?.noOfDays} Day
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🌍 No. of Travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button className="bg-black" onClick={handleShare}>
          <IoIosSend className="text-white" />
        </Button>
      </div>

      {showCard && (
        <Card className="p-5 mt-4 bg-gray-100 border rounded-lg shadow-lg relative">
          <button
            onClick={() => setShowCard(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            <IoMdClose size={20} />
          </button>

          <h3 className="font-semibold text-lg mb-2">Share Your Trip</h3>

          <p className="text-gray-600 mb-3">
            <a
              href={tripLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {tripLink}
            </a>
          </p>

          <Button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Copy Link
          </Button>
        </Card>
      )}
    </div>
  );
}

export default InfoSection;
