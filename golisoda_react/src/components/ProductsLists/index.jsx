/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.scss";
import { Row } from "react-bootstrap";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductListDetails from "./ProductDetails/ProductListDetails";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { productListCategoryMenuApi, productsApi } from "services/filters.service";
import { SetAllCheckBoxes } from "utils";
// import { IoCaretUpCircle } from "react-icons/io5";
import ScrollToTop from "react-scroll-to-top";

const ProductLists = () => {
  const [products, setProduct] = useState([]);
  const [fetching, setfetching] = useState(true);
  const [tackLoader, setTackLoader] = useState(false);
  const [take, setTake] = useState(20);
  const location = useLocation();
  const { search } = useLocation();
  const [clearFilter, setClearFilter] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location.search);
  const searchParams = new URLSearchParams(location.search);
  let filterData = searchParams.toString();
  const [subcategory, setSubcategory] = useState([]);


  useMemo(() => {
    if (take === 20) {
      setfetching(true);
    } else {
      setTackLoader(true)
    }
    productsApi(search, take).then(({ data }) => {
      setProduct(data);
      setfetching(false);
      setTackLoader(false)
      SetAllCheckBoxes(location);
    });
  }, [take, currentLocation, filterData]);

  useEffect(() => {
    productListCategoryMenuApi(searchParams.toString().split("=")[1]).then(
      (response) => {
        if (response.data.length === undefined) setSubcategory(response.data);
      }
    ).catch(() => {
      setSubcategory([]);
    });
  }, [searchParams.toString()]);

  return (
    <div>
      {products?.length !== 0 &&
        <section className="p-0 ps-lg-5 ps-3 pt-4">
          <Row className="m-0  bg-white" >
            <ProductFilter
              filterData={filterData}
              setCurrentLocation={setCurrentLocation}
              clearFilter={clearFilter}
              setClearFilter={setClearFilter}
              products={products}
              min={Number(products?.min_value)}
              max={Number(products?.max_value)}
              slugCategoryName={searchParams.toString().split("=")[0]}
              slugName={searchParams.toString().split("=")[1]}
            />
            <ProductListDetails
              setCurrentLocation={setCurrentLocation}
              clearFilter={clearFilter}
              setClearFilter={setClearFilter}
              products={products}
              fetching={fetching}
              setTake={setTake}
              take={take}
              tackLoader={tackLoader}
              subcategory={subcategory}
            />
          </Row>
          <ScrollToTop smooth />
        </section>
      }
    </div>
  );
};

export default ProductLists;
