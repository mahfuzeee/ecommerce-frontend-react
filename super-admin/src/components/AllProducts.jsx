import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import { Link, useSearchParams } from "react-router-dom";
import { formats, modules } from "../helper/helper";
import Paginate from "../helper/Paginate";
import {
  useAllProduct,
  useSingleProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProduct";
import { useGetAllCategory } from "../hooks/useCategory";
import { useGetAllBrand } from "../hooks/useBrand";
import { hostURL } from "../helper/config";

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const { data, isLoading } = useAllProduct({ page, limit });
  const { products = [], pagination } = data || {};

  const { data: categoryData } = useGetAllCategory();
  const { data: brandData } = useGetAllBrand();

  const { categories = [] } = categoryData || {};
  const { brands = [] } = brandData || {};

  const [selectedProductId, setSelectedProductId] = useState("");
  const { data: selectedProduct } = useSingleProduct(selectedProductId);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const initialForm = {
    name: "",
    short_des: "",
    images: "",
    price: "",
    isDiscounted: false,
    discountPrice: "",
    category: "",
    brand: "",
    remark: "",
    stock: "",
    color: "",
    size: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!selectedProduct) {
      setForm(initialForm);
      return;
    }

    setForm({
      name: selectedProduct.name || "",
      short_des: selectedProduct.short_des || "",
      images: (selectedProduct.images || []).join(", "),
      price: selectedProduct.price ?? "",
      isDiscounted: Boolean(selectedProduct.isDiscounted),
      discountPrice: selectedProduct.discountPrice ?? "",
      category:
        selectedProduct?.category?._id || selectedProduct?.category || "",
      brand: selectedProduct?.brand?._id || selectedProduct?.brand || "",
      remark: selectedProduct.remark || "",
      stock: selectedProduct.stock ?? "",
      color: (selectedProduct.color || []).join(", "),
      size: (selectedProduct.size || []).join(", "),
      description: selectedProduct.description || "",
    });
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isDiscounted") {
      setForm((p) => ({ ...p, [name]: value === "true" }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setForm((p) => ({ ...p, description: value }));
  };

  const handlePageChange = ({ selected }) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", selected + 1);

      return params;
    });
  };

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleDeleteClick = (productId) => {
    deleteProduct.mutate(
      { id: productId },
      {
        onSuccess: () => {
          if (selectedProductId === productId) {
            setSelectedProductId("");
            setForm(initialForm);
          }
        },
      },
    );
  };

  const handleUpdateSubmit = () => {
    if (!selectedProductId) return;

    const payload = {
      name: form.name,
      short_des: form.short_des,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      price: Number(form.price) || 0,
      isDiscounted: Boolean(form.isDiscounted),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : 0,
      category: form.category,
      brand: form.brand,
      remark: form.remark,
      stock: Number(form.stock) || 0,
      color: form.color
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      size: form.size
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      description: form.description,
    };

    updateProduct.mutate(
      { id: selectedProductId, data: payload },
      {
        onSuccess: () => {
          setForm(initialForm);
          setSelectedProductId("");
        },
      },
    );
  };
  return (
    <>
      {/* Cover Photo Start */}
      <div className="cover-photo  overflow-hidden">
        <div className="avatar-upload p-5">
          <h2>Supper Admin</h2>
          <h5>All Product</h5>
        </div>
      </div>
      <div className="dashboard-body__content mt-0">
        {/* ========================= Statement section start =========================== */}
        <div className="row gy-4">
          <div className="col-12">
            <div className="card common-card border border-gray-five">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table text-body ">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Is Discount</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading && <tr>Loading...</tr>}
                      {products.length === 0 && <tr>No Product Found</tr>}

                      {products.map((item, index) => (
                        <tr className="super_admin_all-product" key={index}>
                          <td>
                            <img
                              src={item?.images[0]}
                              alt={item?.name}
                              style={{ width: "70px", height: "60px" }}
                              className="cover-img"
                            />
                          </td>
                          <td>
                            {" "}
                            <h6 className="product-item__title">
                              <Link
                                to={`${hostURL}/product-details?product_id=${item?._id}`}
                                className="link"
                              >
                                {item?.name}
                              </Link>
                            </h6>
                          </td>
                          <td>
                            <div className="flx-align justify-content-center gap-2">
                              <h6 className="product-item__price mb-0">
                                ৳
                                {item?.isDiscounted
                                  ? item?.discountPrice
                                  : item?.price}
                              </h6>
                              {item?.isDiscounted && (
                                <span className="product-item__prevPrice font-12 text-danger text-decoration-line-through">
                                  ৳{item?.price}
                                </span>
                              )}
                            </div>{" "}
                          </td>
                          <td> {item?.isDiscounted ? "Yes" : "No"}</td>
                          <td> {item?.stock}</td>
                          <td>
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target={`#exampleModal_${1}`}
                                onClick={() => handleEditClick(item?._id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteClick(item?._id)}
                                disabled={deleteProduct.isLoading}
                              >
                                {deleteProduct.isLoading
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flx-between justify-content-end gap-2">
                    <nav aria-label="Page navigation example">
                      <div>
                        <Paginate
                          handelPageClick={handlePageChange}
                          page_no={page}
                          per_page={limit}
                          totalCount={pagination?.totalProducts}
                        />
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ========================= Statement section End =========================== */}
      </div>

      {/*  */}
      <>
        <div
          className="modal fade"
          id={`exampleModal_${1}`}
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title fs-5" id="exampleModalLabel">
                  Update Product
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="profile">
                  <div className="row gy-4">
                    <div className="col-12">
                      <div className="dashboard-card">
                        <div className="profile-info-content">
                          <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active">
                              <div>
                                <div className="row gy-4">
                                  <div className="col-sm-6 col-xs-6">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={form.name}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>
                                  <div className="col-sm-6 col-xs-6">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Short Description
                                    </label>
                                    <input
                                      type="text"
                                      name="short_des"
                                      value={form.short_des}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>
                                  <div className="col-12">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Image (Use comma for multi images. Ex:
                                      image_1.png, image_2.jpg, image_3.png)
                                    </label>
                                    <textarea
                                      name="images"
                                      value={form.images}
                                      onChange={handleChange}
                                      className="common-input border"
                                    ></textarea>
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Price
                                    </label>
                                    <input
                                      type="number"
                                      name="price"
                                      value={form.price}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Is Discount?
                                    </label>
                                    <div className="select-has-icon">
                                      <select
                                        name="isDiscounted"
                                        value={String(form.isDiscounted)}
                                        onChange={handleChange}
                                        className="common-input border"
                                      >
                                        <option value={"true"}>True</option>
                                        <option value={"false"}>False</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Discount Price
                                    </label>
                                    <input
                                      type="number"
                                      name="discountPrice"
                                      value={form.discountPrice}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>

                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Category
                                    </label>
                                    <div className="select-has-icon">
                                      <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="common-input border"
                                      >
                                        <option value={""}>
                                          Please Select A Category **
                                        </option>
                                        {categories.map((category, index) => (
                                          <option
                                            value={category?._id}
                                            key={index}
                                          >
                                            {category?.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Brand
                                    </label>
                                    <div className="select-has-icon">
                                      <select
                                        name="brand"
                                        value={form.brand}
                                        onChange={handleChange}
                                        className="common-input border"
                                      >
                                        <option value={""}>
                                          Please Select A Brand **
                                        </option>
                                        {brands.map((brand, index) => (
                                          <option
                                            value={brand?._id}
                                            key={index}
                                          >
                                            {brand?.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Remark (Ex: New)
                                    </label>
                                    <input
                                      type="text"
                                      name="remark"
                                      value={form.remark}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Stock
                                    </label>
                                    <input
                                      type="number"
                                      name="stock"
                                      value={form.stock}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>
                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Color (Ex: Red, Green, Blue)
                                    </label>
                                    <input
                                      type="text"
                                      name="color"
                                      value={form.color}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>

                                  <div className="col-sm-4 col-xs-4">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Size (Ex: XXL, XL, X)
                                    </label>
                                    <input
                                      type="text"
                                      name="size"
                                      value={form.size}
                                      onChange={handleChange}
                                      className="common-input border"
                                    />
                                  </div>

                                  <div className="col-12">
                                    <label className="form-label mb-2 font-18 font-heading fw-600">
                                      Description
                                    </label>

                                    <ReactQuill
                                      theme="snow"
                                      modules={modules}
                                      formats={formats}
                                      value={form.description}
                                      onChange={handleQuillChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={updateProduct.isLoading}
                  onClick={handleUpdateSubmit}
                >
                  {updateProduct.isLoading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AllProducts;
