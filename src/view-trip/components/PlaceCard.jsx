import React from "react";
import { Button } from "antd";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  if (!place || !place.activity) {
    return null;
  }

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(place.activity)
      }
      target="_blank"
    >
      <div className="border rounded-xl mt-2 p-3 gap-5 flex hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={place.imageURL || "/default-image.jpg"}
          alt=""
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{place.activity}</h2>
          <p className="text-sm text-gray-400">
            {place.details || "No details available"}
          </p>
          <h2 className="mt-2">
            🕛 {place.travelTime_to_location || "Travel time not available"}
          </h2>
          <h2 className="mt-1">
            💰 {place.approximate_cost || "Cost not specified"}
          </h2>
          <Button size="sm">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
