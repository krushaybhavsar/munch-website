import React from "react";
import "./LearnMoreScreen.css";
import { WaveFooter } from "../../components/WaveFooter/WaveFooter";
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
      <WaveFooter
        style={{
          position: "absolute",
          top: -2,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      <h1 className="learn-more-screen-title">
        {"A one-stop culinary hub for all your stomach's needs."}
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
          title="Order meals from local restaurants."
          subtitle="Free delivery. No BS fees."
          body="Our flipped delivery model slashes unnecessary expenses, ensuring that the price you see is the price you pay—no surprises, just great food. How does it work? Local restaurants list their meals along with designated drop-off locations and specified time windows for you to conveniently pick them up."
        />
        <LearnMoreDetailSection
          detailIndex={1}
          title="Discover diverse recipes by local campus chefs."
          body="Cooking for yourself can be a challenge, especially when you're short on time or ideas. Let local campus chefs inspire your culinary journey with their diverse and creative recipes. When it comes to browsing through recipes, Munch offers an array of meals prepared by talented chefs from nearby campuses. These recipes are crafted considering the ingredients readily available in your area, ensuring you can replicate them with ease."
        />
        <LearnMoreDetailSection
          detailIndex={2}
          title="Harness your culinary skills for profit."
          body="Have a knack for cooking? List your meals on Munch and let the dough roll in. Showcase your skills, earn extra income, and inspire others with your meals—all while doing what you love."
        />
      </div>
    </div>
  );
};

export default LearnMoreScreen;
