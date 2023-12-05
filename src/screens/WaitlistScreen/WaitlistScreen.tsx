import React from "react";
import "./WaitlistScreen.css";
import useWindowDimensions from "../../utils/useWindowDimensions";

type WaitlistScreenProps = {};

const WaitlistScreen = (props: WaitlistScreenProps) => {
  const { height, width } = useWindowDimensions();

  const getLogoContainer = (type: string) => {
    return (
      <div className={"waitlist__logo-container " + type}>
        <img
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
          className={"waitlist__right-img " + type}
          src={require("../../assets/eating-donuts.png")}
        />
      </div>
    );
  };

  return (
    <div className="waitlist-screen">
      {getLogoContainer("top")}
      {getRightContent("top")}
      <div className="waitlist__left-content">
        {getLogoContainer("left")}
        <h2 className="waitlist-title">
          Experience campus food like never before.
        </h2>
        <h3 className="waitlist-description">
          Tired of dining hall food? Never know what to cook? Don't have to time
          (or skills) to prep a homemade meal yourself? <b>Neither do we.</b>
          <br />
          {width < 650
            ? " "
            : "We get it. We're hungry and lazy college students too. "}
          That's why we created munch.{" "}
          <a href="#about-munch" className="waitlist__learn-more-desc">
            What's munch?
            <img
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
              placeholder="Email"
              className="waitlist__email-input"
            />
            <button type="submit" className="waitlist__submit-btn">
              I'm in!
            </button>
          </form>
        </div>
      </div>
      {getRightContent("right")}
      <div className="learn-more-bottom-container"></div>
    </div>
  );
};

export default WaitlistScreen;
