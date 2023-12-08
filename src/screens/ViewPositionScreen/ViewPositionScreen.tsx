import React, { useState, useEffect } from "react";
import "./ViewPositionScreen.css";
import { getIndexInQueue, getReferralNum } from "../../utils/firebaseUtils";
import { ToastInfo } from "../../types";
import CustomModal from "../../components/CustomModal/CustomModal";
import LoadingModalContent from "../../components/CustomModal/LoadingModalContent/LoadingModalContent";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  FacebookIcon,
  FacebookShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import useWindowDimensions from "../../utils/useWindowDimensions";
type ViewPositionScreenProps = {
  setToastMessage: React.Dispatch<React.SetStateAction<ToastInfo>>;
  setToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewPositionScreen = (props: ViewPositionScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<number>(0);
  const [numOfReferrals, setNumOfReferrals] = useState<number>(0);
  const [uid, setUid] = useState<string>("");
  const [referralURL, setReferralURL] = useState<string>("");
  const { height, width } = useWindowDimensions();

  const shareTitle = "Join the Munch waitlist! 🍪";
  const shareDescription =
    "Tired of dining hall food? Never know what to cook? Don't have to time to prep a meal yourself?\nMunch is a social cooking and homemade meal delivery app that connects you with other students on campus!\n\nJoin the waitlist now to get early access!";

  const handleError = (message?: any) => {
    console.log(message ? message : "Something went wrong");
    setLoading(false);
    props.setToastMessage({
      message: "Something went wrong!",
      type: "error",
    });
    props.setToastVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    const userDataDoc = localStorage.getItem("userDataDoc");
    if (userDataDoc !== null && userDataDoc !== "") {
      setUid(userDataDoc);
      setReferralURL(window.location.origin + "?ref=" + userDataDoc);
      getIndexInQueue(userDataDoc)
        .then((res) => {
          if (res !== -1) {
            console.log("Successfully got position in queue");
            setQueuePosition(res + 1);
            getReferralNum(userDataDoc)
              .then((res) => {
                if (res !== -1) {
                  console.log("Successfully got referral num");
                  setNumOfReferrals(res);
                  setLoading(false);
                } else {
                  handleError("Failed to get referral num");
                }
              })
              .catch((err) => {
                handleError(err);
              });
          } else {
            localStorage.removeItem("userDataDoc");
            handleError("Something went wrong!");
            window.location.reload();
          }
        })
        .catch((err) => {
          handleError(err);
        });
    }
  }, []);

  const getLogoContainer = (type: string) => {
    return (
      <div className={"vps_waitlist__logo-container " + type}>
        <img
          className={"vps_waitlist__logo " + type}
          src={require("../../assets/munch-transparent-logo.png")}
        />
        <h1 className={"vps_waitlist__logo-text " + type}>munch.</h1>
      </div>
    );
  };

  return (
    <>
      <div
        className="view-position-screen"
        style={loading ? { filter: "blur(3px)" } : {}}
      >
        {getLogoContainer("top")}
        <img
          className="vps-header-image"
          src={require("../../assets/liquid-cheese.png")}
        />
        <div className="vps-position-elements-container">
          {/* <img
            className="vps-position-elements-container__image"
            src={require("../../assets/verification.png")}
            alt="verification-icon"
          /> */}
          <h1 className="vps-position-thanks-title">
            {"Thanks for joining the waitlist!"}
          </h1>
          <div className="vps-referral-container">
            <h1 className="vps-referral-container__title">
              {"Refer a friend to get ahead in line!"}
            </h1>
            <div className="vps-referral-container__referral">
              <div className="vps-referral-container__referral-text-container">
                <h1 className="vps-referral-container__referral-text">
                  {referralURL}
                </h1>
              </div>
              <CopyToClipboard
                text={referralURL}
                onCopy={() => {
                  props.setToastMessage({
                    message: "Copied to clipboard!",
                    type: "success",
                  });
                  props.setToastVisible(true);
                }}
              >
                <button className="vps-referral-container__referral-button">
                  <img
                    className="vps-referral-container__referral-button-icon"
                    src={require("../../assets/clipboard-icon.png")}
                    alt="copy-icon"
                  />
                </button>
              </CopyToClipboard>
            </div>
            <div className="vps-instant-share-button-container">
              <div className="vps-instant-share-element">
                <TwitterShareButton
                  url={referralURL}
                  title={shareTitle + "\n\n" + shareDescription}
                  className="vps-instant-share-element__share-button"
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div className="vps-instant-share-element">
                <WhatsappShareButton
                  url={referralURL}
                  title={shareTitle + "\n\n" + shareDescription}
                  className="vps-instant-share-element__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <div className="vps-instant-share-element">
                <TelegramShareButton
                  url={referralURL}
                  title={shareTitle + "\n\n" + shareDescription}
                  className="vps-instant-share-element__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
              <div className="vps-instant-share-element">
                <RedditShareButton
                  url={referralURL}
                  title={shareTitle + "\n\n" + shareDescription}
                  className="vps-instant-share-element__share-button"
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>
              <div className="vps-instant-share-element">
                <FacebookShareButton
                  url={referralURL}
                  hashtag="#munch #socialcooking #joinmunch #cooking #meals #delivery #georgiatech #gt #gatech"
                  className="vps-instant-share-element__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div className="vps-instant-share-element">
                <LinkedinShareButton
                  url={referralURL}
                  title={shareTitle}
                  summary={shareDescription}
                  source={window.location.origin}
                  className="vps-instant-share-element__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
              <div className="vps-instant-share-element">
                <EmailShareButton
                  url={referralURL}
                  subject={shareTitle}
                  body={shareDescription + "\n"}
                  className="vps-instant-share-element__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>
          </div>

          <div className="vps-status-elements-container">
            <div className="vps-position-container">
              <h1 className="vps-position-container__title">
                {width > 700 ? "Your position in line is:" : "Your position:"}
              </h1>
              <div className="vps-position-container__position">
                <h1 className="vps-position-container__position-text">
                  {"#" + (loading ? "" : queuePosition)}
                </h1>
              </div>
            </div>
            <div className="vps-referral-status-container">
              <h1 className="vps-position-container__title">{"Referrals:"}</h1>
              <div className="vps-position-container__position">
                <h1 className="vps-position-container__position-text">
                  {loading ? "--" : numOfReferrals}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        modalContent={
          <LoadingModalContent
            titleMessage={"Hang Tight!"}
            description={"Loading your status..."}
          />
        }
        setShow={setLoading}
        show={loading}
      />
    </>
  );
};

export default ViewPositionScreen;
