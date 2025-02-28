import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [PhotoUrl, setPhotoUrl] = useState();
  const [tripLink, setTripLink] = useState("");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[2].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  const handleShare = () => {
    const generatedLink = `${window.location.origin}/trip/${trip?.id}`;
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
        className="h-[350px] w-[900px] object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              🗓️{trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰{trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              🌍No. of Travelers:{trip.userSelection?.traveler}
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
            className="absolute top-2 right-2 text-white hover:text-gray-600"
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
