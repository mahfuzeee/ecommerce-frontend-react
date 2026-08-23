import { baseURLFile } from "../helper/config";
import Paginate from "../helper/Paginate";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useGetAllFile, useUploadFile, useDeleteFile } from "../hooks/useFile";
const FileManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = searchParams.get("limit") || 8;

  const [file, setFile] = useState(null);

  const { data } = useGetAllFile({ page, limit });
  const fileData = data?.data?.data?.[0] || {};
  const files = fileData.files || [];
  const totalCount = fileData.totalCount?.[0]?.count || 0;

  //Upload file section
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: deleteFile } = useDeleteFile();

  const handleDeleteClick = (fileId, fileName) => {
    deleteFile({ _id: fileId, filename: fileName });
  };

  //Handle Page change
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
        <div className="avatar-upload p-5">
          <h2>Supper Admin</h2>
          <h5>File Manager</h5>
        </div>
      </div>
      {/* Cover Photo End */}
      <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--150">
        {/* Profile Content Start */}
        <div className="profile">
          <div className="row gy-4">
            <div className="col-12">
              <div className="profile-info">
                <div className="container my-5 p-4 border rounded shadow-sm bg-white">
                  <h4 className="mb-3">Upload Files</h4>
                  {/* Upload Input */}
                  <div className="mb-3">
                    <input
                      onChange={(e) => setFile(e.target.files[0] || null)}
                      type="file"
                      name="file"
                      className="form-control"
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => file && uploadFile(file)}
                      className="btn btn-danger "
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="dashboard-card">
                <div className=" p-5">
                  <h4 className="mb-3">Image Gallery</h4>
                  <div className="row g-3">
                    {files.map((file) => (
                      <div
                        className="col-2 col-xl-3 col-md-4 mb-5"
                        key={file._id}
                      >
                        <div className="card img_g shadow-sm position-relative">
                          {/* Delete button */}
                          <button
                            onClick={() =>
                              handleDeleteClick(file._id, file.fileName)
                            }
                            className="btn btn-danger position-absolute top-0 end-0 m-1 rounded-circle"
                            type="button"
                            aria-label={`Delete ${file.fileName}`}
                          >
                            &times;
                          </button>

                          {/* Image */}
                          <img
                            src={`${baseURLFile}/${file.fileName}`}
                            alt={file.fileName}
                            className="card-img-top"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />

                          {/* Card body */}
                          <div className="card-body p-2 text-center">
                            <p
                              className="small text-truncate mb-0 text-primary"
                              style={{ cursor: "pointer" }}
                              title="Click to copy"
                            >
                              {file.fileName}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <nav aria-label="Page navigation example">
                    {files.length > 0 && (
                      <Paginate
                        handelPageClick={handlePageChange}
                        page_no={page}
                        per_page={limit}
                        totalCount={totalCount}
                      />
                    )}
                  </nav>
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

export default FileManager;
