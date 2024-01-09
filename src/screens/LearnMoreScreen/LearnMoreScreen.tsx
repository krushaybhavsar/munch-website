import React from "react";
import "./LearnMoreScreen.css";
import {
  WaveFooterUp,
  WaveFooterDown,
} from "../../components/WaveFooter/WaveFooter";
import LearnMoreDetailSection from "../../components/LearnMoreDetailSection/LearnMoreDetailSection";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useWindowDimensions from "../../utils/useWindowDimensions";
import InfiniteCarousel from "../../components/InfiniteCarousel/InfiniteCarousel";

type LearnMoreScreenProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const LearnMoreScreen = (props: LearnMoreScreenProps) => {
  const screenWidth = useWindowDimensions().width;

  const getMockupImage = (
    mockupNumber: number
  ): {
    src: NodeRequire;
    alt: string;
  } => {
    switch (mockupNumber) {
      case 0:
        return {
          src: require("../../assets/mockups/home-feed-screen.png"),
          alt: "Home Feed Screen",
        };
      case 1:
        return {
          src: require("../../assets/mockups/new-post-media-picker-screen.png"),
          alt: "New Post Media Picker",
        };
      case 2:
        return {
          src: require("../../assets/mockups/new-post-screen.png"),
          alt: "New Post Screen",
        };
      case 3:
        return {
          src: require("../../assets/mockups/new-sellable-listing-details-screen.png"),
          alt: "New Sellable Listing Details Screen",
        };
      case 4:
        return {
          src: require("../../assets/mockups/new-sellable-listing-screen.png"),
          alt: "New Sellable Listing Screen",
        };
      // case 5:
      //   return {
      //     src: require("../../assets/mockups/splash-screen.png"),
      //     alt: "Splash Screen",
      //   };
      default:
        return {
          src: require("../../assets/mockups/home-feed-screen.png"),
          alt: "Home Feed Screen",
        };
    }
  };

  const addMockupImageSpacing = (mockupNumber: number) => {
    if (screenWidth > 975) {
      return mockupNumber % 2 === 0 ? "" : " margin";
    } else {
      return "";
    }
  };

  return (
    <div className="learn-more-screen" ref={props.containerRef}>
      {screenWidth < 455 && (
        <WaveFooterUp
          style={{
            position: "absolute",
            top: -47,
            left: 0,
            right: 0,
          }}
        />
      )}
      <WaveFooterDown
        style={{
          position: "absolute",
          top: -1,
          left: 0,
          right: 0,
        }}
      />
      <h1 className="learn-more-screen-title">
        {"The one-stop hub for all your inner foodie's needs."}
      </h1>

      {screenWidth > 975 ? (
        <div className="lms-mockup-masonry-container">
          {Array.from(Array(5).keys()).map((i) => (
            <div className="lms-mockup-container-item" key={i}>
              <img
                src={getMockupImage(i).src as any}
                alt={getMockupImage(i).alt}
                className={"lms-mockup-image" + (i % 2 === 0 ? "" : " margin")}
              />
            </div>
          ))}
        </div>
      ) : (
        <InfiniteCarousel
          style={{
            marginTop: "40px",
          }}
          images={[
            getMockupImage(0),
            getMockupImage(1),
            getMockupImage(2),
            getMockupImage(3),
            getMockupImage(4),
          ]}
        />
      )}
      <div className="learn-more-screen-bottom-spacer" />
      <div className="learn-more-screen-bottom">
        <LearnMoreDetailSection
          detailIndex={0}
          title="Free delivery from local restaurants."
          subtitle="No BS fees. Ever."
          body="Our flipped delivery model ensures that the price of the dish is the price you pay. How does it work? Local restaurants list meals along with designated drop-off locations and specified time windows for you to conveniently pick them up."
        />
        <LearnMoreDetailSection
          detailIndex={1}
          title="Harness your culinary skills for profit."
          body="Have a knack for cooking? List your meals on Munch and let the dough roll in. Showcase your skills, inspire others to cook, and even earn extra income—all while doing what you love."
        />
        <LearnMoreDetailSection
          detailIndex={2}
          title="Discover diverse recipes by local campus chefs."
          body="Cooking for yourself can be hard when you're short on time. Munch makes browsing through recipes seamless, helping you find the right recipe for a quick bite on the go or even a date night!"
        />
      </div>
    </div>
  );
};

export default LearnMoreScreen;
