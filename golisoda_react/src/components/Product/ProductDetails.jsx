import "./Product.scss";
import "react-image-lightbox/style.css";
import { Col, Row } from "react-bootstrap";
import ProductsFeaturesTabs from "./ProductFeaturesMenu/ProductsFeaturesTabs";
import ProductInformation from "./ProductInformation";
import ProductGallery from "./ProductGallery";
import ProductSlider from "components/ProductSlider/ProductSlider";
import "components/Home/HomeProductsSlider/styles.scss";
import "components/Home/NewArrivals/styles.css";
import ProductBreadcrumb from "./ProductBreadcrumb";
import CompareButton from "components/CompareButton";
import { Image } from "utils";

function ProductDetails({ product }) {
  console.log("product", product);
  if (product) {
    return (
      <div className="mt-3">
        <Row className=" h-100">
          <Col xl={6} className={`${window.innerWidth > 992 ? 'sticky-top' : ''} h-100 sticky-padding-2 bg-xl-white`}>
            <ProductBreadcrumb
              slug={product.category_slug}
              category={product.category_name}
              title={product.product_name}
            />
            <div className="position-relative ">
              {product.discount_percentage !== 0 &&
                <span className="offer-badge">
                  <div>
                    {product.discount_percentage}% <span>OFF</span>
                  </div>
                </span>
              }
              {product?.gallery?.length === 0 ?
                <Image src={product?.image} width="100%" className="product-mobile-image" />
                :
                <ProductGallery videos={product.video_link} images={product.gallery || product.image} />
              }
            </div>
            {/* <div className="text-center pb-3">
              <CompareButton className="btn btn-outline-info" product={product} />
            </div> */}
          </Col>
          <Col xl={6} className="sticky-padding-2">
            <ProductInformation product={product} />
          </Col>
        </Row>
        <ProductsFeaturesTabs product={product} />
        {product.related_products.length !== 0 ? (
          <div className="py-5 related-slider">
            <h5 className="text-center mb-4">Related Products</h5>
            <ProductSlider products={product.related_products} />
          </div>
        ) : ''}
      </div>
    );
  }
}

export default ProductDetails;
