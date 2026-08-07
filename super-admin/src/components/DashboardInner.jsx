import useProduct from "../hooks/useProduct";
import { Link } from "react-router-dom";
import useBrand from "../hooks/useBrand";
import useCategory from "../hooks/useCategory";
import { useAllReview } from "../hooks/useReview";
const DashboardInner = () => {
  const filter = { page: 1, limit: 5 };
  const { data: productsData } = useProduct(filter);
  const { data: brandData } = useBrand();
  const { data: categoryData } = useCategory(filter);
  const { data: reviewData } = useAllReview();

  const { products = [], pagination } = productsData || {};

  return (
    <section className="p-5">
      <div className="row g-4">
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Users</h6>
              <h2 className="number fw-bold mb-1">100</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Products</h6>
              <h2 className="number fw-bold mb-1">
                {pagination?.totalProducts}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Categories</h6>
              <h2 className="number fw-bold mb-1">25</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Brands</h6>
              <h2 className="number fw-bold mb-1">30</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Orders</h6>
              <h2 className="number fw-bold mb-1">200</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Income</h6>
              <h2 className="number fw-bold mb-1">10000</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Pending Deliver</h6>
              <h2 className="number fw-bold mb-1">50</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Delivered Orders</h6>
              <h2 className="number fw-bold mb-1">150</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total canceled Orders</h6>
              <h2 className="number fw-bold mb-1">20</h2>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-4 col-md-6">
          <div className="card user-card shadow-sm border-0 p-3">
            <div className="card-body text-center">
              <h6 className="text-secondary mb-2">Total Reviews</h6>
              <h2 className="number fw-bold mb-1">100</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardInner;
