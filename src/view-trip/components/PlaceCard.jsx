import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCard({ place }) {
  const [PhotoUrl, setPhotoUrl] = useState("/placeholder.jpg");

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const placeName =
        place?.location ||
        place?.activity ||
        place?.place ||
        place?.locationName;

      if (!placeName) {
        console.warn("No place name found:", place);
        return;
      }

      const data = {
        textQuery: placeName,
      };

      const response = await GetPlaceDetails(data);

      const places = response?.data?.places;

      if (!places || places.length === 0) {
        console.warn("No Google place found:", placeName);
        return;
      }

      const photos = places[0]?.photos;

      if (!photos || photos.length === 0) {
        console.warn("No photos found:", placeName);
        return;
      }

      const photoName = photos[0]?.name;

      if (!photoName) {
        return;
      }

      const fetchedPhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);

      setPhotoUrl(fetchedPhotoUrl);
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error?.response?.data || error,
      );

      setPhotoUrl("/placeholder.jpg");
    }
  };

  if (!place) {
    return null;
  }

  // IMPORTANT: Gemini uses "location"
  const activity =
    place.location ||
    place.activity ||
    place.place ||
    place.locationName ||
    "Unknown Place";

  const description =
    place.description || place.details || "No details available";

  const travelTime =
    place.travelTimeFromPrevious ||
    place.travelTimeFromHotel ||
    place.approximate_time_to_reach ||
    place.timeTravelTo ||
    "Travel time not available";

  const time = place.time || "";

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity,
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border rounded-xl mt-2 p-3 gap-5 flex hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={PhotoUrl}
          alt={activity}
          className="w-[150px] h-[150px] rounded-xl object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />

        <div>
          <h2 className="font-bold text-lg">{activity}</h2>

          {time && <p className="text-sm text-gray-500">🕐 {time}</p>}

          <p className="text-sm text-gray-400">{description}</p>

          <h2 className="mt-2">🕛 {travelTime}</h2>

          <Button size="small">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
