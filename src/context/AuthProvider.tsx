"use client";

import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const AuthProvider: React.FC<any> = ({ children }) => {
  const [userData, setUserData] = useState<any>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserData(user);
    } else {
      console.log("singed out");
    }
  });

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
