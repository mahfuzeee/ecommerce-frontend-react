import { FaArrowRotateRight } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import Paginate from "../helper/Paginate";
import useCategory from "../hooks/useCategory";
import useBrand from "../hooks/useBrand";
import useProduct from "../hooks/useProduct";
import { useState, useEffect } from "react";

const AllProduct = () => {
  //State for button view
  const [view, setView] = useState("grid-view");
  //state for search
  const [search, setSearch] = useState("");
  //Search params
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    page: Number(searchParams.get("page")) || 1,

    limit: Number(searchParams.get("limit")) || 12,

    brand_id: searchParams.get("brand_id") || "",

    category_id: searchParams.get("category_id") || "",

    keyword: searchParams.get("keyword") || "",
  };

  //Data fetching using hooks
  const { data: brandData, isLoading: brandLoading } = useBrand({
    page: 1,
    limit: 100,
  });

  const { data: categoryData, isLoading: categoryLoading } = useCategory({
    page: 1,
    limit: 100,
  });

  const { data: productData, isLoading: productLoading } = useProduct(filters);

  //Destructring Product data
  const { products = [], pagination = {} } = productData || {};

  //console.log(JSON.stringify(pagination));
  //Destructring category data
  const { categories = [] } = categoryData || {};

  //Destructring brand data
  const { brands = [] } = brandData || {};

  const handleView = (buttonName) => {
    setView(buttonName);
  };

  //Handle page change
  const handlePageChange = ({ selected }) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", selected + 1);

      return params;
    });
  };

  //Handle category change
  const handleCategoryChange = (category_id) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("category_id", category_id);

      params.set("page", 1);

      return params;
    });
  };

  //Handle brand change
  const handleBrandChange = (brand_id) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("brand_id", brand_id);

      params.set("page", 1);

      return params;
    });
  };

  //Handle search keword
  const handleSearch = (searchKeyword) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("keyword", searchKeyword);

      params.set("page", 1);

      return params;
    });
  };

  //Handle Reset
  const handleReset = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.delete("keyword");

      params.set("page", 1);
      params.delete("brand_id");
      params.delete("category_id");

      return params;
    });
  };

  return (
    <>
      <section className="breadcrumb breadcrumb-one padding-y-60 section-bg position-relative z-index-1 overflow-hidden">
        <img
          src="assets/images/gradients/breadcrumb-gradient-bg.png"
          alt=""
          className="bg--gradient"
        />
        <img
          src="assets/images/shapes/element-moon3.png"
          alt=""
          className="element one"
        />
        <img
          src="assets/images/shapes/element-moon1.png"
          alt=""
          className="element three"
        />
        <div className="container container-two">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="breadcrumb-one-content">
                <h3 className="breadcrumb-one-content__title text-center mb-3 text-capitalize">
                  {pagination.totalProducts} products available for purchase
                </h3>
                <p className="breadcrumb-one-content__desc text-center text-black-three">
                  Explore the best Product available for sale. Our unique
                  collection is hand-curated by experts. Find and buy the
                  perfect premium product.
                </p>
                <div className="search-box">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="common-input common-input--lg pill shadow-sm"
                    placeholder="Search product & more..."
                  />
                  <button
                    onClick={() => handleSearch(search)}
                    className="btn btn-main btn-icon icon border-0"
                  >
                    <img src="assets/images/icons/search.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*==== all product list view or grid view section===== */}

      <section
        className={`all-product padding-y-120 ${view === "list-view" && "list-view"}`}
      >
        <div className="container container-two">
          <div className="row">
            <div className="col-lg-12">
              <div className="filter-tab gap-3 flx-between">
                <div className="gap-3 flx-between">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="filter-tab__button btn btn-outline-light pill d-flex align-items-center"
                  >
                    <span className="icon icon-left">
                      <FaArrowRotateRight />
                    </span>
                    <span className="font-18 fw-500">Reset</span>
                  </button>
                </div>

                <div className="list-grid d-flex align-items-center gap-2">
                  <button
                    onClick={() => handleView("list-view")}
                    className={`list-grid__button list-button d-sm-flex d-none text-body ${view === "list-view" && "active"}`}
                  >
                    <i className="las la-list" />
                  </button>
                  <button
                    onClick={() => handleView("grid-view")}
                    className={`list-grid__button grid-button d-sm-flex d-none text-body ${view === "grid-view" && "active"}`}
                  >
                    <i className="las la-border-all" />
                  </button>
                  <button className="list-grid__button sidebar-btn text-body d-lg-none d-flex">
                    <i className="las la-bars" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              {/* ===================== Filter Sidebar Start ============================= */}
              <div className={`filter-sidebar`}>
                <button
                  type="button"
                  className="filter-sidebar__close p-2 position-absolute end-0 top-0 z-index-1 text-body hover-text-main font-20 d-lg-none d-block"
                >
                  <i className="las la-times" />
                </button>

                {/* sidebar item */}
                <div className="filter-sidebar__item">
                  <div>
                    <button
                      type="button"
                      className="filter-sidebar__button font-16 text-capitalize fw-500"
                    >
                      Category
                    </button>
                    <div className="filter-sidebar__content">
                      <ul className="filter-sidebar-list">
                        {!categoryLoading &&
                          categories.map((category, index) => (
                            <li
                              key={index}
                              onClick={() => handleCategoryChange(category._id)}
                              className="filter-sidebar-list__item courser"
                            >
                              <span className="filter-sidebar-list__text">
                                {category.name} <span className="qty">9</span>
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="filter-sidebar__button font-16 text-capitalize fw-500"
                    >
                      Brands
                    </button>
                    <div className="filter-sidebar__content">
                      <ul className="filter-sidebar-list">
                        {!brandLoading &&
                          brands.map((brand, index) => (
                            <li
                              key={index}
                              onClick={() => handleBrandChange(brand._id)}
                              className="filter-sidebar-list__item courser"
                            >
                              <span className="filter-sidebar-list__text">
                                {brand.name} <span className="qty">10</span>
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* ===================== Filter Sidebar End ============================= */}
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="pills-product"
                  role="tabpanel"
                  aria-labelledby="pills-product-tab"
                  tabIndex={0}
                >
                  {products?.length === 0 && (
                    <div className=" flx-align gap-2 justify-content-center">
                      <h4>
                        <p className="mt-5">No product found!</p>
                      </h4>
                    </div>
                  )}
                  <div className="row gy-4 list-grid-wrapper">
                    {!productLoading &&
                      products.map((product, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="product-item">
                            <div className="product-item__thumb d-flex">
                              <Link
                                to={`/product-details?product_id=${product._id}`}
                                className="link w-100"
                              >
                                <img
                                  src={product.images[0]}
                                  alt={product.slug}
                                  className="cover-img"
                                />
                              </Link>
                            </div>
                            <div className="product-item__content">
                              <h6 className="product-item__title">
                                <Link
                                  to={`/product-details?product_id=${product._id}`}
                                  className="link"
                                >
                                  {product?.name}
                                </Link>
                              </h6>
                              <div className="product-item__info flx-between gap-2">
                                <span className="product-item__author">
                                  <span className="link hover-text-decoration-underline">
                                    Admin
                                  </span>
                                </span>
                                <span className="product-item__author">
                                  <span className="btn btn-main pill category">
                                    {product?.category?.name}
                                  </span>
                                </span>
                              </div>
                              <div className="product-item__bottom flx-between  gap-2">
                                <div className="flx-align gap-2">
                                  <h6 className="product-item__price mb-0">
                                    ৳
                                    {product?.isDiscounted
                                      ? product?.discountPrice
                                      : product?.price}
                                  </h6>
                                  <span className="product-item__prevPrice text-decoration-line-through">
                                    {product?.isDiscounted
                                      ? `৳${product?.price}`
                                      : ""}
                                  </span>
                                </div>
                                <Link
                                  to={`/product-details?product_id=${product._id}`}
                                  className="btn btn-outline-light btn-sm pill"
                                >
                                  View Product
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <nav aria-label="Page navigation example">
                    {/* Paginate */}
                    {products.length > 0 && (
                      <Paginate
                        handelPageClick={handlePageChange}
                        page_no={filters.page}
                        per_page={filters.limit}
                        totalCount={pagination?.totalProducts}
                      />
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProduct;
