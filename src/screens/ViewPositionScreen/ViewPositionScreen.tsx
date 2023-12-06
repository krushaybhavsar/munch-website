import React, { useState, useEffect } from "react";
import "./ViewPositionScreen.css";
import { getPositionInQueue } from "../../utils/firebaseUtils";

type ViewPositionScreenProps = {};

const ViewPositionScreen = (props: ViewPositionScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<number>(0);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const userDataDoc = localStorage.getItem("userDataDoc");
    if (userDataDoc !== null && userDataDoc !== "") {
      setUid(userDataDoc);
      getPositionInQueue(userDataDoc).then((res) => {
        if (res !== -1) {
          console.log("Successfully got position in queue");
          setQueuePosition(res);
          setLoading(false);
        } else {
          console.log("Invalid userDataDoc");
          localStorage.removeItem("userDataDoc");
          setLoading(false);
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <div className="view-position-screen">
      <div className="vps-position-container">
        <h1 className="vps-position-container__title">
          Your position in line is:
        </h1>
        <div className="vps-position-container__position">
          <h1 className="vps-position-container__position-text">
            {loading ? "--" : queuePosition}
          </h1>
        </div>
      </div>
      <div className="vps-referral-container">
        <h1 className="vps-referral-container__title">
          Refer a friend to get ahead in line!
        </h1>
        <div className="vps-referral-container__referral">
          <div className="vps-referral-container__referral-text-container">
            <h1 className="vps-referral-container__referral-text">
              {window.location.origin + "?ref=" + uid}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPositionScreen;
