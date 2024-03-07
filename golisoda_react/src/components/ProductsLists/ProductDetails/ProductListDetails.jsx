import { Col } from "react-bootstrap";
import ProductListComponent from "../ProductListComponent";
import CategoryFilters from "../ProductFilter/CategoryFilters";
import ProductListPreloader from "../ProductListPreloader";

const ProductListDetails = ({
  products,
  fetching,
  setTake,
  take,
  setCurrentLocation,
  setClearFilter,
  tackLoader,
  subcategory
}) => {
  return (
    <Col lg={10} className="align-self-start px-0 sticky-padding" >
      {subcategory?.banner_image &&
        <div>
          <img src={subcategory?.banner_image} alt={subcategory?.name} className="w-100" />
        </div>
      }
      <CategoryFilters setCurrentLocation={setCurrentLocation} subcategory={subcategory} />
      {products && (
        <div className="list-details-side pe-lg-5 pe-3">
          <div className="primary-heads p-md-3 mb-3 mb-md-0">
            <h1 className="h3 m-0">
              <span className="text-dark pe-2 fw-600">{subcategory?.name}</span> Displaying {products.to} of
              {products.total_count} results
            </h1>
          </div>
          {fetching ? (
            <ProductListPreloader />
          ) : (
            <>
              {products.length === 0 ? (
                "No Data"
              ) : (
                <>
                  <div style={{ minHeight: '100vh' }}>
                    <ProductListComponent products={products.products} />
                  </div>
                  <center>
                    {
                      products.total_count !== products.to ?
                        <button
                          onClick={() => setTake(take + 20)}
                          loading={tackLoader.toString()}
                          className="btn my-4 btn-info"
                        >
                          Load more
                        </button>
                        : ''
                    }
                  </center>
                </>
              )}
            </>
          )}
        </div>
      )}
    </Col>
  );
};

export default ProductListDetails;
