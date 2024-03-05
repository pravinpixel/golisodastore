// import AboutBanner from "components/AboutUs/AboutBanner";
// import AwardsAcolades from "components/AboutUs/AwardsAcolades";
// import CeoMessage from "components/AboutUs/CeoMessage";
// import Counters from "components/AboutUs/Counters";
// import CustomerSays from "components/AboutUs/CustomerSays";
// import ServiceOffers from "components/AboutUs/ServiceOffers";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { scrollToTop } from "utils";

function AboutPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Golisoda | About Us</title>
        <link rel="canonical" href={window.location.href} />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <meta name="description" content="Golisoda | About Us" />
      </Helmet>

      {/* <AboutBanner />
      <CeoMessage />
      <AwardsAcolades />
      <Counters />
      <ServiceOffers />
      <CustomerSays /> */}
    </div>
  );
}

export default AboutPage;
