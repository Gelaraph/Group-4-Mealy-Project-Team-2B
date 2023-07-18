import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultipleLoadingCard from "../MultipleLoadingCard";
import ResturantTabs from "./ResturantTabs";
import AfricanGridContent from "./allResturantGrids/AfricanGrid";
import RandomResturantGrid from "./allResturantGrids/RandomResturantGrid";
import VendorContentComponent from "./allResturantGrids/VendorContentComponent ";

const MealCustomizationComponentWrapper = () => {
  const [tabs, setTabs] = useState(["Order Again", "All"]);
  const [isLoading, setIsLoading] = useState(true);

  const [content, setContent] = useState([
    <AfricanGridContent />,
    <RandomResturantGrid />,
  ]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://mealy.onrender.com/api/v1/vendor/all")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.vendors)) {
          const mappedTabs = data.vendors.map((vendor) => vendor.name);
          const mappedContent = data.vendors.map((vendor) => (
            <div key={vendor.id}>
              <VendorContentComponent vendorName={vendor.name} />
            </div>
          ));
          setTabs((prevTabs) => [...prevTabs.slice(0, 2), ...mappedTabs]);
          setContent((prevContent) => [
            prevContent[0],
            prevContent[1],
            ...mappedContent,
          ]);
        } else {
          // console.error("Invalid data format received from the endpoint.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the endpoint:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AllResturantStyle>
      <div className="header-rest">
        <h3>All Restaurants</h3>
      </div>
      <ResturantTabs
        tabs={tabs}
        content={isLoading ? [] : content}
        className="tabs-custom-class"
      />
      {isLoading && (
        <div className="loading-state-div">
          <MultipleLoadingCard />
        </div>
      )}
    </AllResturantStyle>
  );
};

const AllResturantStyle = styled.div`
  margin-top: 5em;
  background-color: #f8f8f8;
  .header-rest {
    margin-bottom: 3em;
    width: 90%;
    display: flex;
    justify-content: flex-start;
  }
  h3 {
    font-weight: 500;
    font-size: 32px;
    line-height: 34px;
    color: #32324d;
    margin-left: 0;
  }
  display: grid;
  place-items: center;
  .tabs-custom-class {
    width: 90%;
  }
  .loading-state-div {
    width: 90%;
    height: 50vh;
    margin: auto 0;
    margin-top: 2em;
  }
`;

export default MealCustomizationComponentWrapper;
