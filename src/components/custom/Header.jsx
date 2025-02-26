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

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log("User Data:", user); // Debugging log
  }, [user]);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Auth Success:", credentialResponse);
const decodedUser = jwtDecode(credentialResponse.credential);

    console.log("Decoded User:", decodedUser);

    localStorage.setItem("user", JSON.stringify(decodedUser));
    setUser(decodedUser); // Update state
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Failed:", error);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="Logo" />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-black">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="User Avatar"
                    className="h-[35px] w-[35px] rounded-full"
                    onError={(e) => {
                      console.error("Image Load Error", e);
                    }}
                  />
                ) : (
                  <span className="text-sm">No Image</span>
                )}
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
