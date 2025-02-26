import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location,
      };
      const response = await GetPlaceDetails(data);
      const photos = response.data.places[0]?.photos;

      if (photos && photos.length > 0) {
        const photoIndex = photos.length > 3 ? 3 : 0; // Ensure valid index
        const photoRef = photos[photoIndex]?.name;

        if (photoRef) {
          const formattedPhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
          setPhotoUrl(formattedPhotoUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl || "/plane.jpg"}
          className="object-cover rounded-xl w-full h-[150px]"
          alt="Trip Image"
        />
        <div className="p-2">
          <h2 className="font-bold text-green-900">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
