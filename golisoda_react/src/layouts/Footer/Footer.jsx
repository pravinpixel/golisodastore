import "./styles.scss";
import { FiPhone } from "react-icons/fi";
import { RiMapPinLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { Loader, getCurrentYear, openInNewTab, scrollToTop } from "utils";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFooterApi } from "services/page.service";
import { useEffect, useState } from "react";
import { setfooterCollection } from "redux/features/footerSlice";
// import { AiOutlineInstagram } from "react-icons/ai";
// import { RiFacebookFill, RiTwitterFill } from "react-icons/ri";

const Footer = () => {
  useEffect(() => {
    GetPageData();
    scrollToTop();
  }, []);

  const dispatch = useDispatch();
  const footerData = sessionStorage.getItem("footer_collection");
  const [fetching, setFetching] = useState(footerData !== null ? false : true);
  const GetPageData = () => {
    getFooterApi().then((response) => {
      if (response) {
        dispatch(setfooterCollection(response));
        setFetching(false);
      }
    });
  };
  const brands = useSelector((state) => state.footerCollection.brands);
  const siteInfo = useSelector((state) => state.footerCollection.siteInfo);
  const quickLink = useSelector((state) => state.footerCollection.quickLink);
  const mobNum = siteInfo && siteInfo.site_mobile_no.split(",");
  const address = siteInfo && siteInfo.address.split(",");
  if (fetching) return <Loader />;
  // if (siteInfo && quickLink && brands)
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={3} xl={3}>
            <img src={siteInfo?.logo} alt="logo" />
            <ListGroup>
              {siteInfo?.links?.map((i, index) => (
                <ListGroup.Item key={index}>
                  <Link to={i.link_url} target="_blank">
                    <i className={`fa-brands fa-${i.link_name}`}></i>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col xs={12} sm={12} md={6} lg={2} xl={2}>
            <h3>Quick Links</h3>
            <div className="footer-links">
              {quickLink.map((item) => (
                // <div onClick={() => navigate(`${item.url}`)}>
                //   {item.name}
                // </div>
                <Link to={item.url} key={item.id} target={item.name === "Blog" && "_blank"}>
                  {item.name}
                </Link>
              ))}
            </div>
          </Col>

          {/* <Col xs={12} sm={12} md={6} lg={2} xl={2}>
            <h4>Shop Brands</h4>
            <div className="footer-links">
              {brands &&
                brands.map((brand) => (
                  <Link to={`products?brands=${brand.slug}`} key={brand.id}>
                    {brand.title}
                  </Link>
                ))}
            </div>
          </Col> */}

          <Col xs={12} sm={12} md={6} lg={2} xl={2}>
            <h5>Policies</h5>
            <div className="footer-links">
              <Link to="/shipping-delivery">Delivery & Shipping</Link>
              <Link to="/terms-conditions">Terms & Conditions</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/return-policy">Return Policy</Link>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={2} xl={2}>
            <h6>Forms</h6>
            <div className="footer-links">
              <Link to="https://docs.google.com/forms/d/e/1FAIpQLSc85X4aST7gzZK2WB5nS3kDw616_uJPFR5kCqG3hWMk9D9YFA/viewform" target="_blank">Subscription</Link>
              <Link to="https://docs.google.com/forms/d/e/1FAIpQLScFhQD4PDqEFaKdEw7yZWlNtZp9dkmqHKkyfiF7z92zVH3D8g/viewform" target="_blank">Website Review</Link>
              <Link to="https://docs.google.com/forms/d/e/1FAIpQLSetAz-CIxTDAELz0Owp12rdpsm7FsTudVW0C_ZEP094v2oYfg/viewform?usp=send_form" target="_blank">Partner with us a Distributor</Link>
              <Link to="https://forms.gle/CiYoECZCYVgiYxjdA" target="_blank">Stock in your store</Link>
              <Link to="https://docs.google.com/forms/d/1cdarSRv3fgb-1Zo4SAiEYtEwj3JVP7OpLV15v0AUGdU/viewform?ts=61eff974&edit_requested=true" target="_blank">Sell with Goli Soda</Link>
            </div>
          </Col>

          {/* <Col xs={12} sm={12} md={6} lg={2} xl={2}>
              <h5>Information</h5>
              <div className="footer-links">
                <Link to="/shipping-delivery">Shipping & Delivery</Link>
                <Link to="/terms-conditions">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/warantty-policy">Warranty Policy</Link>
                <Link to="/store-locator-for-sales">Store locator for Sales</Link>
                <Link to="/store-locator-for-service">Store locator for service</Link>
                <Link to="/">Support Center</Link>
                <Link to="/">Terms Of Use</Link>
                <Link to="/">Returns Policy</Link>
              </div>
            </Col> */}
          <Col xs={12} sm={12} md={6} lg={3} xl={3}>
            <h6>Contact Us</h6>
            <Row className="footer-text1">
              <Col xs={1}>
                <RiMapPinLine />
              </Col>
              <Col>
                {address && address.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </Col>
            </Row>
            <Row className="footer-text1">
              <Col xs={1}>
                <TfiEmail />
              </Col>
              <Col>
                <Link to={`mailto:${siteInfo?.site_email}`}>
                  {siteInfo?.site_email}
                </Link>
              </Col>
            </Row>
            <Row className="footer-text1">
              <Col xs={1}>
                <FiPhone />
              </Col>
              <Col>
                {mobNum &&
                  mobNum.map((num, i) => (
                    <Link key={i} to={`tel:${num}`}  >
                      <>
                        {i !== mobNum.length - 1 ? (
                          <>
                            {`${num},`}
                          </>
                        ) : (
                          `${num}.`
                        )}
                      </>
                    </Link>
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <p className="footer-bottom-text1">
          Copyright &copy; {getCurrentYear()} {siteInfo?.site_name} | All
          Rights Reserved | Designed by Pixel Studios
        </p>
      </div>
    </footer>
  );
};

export default Footer;
