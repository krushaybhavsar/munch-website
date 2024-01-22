import React, { useEffect, useState } from "react";
import "./App.css";
import WaitlistScreen from "./screens/WaitlistScreen/WaitlistScreen";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ViewPositionScreen from "./screens/ViewPositionScreen/ViewPositionScreen";
import { ToastInfo } from "./types";
import { CustomToast } from "./components/CustomToast/CustomToast";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";

function App() {
  const [userDataDoc, setUserDataDoc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<ToastInfo>();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
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
            loading ? (
              <LoadingScreen />
            ) : !!userDataDoc ? (
              <Navigate to="/position" />
            ) : (
              <WaitlistScreen
                setToastMessage={setToastMessage}
                setToastVisible={setToastVisible}
              />
            )
          }
        />
        <Route
          path="/position"
          element={
            <ProtectedRoute isAllowed={!!userDataDoc} loading={loading}>
              <ViewPositionScreen
                setToastMessage={setToastMessage}
                setToastVisible={setToastVisible}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute isAllowed={userDataDoc != null} loading={loading}>
              <OrderScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
