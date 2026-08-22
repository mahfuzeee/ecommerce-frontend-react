import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Paginate from "../helper/Paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAllReview } from "../hooks/useReview";
import { formatDate } from "../helper/helper";

const AllReviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const limit = 10;

  //Data fetching using hooks
  const { data, isLoading: reviewLoading } = useAllReview({
    page,
    limit,
  });

  const reviewData = Array.isArray(data) ? data[0] : data;
  const allReviews = reviewData?.reviews || [];

  const total = reviewData?.totalCount || 0;

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
    <div className="dashboard-body__content">
      {/* ===================== Review Section Start ========================== */}
      <div className="card common-card border border-gray-five">
        <div className="card-body">
          <div className="table-responsive">
            {allReviews.length > 0 ? (
              allReviews.map((review, index) => (
                <div key={index} className="product-review-wrapper">
                  <div className="product-review">
                    <div className="product-review__top flx-between">
                      <div className="review_img">
                        <img src={review?.product?.images[0]} />
                        <div>
                          <Link
                            target="_blank"
                            to={`/super-admin/product-details?product_id={${
                              review?.product?._id
                            }}`}
                          >
                            <h5>{review?.product?.name}</h5>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-1">
                          <div className="star">
                            <p className="font-20 fw-bold">
                              {review?.user?.name}
                            </p>
                            <strong>Email:</strong> {review?.user?.email}
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <div className="star d-flex align-items-center gap-1">
                            <StarRating star={parseInt(review?.rating) || 0} />
                            <span className="star-rating__text text-body mt-1">
                              {parseInt(review?.rating).toFixed(1) || 0}{" "}
                              {`(${formatDate(review?.createdAt)})`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-review__body">
                      <p className="product-review__desc">
                        {review?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div> No Reviews found</div>
            )}

            <div className="flx-between justify-content-end gap-2">
              <nav aria-label="Page navigation example">
                <div>
                  <Paginate
                    page_no={page}
                    per_page={limit}
                    totalCount={total}
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* ===================== Review Section End ========================== */}
    </div>
  );
};

export default AllReviews;
