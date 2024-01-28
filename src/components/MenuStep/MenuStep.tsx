import React from "react";
import "./MenuStep.css";

type MenuStepProps = {
  stepNumber: number;
  stepDescription?: string;
  children?: React.ReactNode;
  enabled?: boolean;
  innerContainerStyle?: React.CSSProperties;
};

const MenuStep = (props: MenuStepProps) => {
  return (
    <div
      className={
        "menu-step-container" + (props.enabled ? " enabled" : " disabled")
      }
    >
      <div className="menu-step-top">
        <div className="menu-step-info">
          {"Step " +
            props.stepNumber +
            (props.stepDescription ? " - " + props.stepDescription : "")}
        </div>
      </div>
      <div className="menu-step-bottom">
        <div className="menu-step-inner" style={props.innerContainerStyle}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MenuStep;
