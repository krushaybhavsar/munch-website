import React, { useEffect, useState } from "react";
import "./App.css";
import WaitlistScreen from "./screens/WaitlistScreen/WaitlistScreen";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ViewPositionScreen from "./screens/ViewPositionScreen/ViewPositionScreen";
import { ToastInfo } from "./types";
import { CustomToast } from "./components/CustomToast/CustomToast";

function App() {
  const [userDataDoc, setUserDataDoc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<ToastInfo>();
  const [toastVisible, setToastVisible] = useState(false);

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
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        setVisible={setToastVisible}
      />
      <Routes>
        <Route
          path="/"
          element={
            userDataDoc === "" ? (
              <WaitlistScreen
                setToastMessage={setToastMessage}
                setToastVisible={setToastVisible}
              />
            ) : (
              <Navigate to="/position" />
            )
          }
        />
        <Route
          path="/position"
          element={
            userDataDoc === "" ? (
              <Navigate to="/" />
            ) : (
              <ViewPositionScreen
                setToastMessage={setToastMessage}
                setToastVisible={setToastVisible}
              />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
