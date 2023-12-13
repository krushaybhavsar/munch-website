import React, { useState, useEffect } from "react";
import "./WaitlistScreen.css";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {
  addEmailToQueue,
  addUserReferral,
  checkIfValidUID,
} from "../../utils/firebaseUtils";
import { CollegeEmailSuffixes, ToastInfo } from "../../types";
import CustomModal from "../../components/CustomModal/CustomModal";
import LoadingModalContent from "../../components/CustomModal/LoadingModalContent/LoadingModalContent";

type WaitlistScreenProps = {
  setToastMessage: React.Dispatch<React.SetStateAction<ToastInfo>>;
  setToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const WaitlistScreen = (props: WaitlistScreenProps) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [loadingDescription, setLoadingDescription] = useState<string>(
    "Adding you to the waitlist..."
  );

  const handleError = (message?: any, userMessage?: string) => {
    console.log(message ? message : "Something went wrong");
    setLoading(false);
    props.setToastMessage({
      message: userMessage ? userMessage : "Something went wrong!",
      type: "error",
    });
    props.setToastVisible(true);
  };

  // Example URL: http://localhost:3000?ref=7sZX0TupBjMriKukIUk7
  const handleReferralCode = async (): Promise<{
    isValid: boolean;
    ref: string;
  }> => {
    if (window.location.href.includes("?ref=")) {
      setLoadingDescription("Validating referral code...");
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get("ref");
      if (referralCode) {
        setReferralCode(referralCode);
        const res = await checkIfValidUID(referralCode).catch((err) => {
          handleError(err, "Error validating referral code!");
          return false;
        });
        return { isValid: res, ref: referralCode };
      }
    }
    return { isValid: false, ref: "" };
  };

  const isValidForm = (): boolean => {
    if (
      email.trim() === "" ||
      !email.endsWith(CollegeEmailSuffixes.GeorgiaTech)
    ) {
      props.setToastMessage({
        message: "Please enter a valid Georgia Tech email address!",
        type: "error",
      });
      props.setToastVisible(true);
      return false;
    }
    return true;
  };

  const handleJoinWaitlist = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      if (isValidForm()) {
        console.log("Valid form");
        setLoading(true);
        const handleRefRes = await handleReferralCode();
        await addEmailToQueue(email)
          .then(async (res) => {
            if (res.res) {
              console.log("Successfully added a new user to the queue");
              if (handleRefRes.isValid && handleRefRes.ref !== "") {
                if (res.uid === handleRefRes.ref) {
                  handleError(
                    "Users cannot refer themselves",
                    "You can't refer yourself!"
                  );
                } else {
                  console.log("Valid referral code");
                  props.setToastMessage({
                    message: "Valid referral code!",
                    type: "success",
                  });
                  props.setToastVisible(true);
                  await addUserReferral(handleRefRes.ref, res.uid).catch(
                    (err) => {
                      handleError(err, "Failed to add referral code!");
                    }
                  );
                }
              }
            } else {
              console.log("Did not add a new user to the queue");
            }
            if (
              res.uid &&
              res.uid !== null &&
              res.uid !== undefined &&
              res.uid !== ""
            ) {
              localStorage.setItem("userDataDoc", res.uid);
              console.log("Successfully set userDataDoc in localStorage");
              window.location.reload();
              // setLoading(false);
            }
          })
          .catch((err: any) => {
            handleError(err, "Failed to add email to queue!");
          });
      }
    } catch (err) {
      handleError(err, "Failed to add email to waitlist!");
    }
  };

  const getLogoContainer = (type: string) => {
    return (
      <div className={"waitlist__logo-container " + type}>
        <img
          alt="munch-logo"
          className={"waitlist__logo " + type}
          src={require("../../assets/munch-transparent-logo.png")}
        />
        <h1 className={"waitlist__logo-text " + type}>munch.</h1>
      </div>
    );
  };

  const getRightContent = (type: string) => {
    return (
      <div className={"waitlist__right-content " + type}>
        <img
          alt="girl-eating-donuts"
          className={"waitlist__right-img " + type}
          src={require("../../assets/eating-donuts.png")}
        />
      </div>
    );
  };

  return (
    <>
      <div
        className="waitlist-screen"
        style={loading ? { filter: "blur(3px)" } : {}}
      >
        {getLogoContainer("top")}
        {getRightContent("top")}
        <div className="waitlist__left-content">
          {getLogoContainer("left")}
          <h2 className="waitlist-title">
            Experience campus food like never before.
          </h2>
          <h3 className="waitlist-description">
            Tired of dining hall food? Never know what to cook? Don't have to
            time or skills to prep a homemade meal yourself?{" "}
            <b>Neither do we.</b>
            <br />
            {width < 650
              ? " "
              : "We get it. We're hungry and lazy college students too. "}
            That's why we created Munch.{" "}
            <a href="#about-munch" className="waitlist__learn-more-desc">
              What's Munch?
              <img
                alt="arrow-right"
                className="waitlist__learn-more__arrow"
                src={require("../../assets/arrow-right.png")}
              />
            </a>
          </h3>
          <div className="waitlist__right-content__form">
            <h2 className="waitlist__form-title">Join the waitlist</h2>
            <form>
              <input
                type="email"
                placeholder="Georgia Tech Email"
                className="waitlist__email-input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                type="submit"
                className="waitlist__submit-btn"
                onClick={(e) => handleJoinWaitlist(e)}
              >
                I'm in!
              </button>
            </form>
          </div>
        </div>
        {getRightContent("right")}
        <div className="learn-more-bottom-container"></div>
      </div>
      <CustomModal
        modalContent={
          <LoadingModalContent
            titleMessage={"Hang Tight!"}
            description={loadingDescription}
          />
        }
        setShow={setLoading}
        show={loading}
      />
    </>
  );
};

export default WaitlistScreen;
