import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  const tripData = Array.isArray(trip?.tripData)
    ? trip.tripData[0]
    : trip?.tripData;

  const hotels = Array.isArray(tripData?.hotels) ? tripData.hotels : [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      {hotels.length === 0 ? (
        <p className="text-gray-500 mt-3">
          No hotel recommendations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
          {hotels.map((item, index) => {
            const nameKey = Object.keys(item).find(
              (key) => key.toLowerCase() === "hotelname",
            );

            const addressKey = Object.keys(item).find(
              (key) => key.toLowerCase() === "hoteladdress",
            );

            const priceKey = Object.keys(item).find((key) =>
              key.toLowerCase().includes("price"),
            );

            const hotelName = nameKey
              ? item[nameKey]
              : "Hotel Name Not Available";

            const hotelAddress = addressKey
              ? item[addressKey]
              : "Address Not Available";

            const priceValue = priceKey
              ? item[priceKey]
              : "Price not available";

            return (
              <HotelCardItem
                key={index}
                hotel={{
                  name: hotelName,
                  address: hotelAddress,
                  price: priceValue,
                  rating: item?.rating || "No rating available",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Hotels;
