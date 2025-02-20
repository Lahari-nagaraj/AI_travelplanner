import React from 'react'
import { Button } from 'antd';
import { IoIosSend } from "react-icons/io";

function InfoSection({trip}) {
  return (
    <div>
      <img
        src="/plane.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
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