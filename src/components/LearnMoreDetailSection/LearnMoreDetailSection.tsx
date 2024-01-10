import React from "react";
import "./LearnMoreDetailSection.css";

type LearnMoreDetailSectionProps = {
  detailIndex: number;
  title: string;
  subtitle?: string;
  body: string;
  bold?: string;
}

const LearnMoreDetailSection = (props: LearnMoreDetailSectionProps) => {
  const getSectionImage = (mockupNumber: number) => {
    switch (mockupNumber) {
      case 0:
        return {
          src: require("../../assets/ordering-local-food.png"),
          alt: "Ordering Local Food",
        };
      case 1:
        return {
          src: require("../../assets/chef-cooking.png"),
          alt: "Chef Cooking",
        };
      case 2:
        return {
          src: require("../../assets/eating-food.png"),
          alt: "Woman Eating Food",
        };
      default:
        return {
          src: require("../../assets/ordering-local-food.png"),
          alt: "Ordering Local Food",
        };
    }
  };

  const addLineBreak = ({body, bold}: {body: string, bold?: string}) => {
    return body.split("\\n").map((item, key, arr) => {
      if (key < arr.length - 1) {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      } else {
        return (
          <span key={key}>
            {item}{" "}
            <b>{bold}</b>
            <br/>
          </span>
        )
      }
    });
  }

  return (
    <div
      className={
        "learn-more-detail-section-container" +
        (props.detailIndex % 2 === 0 ? "" : " reverse")
      }
    >
      <div
        className={
          "learn-more-detail-section-half" +
          (props.detailIndex % 2 === 0 ? " left" : " right")
        }
      >
        {/* <div className="learn-more-detail-section-number">
          <p>{props.detailIndex + 1}</p>
        </div> */}

        <div className="learn-more-detail-section-title">{props.title}</div>
        {props.subtitle && (
          <div className="learn-more-detail-section-subtitle">
            {props.subtitle}
          </div>
        )}
        <div className="learn-more-detail-section-body">
          {addLineBreak({body: props.body, bold: props.bold})}
        </div>
      </div>

      <div
        className={
          "learn-more-detail-section-half" +
          (props.detailIndex % 2 === 0 ? " right" : " left")
        }
      >
        <div className="learn-more-detail-section-image-container">
          <img
            className="learn-more-detail-section-image"
            src={getSectionImage(props.detailIndex).src}
            alt={getSectionImage(props.detailIndex).alt}
          />
        </div>
      </div>
    </div>
  );
};

export default LearnMoreDetailSection;
