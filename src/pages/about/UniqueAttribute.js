import React from "react";
import styles from "./uniqueAttribute.module.css";
import vissionImg from "./vision.webp";
import LoyaltyImg from "./jellof.jpg";
import subheadingStyles from "./About.module.css";
import headingStyles from "./aboutTop.module.css";

const UniqueAttribute = () => (
  <div className={styles.vision}>
    <h2 className={headingStyles.heading}>What Makes Us Unique?</h2>
    <div className={styles.container}>
      <img className={styles.img} src={vissionImg} alt="" />
      <div className={subheadingStyles.textCont}>
        <h2 className={subheadingStyles.h2Main}>
          Personalized Recommendations
        </h2>
        <p className={subheadingStyles.para}>
          At Mealy, we strive to go above and beyond to cater to your unique
          preferences. Our platform utilizes advanced algorithms and artificial
          intelligence to analyze your previous orders, allowing us to provide
          personalized recommendations based on your taste preferences. This
          ensures that you are always presented with options that align with
          your culinary preferences, making the decision-making process even
          easier.
        </p>
      </div>
    </div>
    <div className={styles.container}>
      <img className={styles.img} src={LoyaltyImg} alt="" />
      <div className={subheadingStyles.textCont}>
        <h2 className={subheadingStyles.h2Main}>Loyalty Rewards Program</h2>
        <p className={subheadingStyles.para}>
          We value our customers and believe in rewarding their loyalty. Our
          loyalty rewards program allows you to earn points with every order.
          These points can be redeemed for exciting discounts, free items, or
          even exclusive offers. We want to show our appreciation for your
          continued support by giving back to you, our valued customer.
        </p>
      </div>
    </div>
    <div className={styles.container}>
      <div className={subheadingStyles.textCont}>
        <h2 className={subheadingStyles.h2Main}>Customer Support Excellence</h2>
        <p className={subheadingStyles.para}>
          At Mealy, we take pride in providing exceptional customer service. Our
          dedicated support team is available round the clock to address any
          queries, concerns, or feedback you may have. We believe in building
          strong relationships with our customers and ensuring their
          satisfaction at every step of their culinary journey with us.
        </p>
      </div>
    </div>
  </div>
);

export default UniqueAttribute;
