import React, { useEffect } from "react";
import "./LoadingScreen.css";
import LoadingModalContent from "../../components/CustomModal/LoadingModalContent/LoadingModalContent";

type LoadingScreenProps = {
  isLoading: boolean;
};

const LoadingScreen = (props: LoadingScreenProps) => {
  useEffect(() => {
    if (props.isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isLoading]);

  return (
    <div className={"loading-screen" + (props.isLoading ? " active" : "")}>
      <LoadingModalContent />
    </div>
  );
};

export default LoadingScreen;
