import ReturnPolicy from "components/ReurnPolicy";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { scrollToTop } from "utils";

function ReturnPolicyPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Golisoda | Return Policy</title>
        <link rel="canonical" href={window.location.href} />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <meta name="description" content="Return Policy" />
      </Helmet>
      <ReturnPolicy />
    </div>
  );
}

export default ReturnPolicyPage;
