import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((item, index) => {
          const nameKey = Object.keys(item).find(
            (key) => key.toLowerCase() === "hotelname"
          );
          const hotelName = nameKey
            ? item[nameKey]
            : "Hotel Name Not Available";

          const addressKey = Object.keys(item).find(
            (key) => key.toLowerCase() === "hoteladdress"
          );
          const hotelAddress = addressKey
            ? item[addressKey]
            : "Address Not Available";

          const priceKey = Object.keys(item).find((key) =>
            key.toLowerCase().includes("price")
          );
          const priceValue = priceKey ? item[priceKey] : "Price not available";

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
    </div>
  );
}

export default Hotels;
