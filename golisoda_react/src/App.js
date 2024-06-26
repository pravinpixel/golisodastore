import "./App.scss";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Loader, strRandom } from "utils";
import {
  AboutPage,
  CartPage,
  HomePage,
  Layout,
  MyAddressBook,
  MyOrders,
  MyProfile,
  MyWishlist,
  NotFound,
  ProductPage,
  ProductLists,
  ProfileLayout,
  StoreLocatorPage,
  MyOrdersDetails,
  ShippingDeliveryPage,
  PrivacyPolicyPage,
  WaranttyPolicyPage,
  ContactUsPage,
  ServiceCenterLocator,
  ServiceCenterDetails,
  VerifyAccount,
  ResetPassword,
  ComparePage,
  StoreLocationDetailsPage,
  PaymentSuccess,
  OrderSuccess,
  TermsConditions,
  VerifyPayment,
  PaymentFaild
} from "lazy";
import PageComponent from "components/PageComponent";
import ServicesListingComponent from "components/ServicesListingComponent";
import ReturnPolicy from "components/ReurnPolicy";
import BrandsPage from "pages/BrandsPage";
import { useSelector } from "react-redux";

function App() {

  // const datas = useSelector((state) => state?.auth);
  // useEffect(() => {
  //   if (datas?.data === null && datas?.isLoggedIn) {
  //     localStorage.clear();
  //     sessionStorage.clear();
  //   }
  // }, [])

  if (localStorage.getItem('guest_token') === null) {
    localStorage.setItem('guest_token', strRandom())
  }

  useEffect(() => {
    sessionStorage.removeItem("home_page_collection")
  }, [])


  return (
    <BrowserRouter>
      <Suspense >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductLists />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/shipping-delivery" element={<ShippingDeliveryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/my-account" element={<ProfileLayout />}>
              <Route path="profile" element={<MyProfile />} />
              <Route path="address-book" element={<MyAddressBook />} />
              <Route path="myorders" element={<MyOrders />} />
              <Route path="myorders/:order_id" element={<MyOrdersDetails />} />
              <Route path="wishlist" element={<MyWishlist />} />
            </Route>
            <Route path="/store-locator-for-sales" element={<ServicesListingComponent />} />
            <Route path="/store-locator-for-service" element={<ServicesListingComponent />} />
            <Route path="/verify-account/:token" element={<VerifyAccount />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment-faild" element={<PaymentFaild />} />
            <Route path="/verify-payment/:token" element={<VerifyPayment />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path=":page_slug" element={<PageComponent />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;