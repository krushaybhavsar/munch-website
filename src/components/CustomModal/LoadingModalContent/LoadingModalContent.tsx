import React from "react";
import "./LoadingModalContent.css";

type LoadingModalContentProps = {
  titleMessage?: string;
  description?: string;
};

const LoadingModalContent = (props: LoadingModalContentProps) => {
  return (
    <div className="loading-modal-container">
      {props.titleMessage && props.titleMessage !== "" ? (
        <h1 className="loading-modal-title">{props.titleMessage}</h1>
      ) : null}
      <img
        className="loading-modal-logo"
        src={require("../../../assets/munch-transparent-logo.png")}
        alt="loading-logo"
      />
      {props.description && props.description !== "" ? (
        <p className="loading-modal-description">{props.description}</p>
      ) : null}
    </div>
  );
};

export default LoadingModalContent;
