import React from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((item, index) => {
          // Find the key that contains "price"
          const priceKey = Object.keys(item).find((key) =>
            key.toLowerCase().includes("price")
          );
          const priceValue = priceKey ? item[priceKey] : "Price not available";

          // Construct the Google Maps query with both hotel name and address
          const mapQuery = encodeURIComponent(
            `${item?.hotelName || ""}, ${item?.hotelAddress || ""}`
          );

          return (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all cursor-pointer"
            >
              <div>
                <img
                  src="/plane.jpg"
                  className="rounded-xl w-50 h-32"
                  alt="Hotel"
                />
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-semibold">{item?.hotelName}</h2>
                  <h2 className="text-sm text-gray-600">
                    📌 {item?.hotelAddress}
                  </h2>
                  <h2 className="text-sm">💰 {priceValue}</h2>
                  <h2 className="text-sm">⭐ {item?.rating}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
