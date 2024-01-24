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
import { isUserOffWaitlist } from "./utils/firebaseUtils";

function App() {
  const [userDataDoc, setUserDataDoc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<ToastInfo>();
  const [toastVisible, setToastVisible] = useState(false);
  const [isOffWaitlist, setIsOffWaitlist] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    signInAnonymously(auth)
      .then((userCredential) => {
        const localUDDoc = localStorage.getItem("userDataDoc");
        if (localUDDoc !== null && localUDDoc !== "") {
          isUserOffWaitlist(localUDDoc)
            .then((isOffWaitlist) => {
              setIsOffWaitlist(isOffWaitlist);
              setUserDataDoc(localUDDoc as string);
            })
            .catch((error) => {
              console.log(error);
              setUserDataDoc(localUDDoc as string);
              setLoading(false);
            });
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
            !!userDataDoc ? (
              isOffWaitlist ? (
                <Navigate to="/order" replace={true} />
              ) : (
                <Navigate to="/position" replace={true} />
              )
            ) : (
              <>
                <WaitlistScreen
                  setToastMessage={setToastMessage}
                  setToastVisible={setToastVisible}
                  isOffWaitlist={isOffWaitlist}
                />
                <LoadingScreen isLoading={loading} />
              </>
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
                isOffWaitlist={isOffWaitlist}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute
              isAllowed={userDataDoc != null && isOffWaitlist}
              loading={loading}
            >
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
