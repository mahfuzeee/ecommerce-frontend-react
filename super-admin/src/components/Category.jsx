import { baseURLFile } from "../helper/config";
import Paginate from "../helper/Paginate";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetAllCategory,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
  useSingleCategory,
} from "../hooks/useCategory";
import { DeleteAlert } from "../helper/helper";

const Category = () => {
  //Search Params
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  //States for selected Category id
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { data: categoryData, refetch: refetchCategories } = useGetAllCategory({
    page,
    limit,
  });
  const { categories = [], pagination } = categoryData || {};

  const { data: selectedCategory } =
    useSingleCategory(selectedCategoryId) || {};

  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();

  const initialForm = {
    name: "",
    images: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  //Getting single category
  useEffect(() => {
    if (!selectedCategory) {
      setForm(initialForm);
      return;
    }

    setForm({
      name: selectedCategory.name || "",
      images: selectedCategory.images || "",
    });
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e?.preventDefault();

    const payload = {
      name: form.name,
      images: form.images,
    };

    createCategory.mutate(payload, {
      onSuccess: () => {
        setForm(initialForm);
        refetchCategories?.();
      },
    });
  };

  //Handle Edit click
  const handleEditClick = (id) => {
    setSelectedCategoryId(id);
  };

  //Handle update click
  const handleUpdateClick = () => {
    if (!selectedCategoryId) return;

    updateCategory.mutate(
      { id: selectedCategoryId, data: form },
      {
        onSuccess: () => {
          setSelectedCategoryId("");
          setForm(initialForm);
          refetchCategories?.();
        },
      },
    );
  };

  //Handle Delete click
  const handleDeleteClick = async (id) => {
    const res = await DeleteAlert(deleteCategory.mutateAsync, id);
    if (res) {
      setSelectedCategoryId("");
      setForm(initialForm);
      refetchCategories?.();
    }
  };

  //Handle page change function
  const handlePageChange = ({ selected }) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", selected + 1);

      return params;
    });
  };

  return (
    <>
      {/* Cover Photo Start */}
      <div className="cover-photo  overflow-hidden">
        <div className="avatar-upload p-5 mb-5">
          <h2>Supper Admin</h2>
          <h5>Create Category</h5>
        </div>
      </div>
      {/* Cover Photo End */}
      <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--100 pt-2">
        {/* Profile Content Start */}
        <div className="profile">
          <div className="row gy-4">
            <div className="col-12 ">
              <div className="dashboard-card">
                <div className="profile-info-content">
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active">
                      <div>
                        <div className="row gy-4">
                          <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Category name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              className="common-input border"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Image Single
                            </label>
                            <input
                              type="text"
                              name="images"
                              value={form.images}
                              onChange={handleChange}
                              placeholder="image1.png, image2.jpg"
                              className="common-input border"
                            />
                          </div>

                          <div className="col-sm-12 text-end">
                            <button
                              className="btn btn-main btn-lg pill mt-4 "
                              onClick={handleSubmit}
                              disabled={createCategory.isLoading}
                            >
                              {createCategory.isLoading
                                ? "Creating..."
                                : "Create Category"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 ">
              <div className="card common-card border border-gray-five">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table text-body ">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Category Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <tr key={category?._id || index}>
                            <td>
                              <div className="img-100">
                                <img
                                  src={category?.images}
                                  alt={category?.name}
                                />
                              </div>
                            </td>
                            <td>{category?.name}</td>
                            <td>
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  onClick={() => handleEditClick(category?._id)}
                                  className="btn btn-success"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#exampleModal_${1}`}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteClick(category?._id)
                                  }
                                  className="btn btn-danger"
                                >
                                  Delete
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
                            totalCount={pagination?.totalCategories}
                          />
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Content End */}
      </div>

      {/* Category update section */}
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
                  Update Category
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="dashboard-card">
                  <div className="profile-info-content">
                    <div className="tab-content" id="pills-tabContent">
                      <div className="tab-pane fade show active">
                        <div>
                          <div className="row gy-4">
                            <div className="col-md-6">
                              <label className="form-label mb-2 font-18 font-heading fw-600">
                                Category name
                              </label>
                              <input
                                onChange={handleChange}
                                name="name"
                                value={form.name}
                                type="text"
                                className="common-input border"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label mb-2 font-18 font-heading fw-600">
                                Image Single
                              </label>
                              <input
                                onChange={handleChange}
                                name="images"
                                value={form.images}
                                type="text"
                                className="common-input border"
                              />
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
                  onClick={handleUpdateClick}
                  disabled={updateCategory.isLoading}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  {updateCategory.isLoading ? "Updating..." : "Update Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Category;
