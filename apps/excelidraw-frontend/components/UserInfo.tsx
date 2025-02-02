// "use client";
// import { User } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React from "react";

// const UserInfo = () => {
//   const router = useRouter();
//   const user = localStorage.getItem("user");
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userId");
//     // window.location.href = "/signin";
//   };
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 25,
//         right: "5%",
//         transform: "translateX(-50%)",
//       }}
//     >
//       <div className=" flex items-center gap-3 ">
//         <div className="p-1 ring-1 ring-blue-300 rounded-full">
//           <User color="white" />
//         </div>
//         <p className="text-blue-50">{user}</p>

//       </div>
//     </div>
//   );
// };

// export default UserInfo;

"use client";

import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserInfo = () => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const handleLogout = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userId");
          resolve(true);
          router.push("/signin");
        }, 500);
      }),
      {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "Logout failed! Please try again.",
      }
    );
  };

  return (
    <div className="fixed top-4 right-8 flex items-center gap-3 bg-gray-800 p-2 rounded-lg shadow-md">
      <div className="p-2 ring-2 ring-blue-400 rounded-full bg-blue-600">
        <User color="white" size={20} />
      </div>
      <p className="text-white font-medium">{user || "Guest"}</p>
      <button
        onClick={handleLogout}
        className="text-white hover:text-red-400 transition"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default UserInfo;
