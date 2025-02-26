import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user);

    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "travelai"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      setUserTrips([]);

      console.log("Query Snapshot Size:", querySnapshot.size);

      if (querySnapshot.empty) {
        console.log("No trips found for user:", user.email);
      }

      const tripsArray = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        tripsArray.push(doc.data());
      });

      setUserTrips(tripsArray);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 space-y-5">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                className="h-[150px] w-full bg-slate-200 animate-pulse rounded-xl"
                key={index}
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
