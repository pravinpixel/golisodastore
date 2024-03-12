import { FilterLink } from "helpers";
import "./styles.css";
import { useSelector } from "react-redux";
import { Image } from "utils";
import Slider from "react-slick";

const CategoriesPoster = (slidesToShow) => {
  // const subcategoryCollections = useSelector(
  //   (state) => state.homePageCollection.subcategoryCollections
  // );

  const subcategoryCollections = useSelector(
    (state) => state.footerCollection.siteInfo.home_page
  );

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow === undefined ? (subcategoryCollections?.length > 3 ? 4 : 3) : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (subcategoryCollections)
    return (
      <div className="section-wrapper bg-light">
        <div className="container">
          <h2 className="section-title">Products Available In-store</h2>
          <div className="row g-3 arrival-slider">

            <Slider {...settings}>
              {subcategoryCollections?.map(
                (item, index) =>
                  <div
                    key={index}
                    className="col-lg-3 col-md-3 col-sm-6 col-xs-12 col-6"
                  >
                    <FilterLink to={`/products?categories=${item.slug}`}>
                      <Image
                        src={item.image}
                        alt={item.slug}
                        className="img-fluid"
                      />
                      <div className="btm-liner">
                        <h3 className="fs-20">{item.name}</h3>
                      </div>
                    </FilterLink>
                  </div>
                // index < 4 && (
                //   <div
                //     key={item.id}
                //     className="col-lg-3 col-md-3 col-sm-6 col-xs-12 col-6"
                //   >
                //     <FilterLink to={`/products?categories=${item.slug}`}>
                //       <Image
                //         src={item.image}
                //         alt={item.slug}
                //         className="img-fluid"
                //       />
                //       <div className="btm-liner">
                //         <h3 className="fs-20">{item.name}</h3>
                //       </div>
                //     </FilterLink>
                //   </div>
                // )
              )}
            </Slider>

          </div>
        </div>
      </div>
    );
};

export default CategoriesPoster;
