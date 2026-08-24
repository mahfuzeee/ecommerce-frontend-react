import { FaRegStar, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import { formatDate, ErrorToast, IsEmpty } from "../helper/helper";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useSearchParams
import { useSingleProduct } from "../hooks/useProduct";
import cartStore from "../store/cart.store";
import { useSingleReview } from "../hooks/useReview";

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("product_id");

  //Product Section
  const { data, isLoading } = useSingleProduct(id);
  const product = data || {};

  console.log(product);

  const discount_percent = Math.round(
    ((product?.price - product?.discountPrice) / product?.price) * 100,
  );

  //Cart Section
  //Product details dataset for cart
  const [productDetails, setProductDetails] = useState({
    size: "",
    color: "",
    quantity: 1,
    activeSize: null,
    activeColor: null,
  });

  //Cart validation rules....
  const validation = [
    { field: id, message: "product id is required!" },
    { field: product.name, message: "Title is required!" },
    { field: productDetails.color, message: "Color is required!" },
    { field: productDetails.quantity, message: "Qty is required!" },
    { field: productDetails.size, message: "Size is required!" },
  ];

  //Cart store functions
  const { cartLoading, addCart, getCart } = cartStore();

  const handleAddToCart = async () => {
    for (const { field, message } of validation) {
      if (IsEmpty(field)) {
        return ErrorToast(message);
      }
    }
    const { size, color, quantity } = productDetails;
    const data = {
      size,
      color,
      quantity,
      product_name: product.name,
      product_id: id,
    };
    const res = await addCart(data);
    if (res === 401) {
      navigate("/login");
    }
    await getCart();
  };

  //Review Section
  const { data: reviewData = [], isLoading: reviewLoading } =
    useSingleReview(id);
  const reviews = reviewData || {};

  const StarRating = ({ star }) => {
    star = parseInt(star);
    const totalStars = 5;
    const filledStars = Array(star).fill(<FaStar />);
    const emptyStars = Array(totalStars - star).fill(<FaRegStar />);

    return (
      <div className="star">
        {filledStars.concat(emptyStars).map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="product-details mt-32 padding-b-120">
      <div className="container container-two">
        <div className="row gy-4">
          {/* Left Column - Product Images and Description */}

          {isLoading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div className="col-lg-6" key={index}>
                  <div className="Skeleton">
                    <Skeleton count={8} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-lg-6">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-product-details"
                  role="tabpanel"
                  aria-labelledby="pills-product-details-tab"
                  tabIndex={0}
                >
                  {/* Product Details Content Start */}
                  <div className="product-details">
                    <div>
                      {/* Main Product Image */}
                      <Swiper
                        style={{
                          "--swiper-navigation-color": "#fff",
                          "--swiper-pagination-color": "#fff",
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        {product?.images?.map((img, index) => (
                          <SwiperSlide key={`main-image-${index}`}>
                            <div
                              key={index}
                              className="main-product-image mb-3"
                            >
                              <img src={img} />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* Thumbnail Images */}
                      <div className="product-thumbnails d-flex gap-2">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper"
                        >
                          {product?.images?.map((img, index) => (
                            <SwiperSlide key={`thumbnail-${index}`}>
                              <div
                                key={index}
                                className="main-product-image mb-3"
                              >
                                <img src={img} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>

                    <h5 className="product-details__desc mt-4">
                      Product Description
                    </h5>
                    <div className="product-details__item">
                      {product.description}
                    </div>
                  </div>
                  {/* Product Details Content End */}
                </div>

                {/* Reviews Tab */}
                <div
                  className="tab-pane fade"
                  id="pills-rating"
                  role="tabpanel"
                  aria-labelledby="pills-rating-tab"
                  tabIndex={0}
                >
                  <div className="product-review-wrapper">
                    {!reviewLoading &&
                      reviews.map((review, index) => (
                        <div
                          className="product-review"
                          key={review?._id || index}
                        >
                          <div className="product-review__top flx-between">
                            <div className="product-review__rating flx-align">
                              <div className="d-flex align-items-center gap-1">
                                <div className="star">
                                  <StarRating star={review.rating} />
                                </div>
                                <span className="star-rating__text text-body">
                                  {review.rating}
                                </span>
                              </div>
                              <span className="product-review__reason">
                                For{" "}
                                <span className="product-review__subject">
                                  Customer Support
                                </span>
                              </span>
                            </div>
                            <div className="product-review__date">
                              by{" "}
                              <strong className="product-review__user text--base">
                                {review.user.name || "Anonymous"}
                              </strong>{" "}
                              {formatDate(review.createdAt)}
                            </div>
                          </div>
                          <div className="product-review__body">
                            <p className="product-review__desc">
                              {review?.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column - Product Info and Purchase Options */}
          <div className="col-lg-6">
            <div className="product-sidebar pt-0">
              <div className="product-sidebar__top position-relative flx-between gap-1">
                <div className="title_box">
                  <h3 className="product-sidebar__title">{product.name}</h3>
                </div>

                <div className="price py-3">
                  <h4>
                    ৳
                    {product?.isDiscounted
                      ? product?.discountPrice
                      : product?.price}
                    <del>
                      {product?.isDiscounted ? `৳${product?.price}` : ""}
                    </del>{" "}
                    {product.isDiscounted && (
                      <span className="discount_percent">
                        - {discount_percent}% Off
                      </span>
                    )}
                  </h4>
                  <p>
                    {/* {product !== null &&
                      product?.description.split(" ").slice(0, 20).join(" ")} */}
                  </p>
                </div>

                <div className="size py-3">
                  <h5>Size: {productDetails?.size}</h5>
                  <div className="size_varient">
                    {["XXL", "XL", "L", "M", "S"].map((size, index) => (
                      <button
                        className={
                          productDetails?.activeSize === index ? "active" : ""
                        }
                        key={index}
                        onClick={() =>
                          setProductDetails({
                            ...productDetails,
                            size: size,
                            activeSize: index,
                          })
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="color py-3">
                  <h5>Color: {productDetails?.color}</h5>
                  <div className="size_varient">
                    {["Red", "Green", "Blue"].map((color, index) => (
                      <button
                        className={
                          productDetails?.activeColor === index ? "active" : ""
                        }
                        key={index}
                        onClick={() =>
                          setProductDetails({
                            ...productDetails,
                            color: color,
                            activeColor: index,
                          })
                        }
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quantity py-3">
                  <div className="w-100">
                    <h5 className="text-danger">Stock: {product?.stock}</h5>
                    <div className="inner">
                      <button
                        className="btn-quantity btn-decrease"
                        onClick={() =>
                          setProductDetails({
                            ...productDetails,
                            quantity:
                              productDetails?.quantity > 1
                                ? productDetails?.quantity - 1
                                : 1,
                          })
                        }
                      >
                        -
                      </button>
                      <span className="quantity-product">
                        {productDetails?.quantity}
                      </span>
                      <button
                        className="btn-quantity btn-increase"
                        onClick={() =>
                          setProductDetails({
                            ...productDetails,
                            quantity:
                              product?.stock > productDetails?.quantity
                                ? productDetails?.quantity + 1
                                : product?.stock,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-100 pt-5">
                    {product?.stock === 0 ? (
                      <>
                        <button
                          disabled={true}
                          className="btn not-allow btn-main d-flex w-100 justify-content-center align-items-center gap-2 pill px-sm-5 "
                        >
                          <img
                            src="assets/images/icons/add-to-cart.svg"
                            alt=""
                          />
                          Product out of stock
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleAddToCart}
                          disabled={cartLoading}
                          className="btn btn-main d-flex w-100 justify-content-center align-items-center gap-2 pill px-sm-5"
                        >
                          <img
                            src="assets/images/icons/add-to-cart.svg"
                            alt=""
                          />
                          {cartLoading ? "Adding..." : "Add To Cart"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta Attribute List Start */}
              <ul className="meta-attribute">
                <li className="meta-attribute__item">
                  <span className="name">Last Update</span>
                  <span className="details">
                    {formatDate(product?.updatedAt)}
                  </span>
                </li>
                <li className="meta-attribute__item">
                  <span className="name">Published</span>
                  <span className="details">
                    {formatDate(product?.createdAt)}
                  </span>
                </li>
                <li className="meta-attribute__item">
                  <span className="name">Category</span>
                  <span className="details">{product?.category?.name}</span>
                </li>
                <li className="meta-attribute__item">
                  <span className="name">Brand</span>
                  <span className="details">{product?.brand?.name}</span>
                </li>
                <li className="meta-attribute__item">
                  <span className="name">Is Discount</span>
                  <span className="details">
                    {String(product?.isDiscounted)}
                  </span>
                </li>
                {product?.isDiscounted && (
                  <li className="meta-attribute__item">
                    <span className="name">Discount Percent</span>
                    <span className="details">{discount_percent}%</span>
                  </li>
                )}
              </ul>
              {/* Meta Attribute List End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
