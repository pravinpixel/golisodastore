import WarrantyPolicy from "components/WarrantyPolicy/WarrantyPolicy";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { scrollToTop } from "utils";

function WaranttyPolicyPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Golisoda | Warranty Policy</title>
        <link rel="canonical" href={window.location.href} />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <meta name="description" content="Read our Warranty Policy" />
      </Helmet>
      <WarrantyPolicy />
    </div>
  );
}

export default WaranttyPolicyPage;
