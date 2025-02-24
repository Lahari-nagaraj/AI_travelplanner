import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {


    const [PhotoUrl, setPhotoUrl] = useState();
    useEffect(() => {
      hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel.name
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


  const mapQuery = encodeURIComponent(`${hotel.name}, ${hotel.address}`);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-all cursor-pointer"
    >
      <div>
        <img src={PhotoUrl} className="rounded-xl w-50 h-[150px]" alt="Hotel" />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-semibold">{hotel.name}</h2>
          <h2 className="text-sm text-gray-600">📌 {hotel.address}</h2>
          <h2 className="text-sm">💰 {hotel.price}</h2>
          <h2 className="text-sm"> ⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
