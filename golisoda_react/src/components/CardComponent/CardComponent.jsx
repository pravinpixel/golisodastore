import {Image} from "utils";
import {Rating} from "@mui/material";
import {AiFillStar} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import AddCartButton from "components/AddCartButton";
import AddFavButton from "components/AddFavButton";
// import CompareButton from 'components/CompareButton'
import "./CardComponent.scss";
import {Card, Stack} from "react-bootstrap";

function CardComponent({product, type, className, sliderComponent}) {
  const navigate = useNavigate();
  if (type === "list" && window.innerWidth > 450)
    return (
      <div className={className}>
        <div className="product-card overflow-hidden">
          <div className="row m-0">
            <div className="col-4">
              <div className="position-relative text-center pb-3">
                <span
                  onClick={() => navigate(`/products/${product.product_url}`)}
                >
                  <Image
                    src={product.image}
                    alt={product.product_name}
                    className="product-list-image w-100"
                  />
                </span>
                {product.discount_percentage !== 0 && (
                  <div className="off-prc">
                    <h3>
                      {" "}
                      {product.discount_percentage}% <br /> <span>OFF</span>
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <div className="col-8 ari-cnt text-start bg-white">
              <div
                className="cursor"
                onClick={() => navigate(`/products/${product.product_url}`)}
              >
                <div className="d-flex justify-content-between">
                  <h2 className="text-start">{product.category_name}</h2>
                  {product?.common_review?.rating ? (
                    <h3>
                      <AiFillStar /> {product?.common_review?.rating}
                    </h3>
                  ) : (
                    ""
                  )}
                </div>
                <h3 className="h3 text-start">{product.product_name}</h3>
                <h4 className="h5">
                  {product.discount_percentage !== 0 && (
                    <i className="old-price">
                      ₹{product?.strike_price}
                      {/* ₹{product?.strike_price?.replace(".00", "")} */}
                    </i>
                  )}
                  <span className="new-price text-info fw-bold">
                    ₹{product?.price?.replace(".00", "")}
                  </span>
                  {product.discount_percentage !== 0 && (
                    <div className="text-info fs-6">
                      You Save (₹ {product.save_price}){" "}
                    </div>
                  )}
                </h4>
              </div>
              <div className="d-flex align-items-center clk-optn">
                <AddFavButton
                  buttonType="icon"
                  className="btn btn-outline-info rounded-box-circle rounded-box-sm"
                  product={product}
                />
                <AddCartButton
                  type="button"
                  className="btn btn-primary ms-2"
                  product={product}
                  varCheck={product?.default_value}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (window.innerWidth > 450 && type === undefined)
    return (
      <Card className="cardShadow gridCard">
        <div
          className="ari-img cursor"
          onClick={() => navigate(`/products/${product.product_url}`)}
        >
          <Image src={product.image} alt={product.product_name} />
          {product.discount_percentage !== 0 && (
            <div className="off-prc">
              <h3>
                {" "}
                {product.discount_percentage}% <br /> <span>OFF</span>
              </h3>
            </div>
          )}
        </div>
        <Card.Body className="p-0">
          <div className="innerCardSec-1 position-relative">
            <div
              className={
                sliderComponent
                  ? "ari-cnt card-body-ctr-slider text-center"
                  : "ari-cnt card-body-ctr text-center"
              }
            >
              <div className="cursor">
                <Stack direction="horizontal" gap={5} className="headerText">
                  <div
                    onClick={() => navigate(`/products/${product.product_url}`)}
                  >
                    <h2 className="text-start">{product.category_name}</h2>
                  </div>
                  <div>
                    <div className="cartFavBtn">
                      <AddFavButton
                        buttonType="icon"
                        className="btn btn-outline-info me-1 rounded-box-circle rounded-box-sm"
                        product={product}
                        roundRemove={true}
                      />
                    </div>
                  </div>
                </Stack>
                <h3
                  className="product-name h3"
                  onClick={() => navigate(`/products/${product.product_url}`)}
                >
                  {product.product_name}
                </h3>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="bgCard border-0">
          <div className="d-flex justify-content-between clk-optn-mobile align-items-center">
            <div className="d-flex justify-content-center clk-optn">
              <h4 className="h4">
                {product.discount_percentage !== 0 && (
                  <span className="old-price">
                    ₹{product?.strike_price}
                    {/* ₹{product?.strike_price?.replace(".00", "")} */}
                  </span>
                )}
                <span className="new-price">{`₹${product?.price}.00`}</span>
                {product.discount_percentage !== 0 && (
                  <div className="text-info fs-6">
                    You Save (₹ {product.save_price}){" "}
                  </div>
                )}
              </h4>
            </div>
            <div className="cartbtnCtr">
              <AddCartButton
                type="button"
                className="btn btn-primary"
                product={product}
                varCheck={product?.default_value}
              />
            </div>
          </div>
        </Card.Footer>
      </Card>
      // <div className='product-card h-100p'>
      //   <div className="arival-det h-100p">
      //     <div className="ari-img cursor" onClick={() => navigate(`/products/${product.product_url}`)}>
      //       <Image src={product.image} alt={product.product_name} />
      //       {product.discount_percentage !== 0 &&
      //         <div className="off-prc">
      //           <h3> {product.discount_percentage}% <br /> <span>OFF</span></h3>
      //         </div>
      //       }
      //     </div>
      //     <div className="ari-cnt text-center position-relative">
      //       <div className="cursor" onClick={() => navigate(`/products/${product.product_url}`)}>
      //         <div className="d-flex justify-content-between" >
      //           <h2>{product.category_name}</h2>
      //           {
      //             product?.common_review?.rating ?
      //               <h3><AiFillStar /> {product?.common_review?.rating}</h3>
      //               : ''
      //           }
      //         </div>
      //         <h3 className='product-name h3'>{product.product_name}</h3>
      //         <h4 className='h4'>
      //           {product.discount_percentage !== 0 &&
      //             <span className='old-price'>₹{product.strike_price.replace('.00', '')}</span>
      //           }
      //           <span className="new-price">₹{product.price.replace('.00', '')}</span>
      //           {product.discount_percentage !== 0 &&
      //             <div className="text-info fs-6">You Save (₹ {product.save_price}) </div>
      //           }
      //         </h4>
      //       </div>
      //       <div className="d-flex justify-content-between poa-card">
      //         <div className="d-flex justify-content-center clk-optn">
      //           <AddFavButton buttonType="icon" className="btn btn-outline-info me-1 rounded-box-circle rounded-box-sm" product={product} />
      //           {/* <CompareButton buttonType="icon" className="btn btn-outline-info me-1 rounded-box-circle rounded-box-sm" product={product} /> */}
      //         </div>
      //         <div>
      //           <AddCartButton type='button' className="btn btn-primary" product={product} />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  if (window.innerWidth < 450)
    return (
      <Card className="cardShadow gridCard">
        <div
          className="ari-img cursor"
          onClick={() => navigate(`/products/${product.product_url}`)}
        >
          <Image
            src={product.image}
            alt={product.product_name}
            className="product-card-image-sm"
          />
          {product.discount_percentage !== 0 && (
            <div className="off-prc">
              <h3>
                {" "}
                {product.discount_percentage}% <br /> <span>OFF</span>
              </h3>
            </div>
          )}
        </div>
        <Card.Body className="p-0">
          <div className="innerCardSec-1 position-relative">
            <div
              className={
                sliderComponent
                  ? "ari-cnt card-body-ctr-slider text-center"
                  : "ari-cnt card-body-ctr text-center"
              }
            >
              <div className="cursor">
                <Stack direction="horizontal" gap={5} className="headerText">
                  <div
                    onClick={() => navigate(`/products/${product.product_url}`)}
                  >
                    <h2 className="text-start">{product.category_name}</h2>
                  </div>
                  <div>
                    <div className="cartFavBtn">
                      <AddFavButton
                        buttonType="icon"
                        className="btn btn-outline-info me-1 rounded-box-circle rounded-box-sm"
                        product={product}
                        roundRemove={true}
                      />
                    </div>
                  </div>
                </Stack>
                <h3
                  className="product-name h3"
                  onClick={() => navigate(`/products/${product.product_url}`)}
                >
                  {product.product_name}
                </h3>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="bgCard border-0">
          <div className="d-flex justify-content-between clk-optn-mobile align-items-center">
            <div className="d-flex justify-content-center clk-optn">
              <h4 className="h4">
                {product.discount_percentage !== 0 && (
                  <span className="old-price">
                    ₹{product.strike_price?.replace(".00", "")}
                  </span>
                )}
                <span className="new-price">
                  ₹{product?.price?.replace(".00", "")}
                </span>
                {product.discount_percentage !== 0 && (
                  <div className="text-info fs-6">
                    You Save (₹ {product.save_price}){" "}
                  </div>
                )}
              </h4>
            </div>
            <div className="cartbtnCtr">
              <AddCartButton
                type="button"
                className="btn btn-primary"
                product={product}
                varCheck={product?.default_value}
              />
            </div>
          </div>
        </Card.Footer>
      </Card>
      // <div className={`${className} product-card-sm shadow`} style={{ height: "100%" }}>
      //   <div className="product-card-sm shadow"
      //     onClick={() => navigate(`/products/${product.product_url}`)}>
      //     <Image src={product.image} alt={product.product_name} className="product-card-image-sm" />
      //     <div className="product-info" >
      //       <h3 className='product-name'>{product.product_name}</h3>
      //       <hr className='my-1' />
      //       {product.discount_percentage !== 0 &&
      //         <div className="small">You Save (₹ {product.save_price}) </div>
      //       }
      //       <div className="product-prices">
      //         <span className="new-price">₹{product?.price?.replace('.00', '')}</span>
      //         {product.strike_price !== "0.00" &&
      //           <span className='old-price'>₹{product?.strike_price?.replace('.00', '')}</span>
      //         }
      //       </div>
      //       {product?.common_review?.rating ? <Rating name="read-only" value={product?.common_review?.rating} readOnly size="small" /> : ''}
      //       <div className="d-flex justify-content-between mt-3">
      //         <div className="d-flex justify-content-center clk-optn">
      //           <AddFavButton buttonType="icon" className="btn btn-outline-info me-1 rounded-box-circle rounded-box-sm" product={product} />
      //         </div>
      //         <div>
      //           <AddCartButton type='button' className="btn btn-primary" product={product} />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
}

export default CardComponent;
