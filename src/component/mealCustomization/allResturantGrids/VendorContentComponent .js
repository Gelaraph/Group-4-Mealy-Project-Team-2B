/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EmptyVendorContent from "../../EmpytVendorContent";
import MultipleLoadingCard from "../../MultipleLoadingCard";
import ResturantContent from "../ResturantContent";
import Meal from "../../../assets/images/meal.png";
import Avocado from "../../../assets/images/hero/avocado-sandwich.png";
import "../../authComp/HeroSection/heroSection.css";

const VendorContentComponent = ({ vendorName }) => {
  const [contents, setContents] = useState([]);
  const [remainingContents, setRemainingContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://mealy.onrender.com/api/v1/vendor/${vendorName}`,
        );
        const data = await response.json();
        if (Array.isArray(data.data.products)) {
          const firstContentData = data.data.products
            .slice(0, 8)
            .map((item) => (
              <ResturantContent
                key={item._id}
                imageSrc={item.imageUrl}
                description={item.description}
                reviewText={`Reviews (${item.reviews.length})`}
                header={item.name}
                vendorName={vendorName}
                foodId={item._id}
              />
            ));
          setContents(firstContentData);
          const remainingProducts = data.data.products
            .slice(8)
            .map((item) => (
              <ResturantContent
                key={item._id}
                imageSrc={Meal}
                description={item.description}
                reviewText={`Reviews (${item.reviews.length})`}
                header={item.name}
              />
            ));
          setRemainingContents(remainingProducts);
        } else {
          console.error(
            "Invalid data format received from the vendor endpoint.",
          );
        }
      } catch (error) {
        console.error(
          "Error fetching vendor products from the endpoint:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorProducts();
  }, [vendorName]);

  return (
    <div>
      {isLoading ? (
        <div className="loading-state-div">
          <MultipleLoadingCard />
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {contents.length === 0 && remainingContents.length === 0 ? (
            <EmptyVendorContent />
          ) : (
            <div>
              <ContentWrapperGrid>
                {/* First grid */}
                {contents}
              </ContentWrapperGrid>

              {/* Discount box */}
              <div className="discount">
                <img src={Avocado} alt="" />
                <div>
                  <p className="discount-off">50% OFF</p>
                  <p className="discount-food">All salad and Pasta</p>
                  <button className="discount-btn" type="submit">
                    Use code Eattak50
                  </button>
                </div>
              </div>

              {remainingContents.length > 0 && (
                <ContentWrapperGrid>
                  {/* Remaining grid */}
                  {remainingContents}
                </ContentWrapperGrid>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ContentWrapperGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  width: 100%;
  justify-content: flex-start;
  padding-bottom: 4em;
  > div {
    width: 20%;
  }
  @media (max-width: 954px) {
    justify-content: center;
    row-gap: 1.5em;
    > div {
      width: 70%;
    }
  }
`;

export default VendorContentComponent;
