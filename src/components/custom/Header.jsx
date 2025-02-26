import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const updateUser = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    // Listen for user updates & trip creation
    window.addEventListener("userUpdated", updateUser);
    window.addEventListener("tripCreated", updateUser); // Update on trip creation

    return () => {
      window.removeEventListener("userUpdated", updateUser);
      window.removeEventListener("tripCreated", updateUser);
    };
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    const decodedUser = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(decodedUser));
    window.dispatchEvent(new Event("userUpdated")); // Notify header
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
  };

  return (
    <div className="p-3 shadow-sm flex justify-between  items-center px-5">
      <img src="/travel.png" alt="Logo" className="w-[60px] h-[60px] ml-6" />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-black">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-black">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="User Avatar"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} />
        )}
      </div>
    </div>
  );
}

export default Header;
