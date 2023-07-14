import React from "react";
import styles from "./About.module.css";
import subheadingStyles from "./aboutTop.module.css";

const Aboutmain = () => (
  <div>
    <div className={styles.wrapper}>
      <h2 className={subheadingStyles.heading}>Our Services</h2>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.textCont}>
            <h2 className={styles.h2Main}>Extensive Menu Selection</h2>
            <p className={styles.para}>
              At Mealy, we understand that everyone has different tastes and
              preferences. That&apos;s why we have curated a diverse and
              extensive menu to cater to a wide range of culinary cravings. From
              traditional favorites to international delights, our menu features
              an array of options that are sure to tantalize your taste buds.
            </p>
          </div>
          <div className={styles.textCont}>
            <h2 className={styles.h2Main}>Seamless Ordering Process</h2>
            <p className={styles.para}>
              We believe that ordering food should be effortless and
              hassle-free. With our user-friendly website and intuitive
              interface, placing an order with Mealy is a breeze. Simply browse
              through our menu, select your desired items, customize your order
              according to your preferences, and proceed to checkout. With just
              a few clicks, your delicious meal will be on its way to you.
            </p>
          </div>
        </div>
        <div className={styles.imgContainer} />
      </div>

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.textCont}>
            <h2 className={styles.h2Main}>Reliable and Prompt Delivery</h2>
            <p className={styles.para}>
              We understand the importance of timely deliveries, especially when
              hunger strikes. Our dedicated team of delivery personnel works
              diligently to ensure that your order reaches you promptly. With
              our efficient delivery system, you can expect your meal to arrive
              fresh and piping hot, right at your doorstep.
            </p>
          </div>

          <div className={styles.textCont}>
            <h2 className={styles.h2Main}> Special Dietary Considerations</h2>
            <p className={styles.para}>
              At Mealy, we believe in inclusivity and catering to various
              dietary requirements. We offer a range of options for individuals
              with specific dietary needs, such as vegetarian, vegan,
              gluten-free, and dairy-free. Our carefully curated menu ensures
              that everyone can enjoy a delicious meal tailored to their
              preferences.
            </p>
          </div>
        </div>
        {/* <div className={styles.imgContainer} /> */}
      </div>
    </div>
  </div>
);

export default Aboutmain;
