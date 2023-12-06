import React, { useEffect, useState } from "react";
import "./App.css";
import WaitlistScreen from "./screens/WaitlistScreen/WaitlistScreen";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ViewPositionScreen from "./screens/ViewPositionScreen/ViewPositionScreen";

function App() {
  const [userDataDoc, setUserDataDoc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    signInAnonymously(auth)
      .then((userCredential) => {
        if (
          localStorage.getItem("userDataDoc") !== null &&
          localStorage.getItem("userDataDoc") !== ""
        ) {
          setUserDataDoc(localStorage.getItem("userDataDoc") as string);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userDataDoc === "" ? (
              <WaitlistScreen />
            ) : (
              <Navigate to="/position" />
            )
          }
        />
        <Route
          path="/position"
          element={
            userDataDoc === "" ? <Navigate to="/" /> : <ViewPositionScreen />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
