import React from "react";
import "./LogoContainer.css";

type LogoContainerProps = {
  type?: string;
  containerStyle?: React.CSSProperties;
  logoStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
};

export const LogoContainer = (props: LogoContainerProps) => {
  return (
    <div
      className={
        "vps_waitlist__logo-container " + (props.type ? props.type : "top")
      }
      style={props.containerStyle}
    >
      <img
        alt="munch-logo"
        className={"vps_waitlist__logo " + (props.type ? props.type : "top")}
        src={require("../../assets/munch-transparent-logo.png")}
        style={props.logoStyle}
      />
      <h1
        className={
          "vps_waitlist__logo-text " + (props.type ? props.type : "top")
        }
        style={props.textStyle}
      >
        munch.
      </h1>
    </div>
  );
};

export default LogoContainer;
