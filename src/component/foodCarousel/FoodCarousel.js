import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./carousel.css";
import Cards from "./carouselCards";

const FoodCarousel = ({ numCards }) => {
  const containerRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const updateCardWidth = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const newCardWidth = containerWidth / numCards;
      setCardWidth(newCardWidth);
    };
    const updatePageState = () => {
      const container = containerRef.current;
      setIsFirstPage(container.scrollLeft === 0);
      setIsLastPage(
        container.scrollLeft + container.offsetWidth >=
          container.scrollWidth - 1,
      );
    };

    updateCardWidth();
    updatePageState();

    // window.addEventListener("resize", updateCardWidth);
    // containerRef.current.addEventListener("scroll", updatePageState);

    return () => {
      // window.removeEventListener("resize", updateCardWidth);
      // containerRef.current.removeEventListener("scroll", updatePageState);
    };
  }, [numCards]);

  const handlePrevClick = () => {
    containerRef.current.scrollBy({
      left: -containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    containerRef.current.scrollBy({
      left: containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <h3>
        Favorite <span>Order</span>
      </h3>
      <div className="carousel-container" ref={containerRef}>
        {Cards.map((card) => (
          <div
            className="carousel-card"
            style={{ flexBasis: `${cardWidth}px` }}
            key={card.id}>
            {card.content}
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        {!isFirstPage && (
          <button
            className="carousel-btn prev-btn"
            type="button"
            onClick={handlePrevClick}>
            <FaArrowLeft />
          </button>
        )}
        {!isLastPage && (
          <button
            className="carousel-btn next-btn"
            type="button"
            onClick={handleNextClick}>
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

FoodCarousel.propTypes = {
  numCards: PropTypes.number.isRequired,
};

export default FoodCarousel;
