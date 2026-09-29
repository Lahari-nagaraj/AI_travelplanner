import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FaMapLocationDot } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCard({ place }) {
  const [PhotoUrl, setPhotoUrl] = useState(null);

  const activity = place?.location_name || "Unknown Place";

  const description = place?.description || "No details available";

  const travelTime = place?.time_travel || "Travel time not available";

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const response = await GetPlaceDetails({
        textQuery: activity,
      });

      const googlePlace = response?.data?.places?.[0];

      if (googlePlace?.photos && googlePlace.photos.length > 0) {
        const photoIndex = googlePlace.photos.length > 3 ? 3 : 0;

        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          googlePlace.photos[photoIndex].name,
        );

        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <div
      className="border rounded-xl mt-2 p-3 gap-5 flex
      hover:scale-105 transition-all hover:shadow-md"
    >
      <img
        src={PhotoUrl || "/placeholder.jpg"}
        alt={activity}
        className="w-[150px] h-[150px] rounded-xl object-cover"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpg";
        }}
      />

      <div>
        <h2 className="font-bold text-lg">{activity}</h2>

        <p className="text-sm text-gray-400">{description}</p>

        <h2 className="mt-2">🕛 {travelTime}</h2>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            activity,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="small" className="mt-3">
            <FaMapLocationDot />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default PlaceCard;
