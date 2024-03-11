import HomeProductsSlider from "components/Home/HomeProductsSlider/HomeProductsSlider";
import PackageSupport from "components/Home/PackageSupport/PackageSupport";
import DealsProduct from "components/Home/DealsProduct/DealsProduct";
import CategoriesPoster from "components/Home/CategoriesPoster/CategoriesPoster";
import BrowseByCollection from "components/Home/BrowseByCollection/BrowseByCollection";
import ServiceCenter from "components/Home/ServiceCenter/ServiceCenter";
import NarrowSearch from "components/Home/NarrowSearch/NarrowSearch";
import PrefferedProcessor from "components/Home/PrefferedProcessor/PrefferedProcessor";
import MustHaves from "components/Home/MustHaves/MustHaves";
import { useEffect, useState } from "react";
import { homePageApi } from "services/page.service";
import { setHomePageCollection } from "redux/features/homePageSlice";
import { useDispatch } from "react-redux";
import { Loader, scrollToTop } from "utils";
import ProductCollection from "components/Home/ProductCollection/ProductCollection";
import { Helmet } from "react-helmet";
import { setLayoutStatus } from "redux/features/authLayoutSlice";
import NewsLetterComponent from "components/Newsletter/NewsLetter";

const HomePage = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const GetPageData = () => {
    homePageApi().then((response) => {
      if (response) {
        dispatch(setHomePageCollection(response));
        setFetching(false);
      }
    });
  };
  useEffect(() => {
    GetPageData();
    scrollToTop();
    if (window.location.hash === '#login') {
      dispatch(setLayoutStatus({ status: true, type: 'login' }))
    }
    if (window.location.hash === '#register') {
      dispatch(setLayoutStatus({ status: true, type: 'register' }))
    }
    if (window.location.hash === '#forgot-password') {
      dispatch(setLayoutStatus({ status: true, type: 'forgot_password' }))
    }
  }, []);
  if (fetching) return <Loader />;
  return (
    <div>
      <Helmet>
        <title>Buy Natural, Organic, Eco Friendly &amp; Sustainable Products | golisodastore.com| golisodastore.com</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content="Buy Natural, Organic, Eco Friendly &amp; Sustainable Products | golisodastore.com| golisodastore.com" />
        <meta name="description" content="Goli Soda is a curated marketplace with a wide variety of Organic, Chemical-free, Zero Waste, Sustainable &amp; Eco-Friendly Products. Shop from 100+ handpicked Sustainable Brands." />
      </Helmet>
      <HomeProductsSlider />
      <DealsProduct />
      <CategoriesPoster />
      <BrowseByCollection />
      <NarrowSearch />
      <ProductCollection />
      {/* <ServiceCenter /> */}
      {/* <PrefferedProcessor /> */}
      <MustHaves />
      <NewsLetterComponent />
      <PackageSupport />
    </div>
  );
};

export default HomePage;
