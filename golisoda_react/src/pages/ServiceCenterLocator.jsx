import axios from "axios";
import ServiceCenterLocatorBanner from "components/ServiceCenter/ServiceLocatorBanner/ServiceCenterLocatorBanner";
import ServiceLocatorContent from "components/ServiceCenter/ServiceLocatorContent/ServiceLocatorContent";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Loader, scrollToTop } from "utils";

const ServiceCenterLocator = () => {
  const [serviceCenterData, setServiceCenterData] = useState();
  const [serviceCenterFilteredData, setServiceCenterFilteredData] = useState();
  const [fetching, setfetching] = useState(true);
  const [filterFetching, setFilterFetching] = useState(true);

  const [centerID, setCenterID] = useState("");
  const [brandId, setBrandId] = useState("");
  const [postCode, setPostCode] = useState("");

  const [filterButton, setFilterButton] = useState(false);

  useEffect(() => {
    scrollToTop();
    getData();
  }, []);

  useEffect(() => {
    getFilterData();
  }, [centerID, brandId, postCode, filterButton]);

  const getData = () => {
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/serviceCenter`)
      .then((res) => {
        setServiceCenterData(res.data);
        setfetching(false);
      })
      .catch((err) => console.error(err));
  };

  const getFilterData = () => {
    setFilterFetching(true);
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/serviceCenter`, {
        center_id: centerID,
        brand_id: brandId,
        post_code: postCode,
      })
      .then((res) => {
        setServiceCenterFilteredData(res.data);
        setFilterFetching(false);
      })
      .catch((err) => console.error(err));
  };

  return fetching ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>Golisoda | Service Center Location</title>
        <link rel="canonical" href={window.location.href} />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <meta
          name="description"
          content="Check out Golisoda | Service Center Location"
        />
      </Helmet>
      <ServiceCenterLocatorBanner
        serviceCenterData={serviceCenterData}
        serviceCenterFilteredData={serviceCenterFilteredData}
        setCenterID={setCenterID}
        setBrandId={setBrandId}
        setPostCode={setPostCode}
        filterButton={filterButton}
        setFilterButton={setFilterButton}
      />
      <ServiceLocatorContent
        fetching={filterFetching}
        serviceCenterFilteredData={serviceCenterFilteredData}
      />
    </>
  );
};

export default ServiceCenterLocator;
