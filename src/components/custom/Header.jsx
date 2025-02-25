import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";


function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 bg-white">
      {/* Logo without background color */}
      <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full text-black">
              My Trips
            </Button>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || "/default-avatar.png"}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                 window.location.reload();
                }}>
                Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button>Sign in</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
