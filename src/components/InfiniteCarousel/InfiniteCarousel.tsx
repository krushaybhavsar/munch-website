import React from "react";
import "./InfiniteCarousel.css";

type InfiniteCarouselProps = {
  images: {
    src: NodeRequire;
    alt: string;
  }[];
  style?: React.CSSProperties;
};

const InfiniteCarousel = (props: InfiniteCarouselProps) => {
  return (
    <div className="infinite-carousel-scroller" style={props.style}>
      <ul className="ic-list scroller__inner">
        {props.images.map((image, index) => {
          return (
            <li key={index}>
              <img
                className={"ic-image" + (index % 2 === 0 ? "" : " spacing")}
                src={image.src as any}
                alt={image.alt}
              />
            </li>
          );
        })}
        {props.images.map((image, index) => {
          return (
            <li key={index}>
              <img
                className={"ic-image" + (index % 2 === 0 ? "" : " spacing")}
                src={image.src as any}
                alt={image.alt}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfiniteCarousel;
