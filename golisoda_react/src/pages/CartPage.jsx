import CartProduct from "components/Cart";
import PackageSupport from "components/Home/PackageSupport/PackageSupport";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { scrollToTop } from "utils";
const CartPage = () => {
  const [page, setPage] = useState([]);
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <Helmet>
        <title>{page?.meta?.title || "Golisoda | Cart"}</title>
        <link rel="canonical" href={window.location.href} />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.png" />
        <meta name="description" content={"page?.meta?.description"} />
        <meta name="keywords" content={"page?.meta?.keywords"} />
      </Helmet>
      <CartProduct />
      <PackageSupport />
    </div>
  );
};

export default CartPage;
