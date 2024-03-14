import "./styles.css";
import { useSelector } from "react-redux";
import { Image } from "utils";
import { FilterLink } from "helpers";
import { FiChevronRight } from "react-icons/fi";

const NarrowSearch = () => {
  const brands = useSelector(state => state.homePageCollection.brands)
  if (brands?.brands) return (
    <>
      <div className="section-wrapper">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4 px-3">
            <h3 className="h2 section-title m-0 w-100 text-center">Narrow Your Search to the Brands you Trust</h3>
            <FilterLink to={`/brands`}>
              <small className="d-flex align-items-center viewallCtr">
                View All <FiChevronRight className="ms-2" />
              </small>
            </FilterLink>
          </div>
          <div className="row g-3 justify-content-center">
            {
              brands?.brands?.map((item, i) => (
                i < 5 && (
                  <div className="col-6 col-xl col-lg-3 col-md-4" key={i}>
                    <FilterLink to={`products?brands=${item.slug}`}>
                      <Image src={item.image} alt={item.title} className="w-100" />
                    </FilterLink>
                  </div>
                )
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default NarrowSearch;
