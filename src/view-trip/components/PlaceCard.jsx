import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCard({ place }) {
  const [PhotoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place.activity || place.place || place.locationName,
      };
      const response = await GetPlaceDetails(data);

      // Ensure response has valid data
      if (
        response?.data?.places &&
        response.data.places.length > 0 &&
        response.data.places[0].photos &&
        response.data.places[0].photos.length > 0
      ) {
        // Choose a valid index safely
        const photoIndex = response.data.places[0].photos[3] // Prefers 4th image if available
          ? 3
          : response.data.places[0].photos[1] // Else takes 2nd image
          ? 1
          : 0; // Else takes the first image as fallback

        const fetchedPhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          response.data.places[0].photos[photoIndex].name
        );

        setPhotoUrl(fetchedPhotoUrl);
      } else {
        console.warn("No valid photos found for place:", place);
        setPhotoUrl("/placeholder.jpg"); // Fallback to a default placeholder image
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl("/placeholder.jpg"); // Ensures UI doesn't break on error
    }
  };

  if (!place) {
    return null;
  }

  // Extracting relevant details with fallbacks
  const activity =
    place.activity || place.place || place.locationName || "Unknown Place";
  const description =
    place.description || place.details || "No details available";
  const travelTime =
    place.travelTimeFromHotel ||
    place.approximate_time_to_reach_from_calangute_hotel ||
    place.approximate_time_to_reach_from_palolem ||
    place.approximate_time_to_reach ||
    place.travelTimeFromHotel ||
    place.timeTravelTo||
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
          className="w-[150px] h-[150px] rounded-xl object-cover"
          onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback if image fails to load
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
