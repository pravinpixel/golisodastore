import {useState} from "react";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {removeCart, setCart, setCartList} from "redux/features/cartSlice";
import {addToCartApi, removeFromCartApi} from "services/product.service";
import {AuthUser, LoadingSpinner, checkCartBucket, strRandom} from "utils";

function AddCartButton({className, product, type, setCartId, varCheck}) {
  const dispatch = useDispatch();
  const [isAddCart, setIsAddCart] = useState(checkCartBucket(product?.id));
  const [loading, setLoading] = useState(false);

  const addCart = () => {
    setLoading(true);
    addToCartApi({
      product_id: product?.id,
      customer_id: AuthUser()?.id,
      guest_token: localStorage.getItem("guest_token"),
      quantity: 1,
      variation_option_ids: Object.values(varCheck),
    }).then((response) => {
      if (response.data.error === 0) {
        dispatch(
          setCart({
            product,
            count: response?.data?.data?.cart_count,
            carts: response?.data?.data?.carts,
          })
        );
        // dispatch(setCart(product));
        toast.success(response.data.message);
        setIsAddCart(true);
        if (setCartId !== undefined) {
          setCartId(response.data.data.carts[0].cart_id);
        }
      } else {
        toast.error("Network Error");
      }
    });
    setTimeout(() => setLoading(false), 1000);
  };

  const addOrRemoveCart = () => {
    setIsAddCart(!isAddCart);
    setLoading(true);
    if (!isAddCart) {
      addToCartApi({
        product_id: product?.id,
        customer_id: AuthUser()?.id,
        guest_token: localStorage.getItem("guest_token"),
        quantity: 1,
        variation_option_ids: Object.values(varCheck),
      }).then((response) => {
        if (response.data.error === 0) {
          dispatch(
            setCart({
              product,
              count: response?.data?.data?.cart_count,
              carts: response?.data?.data?.carts,
            })
          );
          // dispatch(setCart(product));
          toast.success(response.data.message);
          // setIsAddCart(true);
          if (setCartId !== undefined) {
            setCartId(response.data.data.carts[0].cart_id);
          }
          localStorage.setItem(
            "cart_list",
            JSON.stringify(response.data.data.carts)
          );
        } else {
          toast.error("Network Error");
        }
      });
    } else {
      removeFromCartApi({
        product_id: product?.id,
        customer_id: AuthUser()?.id,
        guest_token: localStorage.getItem("guest_token"),
      }).then((response) => {
        dispatch(
          setCart({
            product,
            count: response?.data?.data?.cart_count,
            carts: response?.data?.data?.carts,
          })
        );
        if (response.data.error === 0) {
          // setIsAddCart(false);
          dispatch(
            setCartList({
              value: response.data?.carts.length,
              data: response.data?.carts,
            })
          );
          toast.success(response.data.message);
          // localStorage.setItem(
          //   "cart_list",
          //   JSON.stringify(response.data?.carts)
          // );
          dispatch(removeCart(product));
        } else {
          toast.error("Network Error");
        }
      });
    }
    // setLoading(true);
    // if (flag) {
    //   removeFromCartApi({
    //     product_id: product.id,
    //     customer_id: AuthUser()?.id,
    //     guest_token: localStorage.getItem("guest_token"),
    //   }).then((response) => {
    //     dispatch(
    //       setCart({
    //         product,
    //         count: response?.data?.data?.cart_count,
    //       })
    //     );
    //     if (response.data.error === 0) {
    //       console.log("remove clicked");
    //       setIsAddCart(false);
    //       dispatch(
    //         setCartList({
    //           value: response.data?.carts.length,
    //           data: response.data?.carts,
    //         })
    //       );
    //       toast.success(response.data.message);
    //       dispatch(removeCart(product));
    //     } else {
    //       toast.error("Network Error");
    //     }
    //   });
    // } else {
    //   addToCartApi({
    //     product_id: product.id,
    //     customer_id: AuthUser()?.id,
    //     guest_token: localStorage.getItem("guest_token"),
    //     quantity: 1,
    //     variation_option_ids: Object.values(varCheck),
    //   }).then((response) => {
    //     if (response.data.error === 0) {
    //       console.log("remove clicked 2");
    //       dispatch(
    //         setCart({
    //           product,
    //           count: response?.data?.data?.cart_count,
    //         })
    //       );
    //       // dispatch(setCart(product));
    //       toast.success(response.data.message);
    //       setIsAddCart(true);
    //       if (setCartId !== undefined) {
    //         setCartId(response.data.data.carts[0].cart_id);
    //       }
    //     } else {
    //       toast.error("Network Error");
    //     }
    //   });
    // }
    setTimeout(() => setLoading(false), 1000);
  };

  if (product.stock_status === "out_of_stock" && type === "button") {
    return (
      <button disabled className="btn btn-outline-primary ms-md-3">
        out of stock
      </button>
    );
  }
  if (product.stock_status === "out_of_stock" && type === "checkbox") {
    return (
      <label className="mt-2 text-dark d-block">
        <input
          type="checkbox"
          disabled
          className="form-check-input me-2 rounded-0 border border-dark"
        />
        out of stock
      </label>
    );
  }

  if (type === "button-add")
    return (
      <button loading={`${loading}`} onClick={addCart} className={className}>
        {"Add to cart"}
      </button>
    );

  if (type === "button")
    return (
      <button
        loading={`${loading}`}
        // onClick={() => setIsAddCart(!isAddCart)}
        onClick={() => addOrRemoveCart()}
        className={
          isAddCart ? "btn btn-outline-primary ms-md-3 mb-md-0 mb-0" : className
        }
      >
        {isAddCart ? "Remove" : "Add to cart"}
      </button>
    );

  if (type === "checkbox") {
    const key = strRandom(5);
    return (
      <label
        className="mt-2 text-primary d-block"
        htmlFor={`Frequently_${key}`}
      >
        {loading ? (
          <LoadingSpinner className="me-2" />
        ) : (
          <input
            type="checkbox"
            checked={isAddCart}
            onChange={addOrRemoveCart}
            id={`Frequently_${key}`}
            className="form-check-input me-2 rounded-0 border border-primary"
          />
        )}
        {isAddCart === true ? "Selected" : "Select"}
      </label>
    );
  }
}

export default AddCartButton;
