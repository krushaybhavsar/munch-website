import React, { ReactElement, useEffect } from "react";
import { ToastInfo } from "../../types";
import "./CustomToast.css";

type CustomToastProps = {
  message: ToastInfo;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CustomToast = (
  props: CustomToastProps
): ReactElement<CustomToastProps> => {
  useEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        props.setVisible(false);
      }, 3000);
    }
  }, [props.visible]);

  return (
    <div
      className={
        "notification-container" +
        (props.visible ? " visible" : "") +
        " " +
        props.message?.type
      }
    >
      <p className={"notif-message " + props.message?.type}>
        {props.message?.message}
      </p>
    </div>
  );
};
