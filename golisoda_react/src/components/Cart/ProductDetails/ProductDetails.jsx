/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from "react-redux";
import {BsDash, BsPlus, BsX} from "react-icons/bs";
import {clearCart, removeCart, setCartList} from "redux/features/cartSlice";
import {FaTrash} from "react-icons/fa";
import {useEffect, useState} from "react";
import {
  clearCartList,
  removeFromCartApi,
  updateCartApi,
} from "services/product.service";
import {toast} from "react-hot-toast";
import {AuthUser} from "utils";
import {useForm} from "react-hook-form";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import {useNavigate} from "react-router-dom";
import {Alert, Stack} from "react-bootstrap";
import {setLayoutStatus} from "redux/features/authLayoutSlice";

const ProductDetails = ({
  cartProduct,
  setCheckoutData,
  setCoupon,
  fetchCartData,
  cartData,
  shirocketApiCall,
}) => {
  // console.log('cartData', cartData?.cart_total);
  // console.log('setCheckoutData', setCheckoutData);
  // console.log('setCoupon', setCoupon);
  // console.log('fetchCartData', fetchCartData);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      coupon_code: cartData?.cart_total?.coupon_code,
    },
  });
  const [loading, setLoading] = useState(false);
  const [couponApplyed, setCouponApplyed] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);

  const CouponHandler = (data) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/apply/coupon`, {
        ...data,
        coupon_code:
          cartData?.cart_total?.is_coupon === 1
            ? cartData?.cart_total?.coupon_code
            : data?.coupon_code,
        customer_id: AuthUser()?.id,
        shipping_fee_id: localStorage.getItem("shipping_charge_id"),
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status === "error") {
          toast.error(response.data.message);
          setValue("coupon_code", "");
        } else {
          data !== true && toast.success(response.data.message);
          setCouponApplyed(true);
          localStorage.setItem("coupon_amount", response.data.coupon_amount);
          localStorage.setItem("coupon_data", JSON.stringify(response.data));
          setCheckoutData(response.data.cart_info.cart_total);
          setCoupon(response.data);
          localStorage.setItem(
            "checkout_data",
            JSON.stringify(response.data.cart_info.cart_total)
          );
        }
      });
  };

  const removeAddons = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/delete/addon`, data)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          fetchCartData();
        }
      });
  };

  const removeCouponCode = async (toastRemove) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/remove/coupon`, {
        customer_id: AuthUser()?.id,
        shipping_fee_id: localStorage.getItem("shipping_charge_id"),
      })
      .then((response) => {
        setLoading(false);
        setValue("coupon_code", "");
        if (response.data.status === "error") {
          !toastRemove && toast.error(response.data.message);
          setValue("coupon_code", "");
          fetchCartData();
        } else {
          !toastRemove && toast.success(response.data.message);
          reset();
          setValue("coupon_code", "");
          setCouponApplyed(false);
          setCoupon(null);
          fetchCartData();
          localStorage.removeItem("coupon_amount");
          localStorage.removeItem("coupon_data");
          setCheckoutData(response.data.cart_info.cart_total);
          localStorage.setItem(
            "checkout_data",
            JSON.stringify(response.data.cart_info.cart_total)
          );
        }
      });
  };

  const clearCartData = () => {
    clearCartList().then((response) => {
      if (response.data.error === 0) {
        toast.success(response.data.message);
        localStorage.removeItem("cart_list");
        fetchCartData();
        setDeleteAlert(false);
        dispatch(clearCart());
      }
    });
  };

  useEffect(() => {
    cartData?.cart_total?.is_coupon === 1 && CouponHandler(true);
  }, []);

  // useEffect(() => {
  //   var coupon_data = JSON.parse(localStorage.getItem('coupon_data'))
  //   if (coupon_data !== null) {
  //     setValue('coupon_code', coupon_data.coupon_code)
  //     setCouponApplyed(true)
  //   }
  // }, [])
  return (
    <>
      <div className="my-3">
        <b className="fw-500 text-primary">Shopping Cart</b>
      </div>
      <ul
        className="list-group mb-3"
        style={{maxHeight: "460px", overflow: "auto"}}
      >
        {cartProduct?.length
          ? cartProduct.map((product, i) => (
              <li
                key={i}
                className="d-md-flex gap-3 align-items-center justify-content-between list-group-item"
              >
                <div className="d-md-flex col-lg-8 ">
                  <span
                    className="cursor"
                    onClick={() => navigate(`/products/${product.product_url}`)}
                  >
                    <img
                      src={product.image}
                      alt="product-thumnail"
                      className="product-thumnail "
                    />
                    {product.discount_percentage !== 0 && (
                      <div className="off-prc-1">
                        <h6>
                          {" "}
                          {product.discount_percentage}% <br /> <span>OFF</span>
                        </h6>
                      </div>
                    )}
                  </span>
                  <div className="ps-md-3">
                    <span
                      className="fs-14 cursor"
                      onClick={() =>
                        navigate(`/products/${product.product_url}`)
                      }
                    >
                      {product.product_name}
                    </span>
                    <h4 className="h5  mt-2 mb-2 mb-md-0">
                      <span className="new-price text-info fw-bold">
                        ₹{product?.price?.replace(".00", "")}
                        {/* {`₹${product?.price}.00`} */}
                      </span>
                      {product.discount_percentage !== 0 && (
                        <i className="old-price ps-2">
                          ₹{product.strike_price.replace(".00", "")}
                        </i>
                      )}
                      {product.discount_percentage !== 0 && (
                        <span className="text-info fs-6">
                          You Save (₹ {product.save_price}){" "}
                        </span>
                      )}
                    </h4>

                    {Object.entries(product?.chosen_variation).map(
                      (filters, key) => (
                        <span className="pe-3" key={key}>
                          <span className="pe-1 fw-bold">{filters[0]}:</span>
                          <span>{filters[1]}</span>
                        </span>
                      )
                    )}

                    {/* <div className="text-info fw-bold mt-2 mb-2 mb-md-0">
                    ₹{product.price}
                  </div> */}
                    {product.addons.length > 0 ? (
                      <ul className="border-top mt-3">
                        {product.addons.map((item, i) => (
                          <li
                            key={i}
                            className="mt-2 d-flex align-items-center"
                          >
                            <div>
                              <img
                                src={item.icon}
                                alt={item?.title}
                                width={35}
                              />
                            </div>
                            <div className="ms-2">
                              <span className="text-info">{item?.title}</span>
                              <div className="d-flex">
                                {item?.addon_item_label}
                                <span className="fw-bold ms-1">
                                  ₹{item?.amount}
                                </span>
                                <span
                                  onClick={() =>
                                    removeAddons({
                                      addon_id: item.addon_item_id,
                                      cart_id: product.cart_id,
                                      product_id: product.id,
                                    })
                                  }
                                  className="btn btn-sm text-primary py-0 ms-2"
                                >
                                  <BsX /> remove
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="d-flex d-md-inline-block justify-content-between">
                  <ProductQuantityInput
                    product={product}
                    fetchCartData={fetchCartData}
                    setCheckoutData={setCheckoutData}
                  />
                  <ProductDeleteButton
                    product={product}
                    fetchCartData={fetchCartData}
                    setCheckoutData={setCheckoutData}
                    shirocketApiCall={shirocketApiCall}
                    removeCouponCode={() => removeCouponCode(true)}
                  />
                </div>
              </li>
            ))
          : ""}
      </ul>
      {authUser.isLoggedIn ? (
        <div className="bg-white  border rounded mb-3">
          <div className="row m-0 align-items-center">
            <div className="col-md border-bottom">
              <form
                className="d-inline-flex align-items-center my-3"
                onSubmit={handleSubmit(CouponHandler)}
              >
                <b className="col-lg-4">Have a Coupon?</b>
                <input
                  disabled={couponApplyed || cartData?.cart_total?.is_coupon}
                  type="text"
                  placeholder="Enter Coupon code here"
                  id="coupon"
                  name="coupon"
                  maxLength="12"
                  // defaultValue={couponApplyed || cartData?.cart_total?.is_coupon ? couponCode : ""}
                  className={`form-control ms-2 w-lg-50 ${
                    errors.coupon_code ? "border-danger" : ""
                  }`}
                  {...register("coupon_code", {required: true})}
                />
                <div>
                  {couponApplyed || cartData?.cart_total?.is_coupon ? (
                    <button
                      loading={`${loading}`}
                      type="button"
                      onClick={() => removeCouponCode(false)}
                      className="btn-link btn text-info"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      loading={`${loading}`}
                      type="submit"
                      className="btn-link btn text-info"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="col-md-1 col-lg-2 text-end py-2 ">
              <button
                className="btn-light btn-sm btn border"
                onClick={() => setDeleteAlert(true)}
              >
                <span className="pe-2">Clear cart</span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1152_3000)">
                    <path
                      d="M0.916626 3.66699V9.16699H6.41663"
                      stroke="#A5A5A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.0834 18.333V12.833H15.5834"
                      stroke="#A5A5A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.7825 8.24978C18.3176 6.936 17.5274 5.7614 16.4858 4.83558C15.4441 3.90977 14.1849 3.2629 12.8257 2.95535C11.4664 2.64781 10.0514 2.6896 8.7127 3.07683C7.37397 3.46406 6.15514 4.18411 5.16996 5.16978L0.916626 9.16645M21.0833 12.8331L16.83 16.8298C15.8448 17.8155 14.6259 18.5355 13.2872 18.9227C11.9485 19.31 10.5335 19.3518 9.17422 19.0442C7.81497 18.7367 6.55578 18.0898 5.51414 17.164C4.4725 16.2382 3.68236 15.0636 3.21746 13.7498"
                      stroke="#A5A5A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1152_3000">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Alert variant="warning" className="m-0 border border-warning py-0">
          <div className="hstack gap-2 justify-content-between">
            <div>
              Please{" "}
              <u>
                <Alert.Link
                  className="text-primary"
                  onClick={() =>
                    dispatch(setLayoutStatus({status: true, type: "login"}))
                  }
                >
                  log in
                </Alert.Link>
              </u>{" "}
              to your account in order to continue to the checkout.
            </div>
            <div className="text-end py-2 ">
              <button
                className="btn-light btn-sm btn border"
                onClick={() => setDeleteAlert(true)}
              >
                <span className="pe-2">Clear cart</span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1152_3000)">
                    <path
                      d="M0.916626 3.66699V9.16699H6.41663"
                      stroke="#A5A5A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.0834 18.333V12.833H15.5834"
                      stroke="#A5A5A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.7825 8.24978C18.3176 6.936 17.5274 5.7614 16.4858 4.83558C15.4441 3.90977 14.1849 3.2629 12.8257 2.95535C11.4664 2.64781 10.0514 2.6896 8.7127 3.07683C7.37397 3.46406 6.15514 4.18411 5.16996 5.16978L0.916626 9.16645M21.0833 12.8331L16.83 16.8298C15.8448 17.8155 14.6259 18.5355 13.2872 18.9227C11.9485 19.31 10.5335 19.3518 9.17422 19.0442C7.81497 18.7367 6.55578 18.0898 5.51414 17.164C4.4725 16.2382 3.68236 15.0636 3.21746 13.7498"
                      stroke="#A5A5A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1152_3000">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </Alert>
      )}
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, clear it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={clearCartData}
        onCancel={() => setDeleteAlert(false)}
        focusCancelBtn
        show={deleteAlert}
      >
        You will not be able to recover this cart data!
      </SweetAlert>
    </>
  );
};
const ProductDeleteButton = ({
  product,
  fetchCartData,
  setCheckoutData,
  removeCouponCode,
  shirocketApiCall,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const removeCartHandler = (product) => {
    setLoading(true);
    removeFromCartApi({
      cart_id: product?.cart_id,
      product_id: product?.id,
      customer_id: AuthUser()?.id,
      guest_token: localStorage.getItem("guest_token"),
    }).then((response) => {
      if (response.data.error === 0) {
        toast.success(response.data.message);
        setCheckoutData(response.data.data.cart_total);
        dispatch(removeCart(product));
        setTimeout(() => setLoading(false), 200);
        fetchCartData();
        shirocketApiCall();
        removeCouponCode(false);
        console.log("response", response.data.data);
        dispatch(
          setCartList({
            value: response.data.data?.cart_count,
            data: response.data.data?.carts,
          })
        );
      } else {
        toast.error("Network Error");
        setLoading(false);
      }
    });
  };
  return (
    <div className="text-center mt-0 mt-md-3">
      <button
        loading={`${loading}`}
        className="custom-btn border shadow-sm mx-3 rounded-pill btn btn-outline-primary btn-sm border-0"
        onClick={() => removeCartHandler(product)}
      >
        <FaTrash className="trash-btn" size={15} />
      </button>
    </div>
  );
};

const ProductQuantityInput = ({product, setCheckoutData, fetchCartData}) => {
  const [count, setCount] = useState(
    Number(product.quantity) === 0 ? 1 : Number(product.quantity)
  );
  useEffect(() => {
    setCount(Number(product.quantity) === 0 ? 1 : Number(product.quantity));
  }, [product]);

  const [loading, setLoading] = useState(false);
  const updateCart = async (type) => {
    setLoading(true);
    var quantity =
      type === "DECREASE" ? (count > 1 ? count - 1 : 1) : count + 1;
    const {data} = await updateCartApi({
      cart_id: product.cart_id,
      quantity: quantity,
    });
    if (data.error === 0) {
      toast.success(data.message);
      setCount(quantity);
      setCheckoutData(data.data.cart_total);
    }
    setLoading(false);
  };
  return (
    <div className="btn-group ">
      <button
        disabled={count <= 1 ? true : false}
        // disabled={count <= Number(product.quantity) || loading}
        onClick={() => {
          updateCart("DECREASE");
          fetchCartData();
        }}
        className="btn btn-sm btn-light"
      >
        <BsDash />
      </button>
      <button
        style={{zIndex: 1}}
        loading={`${loading}`}
        className="btn btn-sm btn-light fw-bold bg-white border"
      >
        {count}
      </button>
      <button
        // disabled={count >= Number(product.max_quantity) || loading}
        onClick={() => {
          updateCart("INCREASE");
          fetchCartData();
        }}
        className="btn btn-sm btn-light"
      >
        <BsPlus />
      </button>
    </div>
  );
};

export default ProductDetails;
