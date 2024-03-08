import AboutBanner from "components/AboutUs/AboutBanner";
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
      <div>
        <section className="bg-banner-liner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner-liners">
                  <h1>ABOUT US</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="common-content-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="common-heads">ABOUT US</h2>
                <p>
                  At Goli Soda, we believe that we can help you make sustainable changes to your consumption patterns, with very minimal alterations to your lifestyle and with superior product satisfaction.                </p>
                <p className="my-3">
                  By actively enabling a circular economy and generating net-positive environmental and health benefits, Goli Soda helps you live Sustainably, Every Day.                 </p>
                <p className="my-3">
                  Being truly sustainable is about examining the entire process chain that goes into each and everything we, as consumers, buy. Goli Soda is a conscious brand that examines who we work with, where our products come from, how it is manufactured, what goes into the product, how it is packaged and even how it will be recycled or discarded.                  </p>
                <p className="my-3">
                  We manufacture products that are chemical-free, zero waste, natural and contain sustainably sourced ingredients. We also believe in giving a second life to most non-perishables and focus on upcycling and repurposing of products to reduce the outflow of waste.                </p>
                <p className="my-3">
                  At Goli Soda, we are providing sustainable careers to, largely, women-led businesses, manufacturers, designers and brands, and work closely in nurturing these partnerships with our expertise in various marketplaces. Goli Soda is a community that is constantly growing and adding more members to its tribe!
                </p>
                <div>
                  <img
                    className="img-fluid"
                    style={{ width: "100%" }}
                    src={require("assets/images/Gs_about_us_page.jpg")}
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <AboutBanner /> */}
      {/* <CeoMessage />
      <AwardsAcolades />
      <Counters />
      <ServiceOffers />
      <CustomerSays /> */}
    </div>
  );
}

export default AboutPage;
