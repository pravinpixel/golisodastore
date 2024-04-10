/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CheckoutButton from "components/CheckoutButton";
import { useSelector } from "react-redux";
import {
  checkoutCheckApi,
  checkoutCodApi,
  setShippingChargesApi,
  shippingChargesApi,
} from "services/product.service";
import AddressBookDetails from "components/MyAccount/MyAddressBook/AddressBookDetails";
import { Modal } from "react-bootstrap";
import PickupFromStoreAddress from "components/PickupFromStoreAddress/PickupFromStoreAddress";
import { toast } from "react-hot-toast";
// import { Tab } from "@mui/material";
import { TabContext, TabPanel } from "@material-ui/lab";
import { AuthUser } from "utils";
const CartDetails = ({ checkoutData, setCheckoutData, coupon, cartProduct, cartData, fetchCartData }) => {

  // const pickupSelector = useSelector((state) => state.footerCollection.siteInfo?.is_pickup_from_store);

  const authUser = useSelector((state) => state.auth);
  const address = useSelector((state) => state.cartAddress);
  localStorage.setItem("shipping_charge_id", 2);

  // const [shippingMethod, setShippingMethod] = useState(pickupSelector !== 1 ?
  //   "Standard_Shipping" : "Pickup_From_Store");
  const [shippingMethod, setShippingMethod] = useState("Standard_Shipping")
  const shipping_charge_id = localStorage.getItem('shipping_charge_id')
  const [addressModalType, setAddressModalType] = useState(null);
  const [shippingTypes, setshippingTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [codInputCheck, setCODInputCheck] = useState(false);

  const [codLoading, setCODLoading] = useState(false);

  const billing_address = JSON.parse(localStorage.getItem('billing_address'))
  const shipping_address = JSON.parse(localStorage.getItem('shipping_address'))
  const store_address = JSON.parse(localStorage.getItem('store_address'));

  useEffect(() => {
    if (shippingMethod === "Standard_Shipping" && checkoutData) {
      shippingChargesApi(
        checkoutData.product_tax_exclusive_total_without_format
      ).then((response) => {
        setshippingTypes(response.data);
      });
    }
  }, [checkoutData, shippingMethod]);

  // const shippingMethodHandler = (e, value) => {
  //   setShippingMethod(value);
  //   localStorage.setItem("shipping_method", value?.toUpperCase());
  // };

  const setShippingCharges = async (id) => {
    localStorage.setItem("shipping_charge_id", id);
    const response = await setShippingChargesApi(id);
    setCheckoutData(response.data.data.cart_total);
    localStorage.setItem(
      "checkout_data",
      JSON.stringify(response.data.data.cart_total)
    );
    toast.success(response.data.message)
  };

  const cashOnDeliveryCheck = (e) => {
    setCODInputCheck(e.target.checked)
    const params = {
      customer_id: AuthUser()?.id,
      guest_token: localStorage.getItem("guest_token"),
      is_cod: codInputCheck ? 0 : 1,
      cod_amount: cartData?.cod_amount
    }
    checkoutCheckApi(params).then(response => {
      fetchCartData()
    })
  }

  const validateProcess = (data) => {
    if (data.shipping_method.type === null) {
      toast.error('Select Shipping Method!')
      setCODLoading(false);
      return false
    }
    if (data.shipping_method.type === "STANDARD_SHIPPING" && data.shipping_method.charge_id === null) {
      toast.error('Select Shipping Charge type!')
      setCODLoading(false);
      return false
    }
    if (data.shipping_method.type === "STANDARD_SHIPPING" && shipping_address === null) {
      toast.error('Shippping address is required!')
      setCODLoading(false);
      return false
    }
    if (data.billing_address_id === undefined) {
      toast.error('Billing address is required!')
      setCODLoading(false);
      return false
    }
    if (data.shipping_method.type === "PICKUP_FROM_STORE" && store_address === null) {
      toast.error('Store address is required!')
      setCODLoading(false);
      return false
    }

    return true;
  }

  const codSubmit = () => {
    setCODLoading(true)
    const checkData = {
      customer_id: AuthUser()?.id,
      billing_address_id: billing_address?.customer_address_id,
      shipping_method: {
        type: shippingMethod.toUpperCase(),
        address_id: shippingMethod.toUpperCase() === "PICKUP_FROM_STORE" ? store_address?.id : shipping_address?.customer_address_id,
        charge_id: shippingMethod.toUpperCase() === "PICKUP_FROM_STORE" ? null : shipping_charge_id
      },
      cart_items: cartProduct,
      cart_total: checkoutData,
      status: "cod",
      ...coupon
    }
    if (validateProcess(checkData)) {
      checkoutCodApi(checkData).then(response => {
        if (response?.data?.error === 1) {
          toast.error(response.data?.message);
          setCODLoading(false);
        } else if (response?.data?.error === "1") {
          toast.error(response.data?.message);
          setCODLoading(false);
        } else if (response.data?.status === false) {
          toast.error(response.data?.message);
          setCODLoading(false);
        }
        else {
          setCODLoading(false)
          localStorage.removeItem("shipping_address");
          localStorage.removeItem("billing_address");
          localStorage.removeItem("cart_list");
          localStorage.removeItem("shiprocket_charges");
          localStorage.removeItem("cart_coupon");
          localStorage.removeItem("flat_charge");
          window.location.href = '/order-success'
        }

      })
    }
  }

  if (checkoutData)
    return (
      <>
        {authUser.isLoggedIn ?
          <TabContext value={shippingMethod} >
            <div className="mb-2"><b className="fw-500 text-primary">Select Shipping Method</b></div>
            <div className=" mb-3">
              <div className="card-header p-0">
                {/* <TabList onChange={shippingMethodHandler} className="bg-white rounded border">
                  <Tab label="Standard" value="Standard_Shipping" />
                  {pickupSelector === 1 ?
                    <Tab
                      label="Pickup From Store" value="Pickup_From_Store" />
                    : <Tab
                      label="" value="" />
                  }
                </TabList> */}
              </div>
              <div >
                <TabPanel value="Standard_Shipping" className="px-0 py-2">
                  <ul className="list-group mb-3">
                    {
                      shippingTypes.length > 0 ?
                        shippingTypes.map((type, index) => (
                          <label htmlFor={type.shipping_title} key={index} onChange={() => setShippingCharges(type.id)}
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                          >
                            <span>
                              <input
                                type="radio"
                                name="shipping_type"
                                id={type.shipping_title}
                                className="me-2 form-check-input"
                                checked={type.id === 2}
                              // checked={shipping_charge_id == type.id}
                              />
                              {type.shipping_title}</span>
                            <div>
                              <b>
                                {type.charges === "0.00" ? (
                                  <span className="text-success">FREE</span>
                                ) : (
                                  type.charges
                                )}
                              </b>
                            </div>
                          </label>
                        ))
                        : "Fetching..."
                    }
                  </ul>


                  <div className="border rounded bg-white py-1 p-3">
                    <p className="m-0 text-info d-flex align-items-center justify-content-between">
                      <span><i className="fa fa-map-marker"></i> Shipping Address</span>
                      <button
                        className="fs-14 btn btn-sm text-blue"
                        onClick={() => {
                          setAddressModalType("SHIPPING_ADDRESS");
                          setShow(!show);
                        }}
                      >
                        {address.shipping_address == null ? <>  <i className="fa fa-map-signs me-1"></i> Select </> : <><i className="fa fa-edit me-1"></i>Change</>}
                      </button>
                    </p>
                    {address.shipping_address ? (
                      <div className="text-dark">
                        <b className="text-secondary fw-400">{address.shipping_address?.name}</b> <br />
                        <p className="address-details">
                          {address.shipping_address?.address_line1} ,
                          {address.shipping_address?.city} -
                          {address.shipping_address?.post_code_number},
                          {address.shipping_address?.state},
                          {address.shipping_address?.country}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </TabPanel>
                {
                  checkoutData?.has_pickup_store === true ?
                    <TabPanel value="Pickup_From_Store" className="px-0 py-2">
                      <PickupFromStoreAddress brandId={checkoutData?.brand_id} />
                    </TabPanel>
                    : null
                }
                {authUser.isLoggedIn ? (
                  <div className="border rounded bg-white py-1 p-3">
                    <p className="m-0 text-info d-flex align-items-center justify-content-between">
                      <span><i className="fa fa-map-marker"></i> Billing Address</span>
                      <button
                        className="fs-14 btn btn-sm text-blue"
                        onClick={() => {
                          setAddressModalType("BILLING_ADDRESS");
                          setShow(!show);
                        }}
                      >
                        {address.billing_address == null ? <>  <i className="fa fa-map-signs me-1"></i> Select </> : <><i className="fa fa-edit me-1"></i>Change</>}
                      </button>
                    </p>
                    {address.billing_address !== null ? (
                      <div className="text-dark">
                        <b className="text-secondary fw-400">{address.billing_address?.name}</b> <br />
                        <p className="address-details">
                          {address.billing_address?.address_line1} ,
                          {address.billing_address?.city} -
                          {address.billing_address?.post_code_number},
                          {address.billing_address?.state},
                          {address.billing_address?.country}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </TabContext>
          : null
        }
        {cartData?.is_cod === 1 &&
          <ul className="list-group mb-3">
            <label htmlFor={"cashon_delivery"}
              onChange={(e) =>
                cashOnDeliveryCheck(e)
              }
              className="list-group-item list-group-item-action d-flex justify-content-between"
            >
              <span>
                <input
                  type="checkbox"
                  name="shipping_type"
                  id="cashon_delivery"
                  className="me-2 form-check-input"
                  checked={codInputCheck}
                />Cash on delivery</span>
              <div>
                <b><span>{cartData?.cod_amount}</span></b>
              </div>
            </label>
          </ul>
        }

        <div className="mb-2"><b className="fw-500 text-primary">Cart details</b></div>
        <div>
          <ul className="list-group">
            <li className="list-group-item d-flex align-items-center justify-content-between">
              <span>Sub Total</span>
              <div>₹ {checkoutData.product_tax_exclusive_total}</div>
            </li>
            <li className="list-group-item d-flex align-items-center justify-content-between">
              <span>Taxes</span>
              <div>₹ {checkoutData.tax_total}</div>
            </li>
            {codInputCheck ?
              <li className="list-group-item d-flex align-items-center justify-content-between">
                <span>COD</span>
                <div>₹ {checkoutData.cod_amount}</div>
              </li> : null
            }
            {coupon ?
              <li className="list-group-item d-flex align-items-center justify-content-between">
                <span>Coupon <b>{coupon.coupon_info.coupon_type?.discount_type === "percentage" ?
                  `(${Number(coupon.coupon_info.coupon_type?.discount_value)}%)` : null}</b></span>
                <div className="text-success">- ₹ {coupon.coupon_amount}</div>
              </li>
              : null}
            <li className="text-primary list-group-item d-flex align-items-center justify-content-between">
              <span className="lead">Grand Total</span>
              <span className="lead fw-bold">₹ {checkoutData.total}</span>
            </li>
          </ul>
          {codInputCheck ?
            <div>
              <button className="btn btn-dark w-100 mt-3"
                onClick={() => codLoading ? null : codSubmit()}
                loading={`${codLoading}`} disabled={codLoading}
              >
                Cash On Delivery
              </button>
            </div>
            :
            <div>
              <CheckoutButton
                className="btn btn-dark w-100 mt-3"
                shippingMethod={shippingMethod}
                cartProduct={cartProduct}
                checkoutData={checkoutData}
                coupon={coupon}
              />
            </div>
          }
        </div>
        {addressModalType !== null && (
          <Modal
            show={show}
            size="lg"
            onHide={() => setShow(!show)}
            backdrop="static"
            keyboard={false}
            scrollable={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {addressModalType === "SHIPPING_ADDRESS"
                  ? "Shipping address"
                  : "Billing address"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddressBookDetails
                selectType="checkbox"
                modalType={addressModalType}
                setShow={setShow}
              />
            </Modal.Body>
          </Modal>
        )}
      </>
    );
};

export default CartDetails;
