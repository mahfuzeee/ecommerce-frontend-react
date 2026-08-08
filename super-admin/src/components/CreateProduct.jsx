import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { formats, modules } from "../helper/helper";
import { useCreateProduct } from "../hooks/useProduct";
import { ErrorToast } from "../helper/helper";
import { useGetAllCategory } from "../hooks/useCategory";
import { useGetAllBrand } from "../hooks/useBrand";

const CreateProduct = () => {
  const createProduct = useCreateProduct();

  const { data: categoryData } = useGetAllCategory();
  const { data: brandData } = useGetAllBrand();

  const { categories = [] } = categoryData || {};

  const { brands = [] } = brandData || {};

  console.log(brands);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isDiscounted") {
      setForm((p) => ({ ...p, [name]: value === "true" }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleQuillChange = (val) => {
    setForm((p) => ({ ...p, description: val }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const categoryId =
      categories.find(
        (category) =>
          category?._id === form.category ||
          category?.id === form.category ||
          category?.name === form.category ||
          category?.title === form.category,
      )?._id || form.category;
    const brandId =
      brands.find(
        (brand) =>
          brand?._id === form.brand ||
          brand?.id === form.brand ||
          brand?.name === form.brand ||
          brand?.title === form.brand,
      )?._id || form.brand;

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
      category: categoryId,
      brand: brandId,
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

    createProduct.mutate(payload, {
      onSuccess: () => {
        setForm(initialForm);
      },
    });
  };

  return (
    <>
      {/* Cover Photo Start */}
      <div className="cover-photo  overflow-hidden">
        <div className="avatar-upload p-5 mb-5">
          <h2>Supper Admin</h2>
          <h5>Create Product</h5>
        </div>
      </div>
      {/* Cover Photo End */}
      <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--100 pt-2">
        {/* Profile Content Start */}
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
                                    value={
                                      category?._id ||
                                      category?.id ||
                                      category?.name
                                    }
                                    key={index}
                                  >
                                    {category?.name ||
                                      category?.title ||
                                      category}
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
                                    value={
                                      brand?._id || brand?.id || brand?.name
                                    }
                                    key={index}
                                  >
                                    {brand?.name || brand?.title || brand}
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

                          <div className="col-sm-12 text-end">
                            <button
                              className="btn btn-main btn-lg pill mt-4"
                              onClick={handleSubmit}
                              disabled={createProduct.isLoading}
                            >
                              {createProduct.isLoading
                                ? "Creating..."
                                : "Create Product"}
                            </button>
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
        {/* Profile Content End */}
      </div>
    </>
  );
};

export default CreateProduct;
