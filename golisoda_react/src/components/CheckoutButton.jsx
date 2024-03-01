import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setLayoutStatus } from 'redux/features/authLayoutSlice'
import { checkoutApi } from 'services/product.service'
import { AuthUser, Loader } from 'utils'
import useRazorpay from "react-razorpay";
import axios from 'axios'

function CheckoutButton({ className, shippingMethod, cartProduct, checkoutData }) {
    const authUser = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const Razorpay = useRazorpay();
    const [checkoutFormloading, setCheckoutFormLoading] = useState(false);
    const billing_address = JSON.parse(localStorage.getItem('billing_address'))
    const shipping_address = JSON.parse(localStorage.getItem('shipping_address'))
    const shipping_charge_id = localStorage.getItem('shipping_charge_id')
    const store_address = JSON.parse(localStorage.getItem('store_address'));
    const [loader, setLoader] = useState(false)
    const validateProcess = (data) => {
        if (data.shipping_method.type === null) {
            toast.error('Select Shipping Method!')
            return false
        }
        if (data.shipping_method.type === "STANDARD_SHIPPING" && data.shipping_method.charge_id === null) {
            toast.error('Select Shipping Charge type!')
            return false
        }
        if (data.shipping_method.type === "STANDARD_SHIPPING" && shipping_address === null) {
            toast.error('Shippping address is required!')
            return false
        }
        if (data.billing_address_id === undefined) {
            toast.error('Billing address is required!')
            return false
        }
        if (data.shipping_method.type === "PICKUP_FROM_STORE" && store_address === null) {
            toast.error('Store address is required!')
            return false
        }

        return true;
    }
    const checkoutHandler = () => {
        const checkData = {
            customer_id: AuthUser()?.id,
            billing_address_id: billing_address?.customer_address_id,
            shipping_method: {
                type: shippingMethod.toUpperCase(),
                address_id: shippingMethod.toUpperCase() === "PICKUP_FROM_STORE" ? store_address?.id : shipping_address?.customer_address_id,
                charge_id: shippingMethod.toUpperCase() === "PICKUP_FROM_STORE" ? null : shipping_charge_id
            },
            cart_items: cartProduct,
            cart_total: checkoutData
        }
        if (validateProcess(checkData)) {
            setLoader(true)
            checkoutApi(checkData).then(response => {
                if (response.error === 1) {
                    toast.error(response.message);
                    setLoader(false);
                } else if (response.data?.status === false) {
                    toast.error(response.data?.message);
                    setLoader(false);
                }
                else {
                    // console.log("response.data", response.data);
                    verifyPayment(response.data);
                }
                // if (response.data.error === 0) {
                //     window.location.href = response.data.redirect_url
                // } else {
                //     toast.error(response?.data?.message)
                // }
                setLoader(false)
            })
        }
    }

    const verifyPayment = async (params) => {
        const options = {
            key: params.key,
            amount: params.amount,
            currency: params.currency,
            name: params.name,
            description: params.description,
            image: params.image,
            order_id: params.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                verifySignature(response, "success");
            },
            prefill: {
                name: params.prefill.name,
                email: params.prefill.email,
                contact: params.prefill.contact,
            },
            notes: {
                address: params.notes.address,
            },
            theme: {
                color: params.theme.color,
            },
            modal: {
                ondismiss: function () {
                    // setPaymentLoader(false);
                    setCheckoutFormLoading(false);
                },
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            window.location.href = '/payment-faild'
            verifySignature(response, "fail");
        });

        rzp1.open();
    };

    const verifySignature = (data, type) => {
        // const customer = JSON.parse(window.localStorage.getItem("customer"));
        // console.log("inner 1", data);
        // console.log("type", type);
        setCheckoutFormLoading(true);
        axios({
            url: process.env.REACT_APP_BASE_URL + "/verify/payment/signature",
            method: "POST",
            data: { razor_response: data, customer_id: AuthUser()?.id, status: type },
        }).then((response) => {
            // setPaymentLoader(false);
            if (response.data.success) {
                localStorage.removeItem("shipping_address");
                localStorage.removeItem("billing_address");
                localStorage.removeItem("cart_list");
                localStorage.removeItem("shiprocket_charges");
                localStorage.removeItem("cart_coupon");
                localStorage.removeItem("flat_charge");
                setCheckoutFormLoading(false);
                // dispatch(setCartCount(0));
                // dispatch(clearCart());
                // toast.success(response.data.message);
                // navigate("/payment-success");
                window.location.href = '/payment-success'
            } else if (response.data.success === false) {
                setCheckoutFormLoading(false);
                // toast.error(response.data.message);
                window.location.href = '/payment-faild'
                // navigate('/payment-faild');
            }
        });
    };



    return (
        <div>
            {checkoutFormloading ?
                <div style={{ position: "absolute", top: 0, left: "50%" }}>
                    <Loader />
                </div> : null
            }
            <button loading={`${loader}`} disabled={loader} className={className}
                onClick={() => authUser.isLoggedIn ? checkoutHandler() : dispatch(setLayoutStatus({ status: true, type: 'login' }))}>
                Proceed to Checkout
            </button>
        </div>
    )
}

export default CheckoutButton