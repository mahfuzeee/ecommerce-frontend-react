import Slider from "react-slick";
import { useBrand } from "../hooks/useBrand";

const BrandSectionOne = () => {
  const { data, isLoading } = useBrand({ page: 1, limit: 10 });

  const { brands = [] } = data || {};

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="brand">
      <div className="container container">
        <div className="brand-slider">
          <Slider {...settings}>
            {!isLoading &&
              brands.map((brand, index) => (
                <div
                  key={index}
                  className="brand-item inner d-grid gap-2 text-center align-items-center justify-content-center"
                >
                  <img src={brand.logo} alt="brand" />
                  <p>{brand.name}</p>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BrandSectionOne;
