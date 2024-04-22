/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductBreadcrumb({ slug, category, title, className }) {
  return (
    <div>
      {className ?
        <Container>
          <div className={`d-md-flex align-items-center`}>
            <div className="d-flex align-items-center">
              <Link to={`/products?categories=${slug}`}>
                <small className="text-secondary">{category}</small>
              </Link>
              <div className="px-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M1 13L7 7L1 1" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <a href="#">
              <small className="text-dark">
                {title}
              </small>
            </a>
          </div>
        </Container> :
        <div className={`d-md-flex align-items-center ${className}`}>
          <div className="d-flex align-items-center">
            <Link to={`/products?categories=${slug}`}>
              <small className="text-secondary">{category}</small>
            </Link>
            <div className="px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 13L7 7L1 1" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <a href="#">
            <small className="text-dark">
              {title}
            </small>
          </a>
        </div>
      }
    </div>
  );
}

export default ProductBreadcrumb;
