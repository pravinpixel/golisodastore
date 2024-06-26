import { useEffect, useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ProgressBar } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = () => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: <p>Hello World</p>,
    didOpen: () => {
      MySwal.showLoading();
    },
  }).then(() => {
    return MySwal.fire(<p>Shorthand works too</p>);
  });
};

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const scrollToTop = () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
};

const Text = (text) => {
  const str = text.replaceAll("_", " ");
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

const LoadingSpinner = (props) => {
  return (
    <Spinner size="sm" animation="border" role="status" {...props}>
      <span className="visually-hidden"> Loading...</span>
    </Spinner>
  );
};
const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperclassName="progress-bar-wrapper"
        borderColor="#8d8d8d"
        barColor="#ec3357"
      />
    </div>
  );
};

const HalfHeightLoader = () => {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperclassName="progress-bar-wrapper"
        borderColor="#8d8d8d"
        barColor="#ec3357"
      />
    </div>
  );
};

const Image = (props) => {
  return <LazyLoadImage placeholderSrc={require('./../assets/Brand/card-placeholder.gif')} effect="blur" {...props} />;
};

const AppScroller = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return children || null;
};
const setAuthUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};
const AuthUser = () => {
  var user = localStorage.getItem("user");
  if (user !== undefined && user !== null && user !== "") {
    return JSON.parse(user);
  }
  return false;
};
function checkCartBucket(product_id) {
  let currentCart = localStorage.getItem("cart_list") ? JSON.parse(localStorage.getItem("cart_list")) : [];
  if (currentCart !== null) {
    function isExists(CurrentTest) {
      return CurrentTest.id === product_id;
    }
    var Result = currentCart === 0 ? [] : currentCart?.find(isExists);
    if (Result !== undefined) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function strRandom(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const now = new Date();
  const randomString = `${result}_${now.toString().replaceAll(' ', '_')}_${result}`
  return randomString.toUpperCase()
}
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
const CheckBoxInput = ({
  value,
  name,
  filterHandler,
  setClearFilter,
  id,
  filterData,
}) => {
  // let checked = filterData && filterData.includes(value);
  const handler = (element) => {
    var array = [];
    var checkboxes = document.querySelectorAll(
      `.${element.name}_checkbox:checked`
    );
    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value);
    }
    filterHandler(element.name, array);
    setClearFilter(checkboxes.length > 0 ? true : false);
  };
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      className={`${name}_checkbox`}
      value={value}
      onChange={(e) => handler(e.target)}
    // checked={checked}
    />
  );
};
const SetAllCheckBoxes = (location) => {
  var searchQuery = location.search.replace("?", "").replaceAll("=", "_");
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (var index = 0; index < checkboxes.length; index++) {
    // eslint-disable-next-line no-loop-func
    searchQuery.split("&").forEach((item) => {
      item.split("_").forEach((row) => {
        if (checkboxes[index].value == row) {
          checkboxes[index].checked = true;
        }
      });
    });
  }
};
const ContactResponse = () => {
  return withReactContent(Swal).fire({
    title: "Thanks for reaching us",
    html: <p className="m-0">Our team will get back to you shortly.</p>,
    confirmButtonText: "Okay",
    confirmButtonColor: "#ec3357",
    allowOutsideClick: false,
  });
};
const toPriceString = text => {
  try {
    if (text.includes('&')) {
      return text.split('&')[0]++
    }
    return text
  } catch (error) {
    return text
  }
}

const initFacebookPixel = () => {
  if (window.fbq) {
    window.fbq('init', 448794529332682); // Initialize Pixel with your ID
    window.fbq('track', 'PageView'); // Track initial pageview
  }
};

const trackEvent = async (event, params = {}) => {
  if (window.fbq) {
    window.fbq('track', event, params);
  }
};

export {
  ContactResponse,
  SetAllCheckBoxes,
  CheckBoxInput,
  useQuery,
  AppScroller,
  openInNewTab,
  getCurrentYear,
  scrollToTop,
  Loader,
  LoadingSpinner,
  Image,
  Alert,
  AuthUser,
  setAuthUser,
  checkCartBucket,
  strRandom,
  HalfHeightLoader,
  Text,
  toPriceString,
  initFacebookPixel,
  trackEvent
};
