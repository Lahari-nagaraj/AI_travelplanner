import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-[#e8f4f8] via-[#f0f7fa] to-[#fff] relative overflow-hidden flex flex-col items-center justify-center px-4 md:px-56 gap-7 text-center">
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f4f8]/50 via-transparent to-white/80"></div>
      <h1 className="font-serif text-3xl md:text-5xl leading-tight relative z-10">
        <span className="text-[#1a4a5e] block mb-2">
          Discover Your Next Adventure with AI
        </span>
        <span className="text-[#2d6980]">
          Personalized Itineraries at Your Fingertips
        </span>
      </h1>
      <p className="text-base md:text-lg text-[#436d7d] max-w-2xl font-light relative z-10">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget
      </p>
      <Link to={"/create-trip"} className="relative z-10">
        <Button className="mt-4 text-base px-7 py-5 bg-[#1a4a5e] hover:bg-[#2d6980] transition-colors">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
