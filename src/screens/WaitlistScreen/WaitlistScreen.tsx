import React, { useEffect, useState, useRef } from "react";
import "./WaitlistScreen.css";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {
  addEmailToQueue,
  addUserReferral,
  checkIfValidUID,
  logAnalyticsEvent,
} from "../../utils/firebaseUtils";
import { CollegeEmailSuffixes, ToastInfo } from "../../types";
import CustomModal from "../../components/CustomModal/CustomModal";
import LoadingModalContent from "../../components/CustomModal/LoadingModalContent/LoadingModalContent";
import LearnMoreScreen from "../LearnMoreScreen/LearnMoreScreen";

type WaitlistScreenProps = {
  setToastMessage: React.Dispatch<React.SetStateAction<ToastInfo>>;
  setToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const WaitlistScreen = (props: WaitlistScreenProps) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [captchaDone, setCaptchaDone] = useState<boolean>(false);
  const [loadingDescription, setLoadingDescription] = useState<string>(
    "Adding you to the waitlist..."
  );

  const learnMoreRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleError = (message?: any, userMessage?: string, uid?: string) => {
    logAnalyticsEvent("error", {
      errorMessage: message ? message.toString() : "Something went wrong.",
      page: "waitlist_screen",
      uid: uid ? uid : "N/A",
    });
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
          handleError(
            err + "\n\nReferral Code Attempted: " + referralCode,
            "Error validating referral code!"
          );
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
    e.preventDefault();
    if (!captchaDone) {
      handleError(
        "reCAPTCHA failed to load.",
        "reCAPTCHA failed to load! Please refresh the page and try again."
      );
      return;
    }
    try {
      if (isValidForm()) {
        setLoading(true);
        const handleRefRes = await handleReferralCode();
        await addEmailToQueue(email)
          .then(async (res) => {
            if (res.res) {
              logAnalyticsEvent("waitlist_sign_up", {
                email: email,
                uid: res.uid,
                message: "Successfully added email to waitlist",
              });
              if (handleRefRes.isValid && handleRefRes.ref !== "") {
                if (res.uid === handleRefRes.ref) {
                  handleError(
                    "Users cannot refer themselves.",
                    "You can't refer yourself!",
                    res.uid
                  );
                } else {
                  props.setToastMessage({
                    message: "Valid referral code!",
                    type: "success",
                  });
                  props.setToastVisible(true);
                  await addUserReferral(handleRefRes.ref, res.uid).catch(
                    (err) => {
                      handleError(err, "Failed to add referral code!", res.uid);
                    }
                  );
                }
              }
            } else {
              logAnalyticsEvent("user_sign_in", {
                email: email,
                uid: res.uid,
                message: "Did not add a new user to the queue.",
              });
            }
            if (
              res.uid &&
              res.uid !== null &&
              res.uid !== undefined &&
              res.uid !== ""
            ) {
              localStorage.setItem("userDataDoc", res.uid);
              window.location.reload();
            }
          })
          .catch((err: any) => {
            handleError(
              err + "\n\nEmail Attempted: " + email,
              "Failed to add email to queue!"
            );
          });
      }
    } catch (err) {
      handleError(
        err + "\n\nEmail Attempted: " + email,
        "Failed to add email to waitlist!"
      );
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

  const getCaptchaSiteKey = (): string => {
    if (process.env.REACT_APP_RECAPTCHA_PROD_SITE_KEY) {
      return process.env.REACT_APP_RECAPTCHA_PROD_SITE_KEY;
    }
    return "site-key-not-found";
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=" + getCaptchaSiteKey();
    script.addEventListener("load", () => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(getCaptchaSiteKey())
          .then((token: any) => {
            if (token) {
              setCaptchaDone(true);
            }
          });
      });
    });
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="waitlist-screen-with-learn-more">
        <div className="waitlist-screen-with-bottom">
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
                Tired of dining hall food? Never know what to cook? Don't have
                the time or skills to prep a homemade meal yourself?{" "}
                <b>Neither do we.</b>
                <br />
                {width < 650
                  ? " "
                  : "We get it. We're hungry and lazy college students too. "}
                That's why we created Munch.{" "}
                <a
                  className="waitlist__learn-more-desc noselect"
                  onClick={() => scrollToSection(learnMoreRef)}
                >
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
              <div className={"waitlist__captcha-container"}>
                <div
                  className="g-recaptcha"
                  site-key=""
                  data-size="invisible"
                ></div>
              </div>
            </div>
            {getRightContent("right")}
          </div>
          <div
            className="learn-more-bottom-container noselect"
            onClick={() => scrollToSection(learnMoreRef)}
          >
            {/* <span className="scroll-icon">
              <span className="scroll-icon__dot"></span>
            </span> */}
            <h3 className="learn-more-bottom-text">
              What's Munch?
              <img
                alt="arrow-right"
                className="learn-more-bottom-arrow"
                src={require("../../assets/arrow-right.png")}
              />
            </h3>
          </div>
        </div>
        <LearnMoreScreen containerRef={learnMoreRef} />
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
