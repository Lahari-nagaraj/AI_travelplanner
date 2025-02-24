import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCard({ place }) {

  const [PhotoUrl, setPhotoUrl] = useState();
      useEffect(() => {
        place && GetPlacePhoto();
      }, [place]);
  
      const GetPlacePhoto = async () => {
        const data = {
          textQuery: place.activity || place.place,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
          console.log(resp.data.places[0].photos[3].name);
  
          const PhotoUrl = PHOTO_REF_URL.replace(
            "{NAME}",
            resp.data.places[0].photos[3].name
          );
          setPhotoUrl(PhotoUrl);
        });
      };
  if (!place) {
    return null;
  }

  // Extracting relevant details with fallbacks
  const activity = place.activity || place.place || "Unknown Place";
  const description =
    place.description || place.details || "No details available";
  const travelTime =
    place.travelTimeFromHotel ||
    place.approximate_time_to_reach_from_calangute_hotel ||
    place.approximate_time_to_reach_from_palolem ||
    place.approximate_time_to_reach ||
    "Travel time not available";

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity
      )}`}
      target="_blank"
    >
      <div className="border rounded-xl mt-2 p-3 gap-5 flex hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={place.imageURL || PhotoUrl}
          alt={activity}
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{activity}</h2>
          <p className="text-sm text-gray-400">{description}</p>
          <h2 className="mt-2">🕛 {travelTime}</h2>
          <Button size="sm">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
