/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
import { useCart } from "react-use-cart";
import MultipleLoadingCard from "../MultipleLoadingCard";
import HeroBackgroundImg from "../../assets/images/dashboard-hero-bg.png";
import AttributeImg from "../../assets/images/Frame 91.png";
import Layout from "../Layout";
import RestaurantGrid from "./RestaurantGrid";
import SideCheckoutSummary from "./SideCheckoutSummary";
import MealCustomizationModal from "./MealCustomizationModal";
import EmptyCategory from "../EmptyCategory";

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}>
    {value === index && (
      <div style={{ padding: "16px", paddingTop: 0 }}>
        <div className="dashboard-content-grid">{children}</div>
      </div>
    )}
  </div>
);

const ResturantDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [tabs, setTabs] = useState(["Order Again", "All"]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split("/");
  const extractedVendorName = parts[2]; // Assuming the vendor's name is at index 2 in the path

  useEffect(() => {
    const storedValue = localStorage.getItem("selectedTab");
    if (storedValue !== null) {
      setValue(Number(storedValue));
    }
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      handleChange(index);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      handleChange(Math.max(0, value - 1));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      handleChange(Math.min(6, value + 1));
    }
  };

  useEffect(() => {
    const handleKeyDownGlobal = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        handleChange(Math.max(0, value - 1));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        handleChange(Math.min(6, value + 1));
      }
    };
    document.addEventListener("keydown", handleKeyDownGlobal);

    return () => {
      document.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, [value]);

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    // Fetch the product categories from the API endpoint
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://mealy.onrender.com/api/v1/product/category/all",
        );
        const categoryNames = [
          "All",
          ...response.data.data.map((category) =>
            capitalizeFirstLetter(category.name),
          ),
        ];
        setCategories(categoryNames);
        setTabs(["Order Again", ...categoryNames]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (category, vendorName) => {
    try {
      setLoading(true);
      if (category.toLowerCase() === "all") {
        const response = await axios.get(
          `https://mealy.onrender.com/api/v1/vendor/${extractedVendorName}`,
        );
        const filteredProducts = response.data?.data?.products;
        setProducts(filteredProducts);
      } else {
        const response = await axios.get(
          `https://mealy.onrender.com/api/v1/vendor/${vendorName}`,
        );
        const filteredProducts = response.data?.data?.products?.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase(),
        );
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = async (category) => {
    if (category.toLowerCase() === "all") {
      await fetchProductsByCategory("All", extractedVendorName);
    } else {
      await fetchProductsByCategory(category, extractedVendorName);
    }
  };

  return (
    <Layout>
      <DashboardStyle>
        <div className="dashboard-hero-container">
          <div className="dashboard-hero-container-overlay" />
          <div className="dashboard-hero-content">
            <h1>{extractedVendorName}</h1>
          </div>
        </div>

        <div className="dashboard-tabs-content-cont">
          <div className="dashboard-content-tabs">
            <div role="tablist" className="tabList">
              <img src={AttributeImg} alt="" className="attibute-img" />
              {tabs.map((category, index) => (
                <div
                  className={`tab-button ${index === value ? "active-tab" : ""} 
                  ${index === 0 ? "disabled-tab" : ""}`}
                  key={`vertical-tab-${index}`}
                  id={`vertical-tab-${index}`}
                  aria-controls={`vertical-tabpanel-${index}`}
                  onClick={() => {
                    if (index !== 0) {
                      handleChange(index);
                      handleTabClick(category);
                    }
                  }}
                  tabIndex={value === index ? 0 : -1}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  role="tab">
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-content">
            {loading ? (
              <MultipleLoadingCard />
            ) : (
              <div className="dashboard-content-grid">
                {products.length === 0 ? (
                  <EmptyCategory />
                ) : (
                  products.map((product, index) => (
                    <RestaurantGrid
                      key={index}
                      imageSrc={product.imageUrl}
                      description={product.description}
                      reviewText={`Reviews (${product.reviews.length})`}
                      header={product.name}
                      onClick={() => handleProductClick(product)}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div className="checkout-summary-section">
            <SideCheckoutSummary />
          </div>
        </div>

        {selectedProduct && (
          <MealCustomizationModal
            product={selectedProduct}
            onCloseModal={() => setSelectedProduct(null)}
            onAddToCart={(product) => addItem({ id: product._id, ...product })}
          />
        )}
      </DashboardStyle>
    </Layout>
  );
};

const DashboardStyle = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  .dashboard-hero-container {
    height: 276px;
    width: 100%;
    margin-top: 7em;
    margin-bottom: 2em;
    position: relative;
    display: grid;
    place-items: center;
  }
  .dashboard-hero-container-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        0deg,
        rgba(84, 84, 107, 0.38),
        rgba(84, 84, 107, 0.38)
      ),
      url(${HeroBackgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }
  .dashboard-hero-content {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    align-items: center;
    text-decoration: none;
    font-weight: 700;
    font-size: 28px;
    line-height: 58px;

    img {
      width: 100px;
      height: 100px;
    }
  }
  .dashboard-tabs-content-cont {
    display: grid;
    grid-template-columns: 0.5fr 2fr 1fr;
    gap: 1em;
    width: 100%;
    padding-bottom: 5em;
  }
  @media (max-width: 1089px) {
    .dashboard-tabs-content-cont {
      grid-template-columns: 0.4fr 2fr;
      .dashboard-content-tabs {
        grid-column: 1 / 2;
      }
      .dashboard-content {
        grid-column: 2 / 3;
      }
      .checkout-summary-section {
        grid-column: 1 / 3;
        justify-self: center;
        width: 60%;
        margin-top: 2em;
      }
    }
  }

  .dashboard-content-tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 8px 8px;
    gap: 10px;
    background: #ffffff;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08);
    height: 500px;
    .tab-button {
      text-align: center;
    }
  }
  .attibute-img {
    width: 10em;
  }
  .dashboard-content-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    width: 100%;
  }
  .dashboard-content-grid > div {
    margin-top: 0;
    width: 27%;
  }

  .dashboard-content-grid-item {
    margin-top: 0 !important;
  }
  @media (max-width: 747px) {
    .dashboard-content-grid > div {
      width: 35%;
    }
  }
  @media (max-width: 658px) {
    .dashboard-content-grid > div {
      width: 80%;
    }
  }
`;

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
export default ResturantDashboard;
