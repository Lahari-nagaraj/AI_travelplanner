import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9 text-center">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your next adventure with AI:
        </span>
        Personalizes Itineraries at your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travl curator,creating custon itineries
        to your interest and budget
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started,Its Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
