import React, { useState } from 'react'
import { Button } from 'antd';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect } from "react";


const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({trip}) {
  const [PhotoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();

  },[trip])

  const GetPlacePhoto=async()=>{
    const data = {
      textQuery: trip?.userSelection?.location
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[2].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
     setPhotoUrl(PhotoUrl);

    })
    }

  return (
    <div>
      <img
        src={PhotoUrl}
        className="h-[350px] w-[900px] object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              🗓️{trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰{trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
              🌍No. of Travelers:{trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button className='bg-black'>
          <IoIosSend className=' text-white'/>
        </Button>
      </div>
    </div>
  );
}

export default InfoSection