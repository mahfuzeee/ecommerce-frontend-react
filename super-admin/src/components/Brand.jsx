import { baseURLFile } from "../helper/config";
import Paginate from "../helper/Paginate";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetAllBrand,
  useCreateBrand,
  useDeleteBrand,
  useSingleBrand,
  useUpdateBrand,
} from "../hooks/useBrand";
import { DeleteAlert, ErrorToast, SuccessToast } from "../helper/helper";

const Brand = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = 10;
  const initialForm = {
    name: "",
    logo: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [selectedBrandId, setSelectedBrandId] = useState("");

  const {
    data: brandData,
    isLoading: brandLoading,
    refetch: refetchBrands,
  } = useGetAllBrand({ page, limit }) || {};
  const { brands = [], totalBrands } = brandData || {};
  const { data: selectedBrand } = useSingleBrand(selectedBrandId) || {};
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  //Set form data for update popup
  useEffect(() => {
    if (!selectedBrand) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      name: selectedBrand?.name || "",
      logo: selectedBrand?.logo || "",
    });
  }, [selectedBrand]);

  //Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle create brand submit
  const handleCreateSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      logo: formData.logo,
    };

    createBrand.mutate(payload, {
      onSuccess: () => {
        setFormData(initialForm);
        refetchBrands?.();
      },
    });
  };

  //Handle edit button click
  const handleEditClick = (brandId) => {
    setSelectedBrandId(brandId);
  };

  //Handle update brand click
  const handleUpdateSubmit = () => {
    if (!selectedBrandId) return;

    updateBrand.mutate(
      { id: selectedBrandId, data: formData },
      {
        onSuccess: () => {
          setSelectedBrandId("");
          setFormData(initialForm);
          refetchBrands?.();
        },
      },
    );
  };

  //Handle delete brand click
  const handleDeleteClick = async (id) => {
    const res = await DeleteAlert(deleteBrand.mutateAsync, id);
    if (res) {
      setSelectedBrandId("");
      setFormData(initialForm);
      refetchBrands?.();
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
          <h5>Create Brand</h5>
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
                              Brand name
                            </label>
                            <input
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              type="text"
                              className="common-input border"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Image Single
                            </label>
                            <input
                              name="logo"
                              value={formData.logo}
                              onChange={handleChange}
                              type="text"
                              className="common-input border"
                            />
                          </div>

                          <div className="col-sm-12 text-end">
                            <button
                              onClick={handleCreateSubmit}
                              disabled={createBrand.isLoading}
                              className="btn btn-main btn-lg pill mt-4 "
                            >
                              {createBrand.isLoading
                                ? "Creating..."
                                : "Create Brand"}
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
                          <th>Brand Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brands?.length === 0 && (
                          <tr>
                            <td colSpan={3}>No data found</td>
                          </tr>
                        )}
                        {brandLoading && (
                          <tr>
                            <td colSpan={3}>Loading...</td>
                          </tr>
                        )}
                        {brands.map((brand, index) => (
                          <tr key={index}>
                            <td>
                              <div className="img-100">
                                <img src={brand?.logo} alt={brand?.name} />
                              </div>
                            </td>
                            <td>{brand?.name}</td>
                            <td>
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  onClick={() => handleEditClick(brand?._id)}
                                  className="btn btn-success"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#exampleModal_${1}`}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(brand?._id)}
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
                          {brands.length > 0 && (
                            <Paginate
                              handelPageClick={handlePageChange}
                              page_no={page}
                              per_page={limit}
                              totalCount={totalBrands}
                            />
                          )}
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

      {/* Brand update section */}
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
                  Update Brand
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
                                Brand name
                              </label>
                              <input
                                onChange={handleChange}
                                name="name"
                                value={formData.name}
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
                                name="logo"
                                value={formData.logo}
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
                  onClick={handleUpdateSubmit}
                  disabled={updateBrand.isLoading}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  {updateBrand.isLoading ? "Updating..." : "Update Brand"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Brand;
