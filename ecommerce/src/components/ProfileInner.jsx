import userStore from "../store/user.store";
import { formatDate, ErrorToast, IsEmpty } from "../helper/helper";
import { useState, useEffect } from "react";

const ProfileInner = () => {
  const { user, userRequest, userUpdateLoading, userUpdateRequest } =
    userStore();

  useEffect(() => {
    (async () => await userRequest())();
  }, []);
  //console.log(JSON.stringify(user));

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    addresses: {
      address: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    phone: "",
    shippingAddress: {
      address: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
        addresses: {
          address: user?.addresses?.address || "",
          street: user?.addresses?.street || "",
          city: user?.addresses?.city || "",
          state: user?.addresses?.state || "",
          zipCode: user?.addresses?.zipCode || "",
          country: user?.addresses?.country || "",
        },
        phone: user?.phone || "",
        shippingAddress: {
          address: user?.shippingAddress?.address || "",
          street: user?.shippingAddress?.street || "",
          city: user?.shippingAddress?.city || "",
          state: user?.shippingAddress?.state || "",
          zipCode: user?.shippingAddress?.zipCode || "",
          country: user?.shippingAddress?.country || "",
          phone: user?.shippingAddress?.phone || "",
        },
      });
    }
  }, [user]);

  const validation = [
    { field: userData?.name, message: "Name is required!" },
    { field: userData?.email, message: "Email is required!" },
    { field: userData?.password, message: "Password is required!" },
    { field: userData?.addresses?.address, message: "Address is required!" },
    { field: userData?.addresses?.city, message: "City is required!" },
    { field: userData?.addresses?.state, message: "State is required!" },
    { field: userData?.addresses?.zipCode, message: "Zip Code is required!" },
    { field: userData?.addresses?.country, message: "Country is required!" },
    { field: userData?.phone, message: "Phone is required!" },
    {
      field: userData?.shippingAddress?.address,
      message: "Shipping Address is required!",
    },
    {
      field: userData?.shippingAddress?.city,
      message: "Shipping City is required!",
    },
    {
      field: userData?.shippingAddress?.state,
      message: "Shipping State is required!",
    },
    {
      field: userData?.shippingAddress?.zipCode,
      message: "Shipping Zip Code is required!",
    },
    {
      field: userData?.shippingAddress?.country,
      message: "Shipping Country is required!",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        [name]: value,
      },
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const { field, message } of validation) {
      if (IsEmpty(field)) {
        return ErrorToast(message);
      }
    }
    console.log(JSON.stringify(userData));
    await userUpdateRequest(userData);
    await userRequest();
  };

  return (
    <>
      {/* Cover Photo Start */}
      <div className="cover-photo position-relative z-index-1 overflow-hidden">
        <div className="avatar-upload">
          <div className="avatar-preview">
            <div id="imagePreviewTwo"></div>
          </div>
        </div>
      </div>
      {/* Cover Photo End */}
      <div className="dashboard-body__content profile-content-wrapper z-index-1 position-relative mt--100">
        {/* Profile Content Start */}
        <div className="profile">
          <div className="row gy-4">
            <div className="col-xxl-3 col-xl-4">
              <div className="profile-info">
                <div className="profile-info__inner mb-40 text-center">
                  <h5 className="profile-info__name mb-1">{user?.name}</h5>
                  <span className="profile-info__designation font-14">
                    Exclusive Author
                  </span>
                </div>
                <ul className="profile-info-list">
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="assets/images/icons/profile-info-icon2.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Email</span>
                    </span>
                    <span className="profile-info-list__info">
                      {user?.email}
                    </span>
                  </li>
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="assets/images/icons/profile-info-icon3.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Phone</span>
                    </span>
                    <span className="profile-info-list__info">
                      {user?.phone}
                    </span>
                  </li>
                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="assets/images/icons/profile-info-icon4.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">Country</span>
                    </span>
                    <span className="profile-info-list__info">
                      {user?.addresses?.country}
                    </span>
                  </li>

                  <li className="profile-info-list__item">
                    <span className="profile-info-list__content flx-align flex-nowrap gap-2">
                      <img
                        src="assets/images/icons/profile-info-icon6.svg"
                        alt=""
                        className="icon"
                      />
                      <span className="text text-heading fw-500">
                        Member Since
                      </span>
                    </span>
                    <span className="profile-info-list__info">
                      {formatDate(user?.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-8">
              <div className="dashboard-card">
                <div className="profile-info-content">
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active">
                      <div>
                        <div className="row gy-4">
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer Name
                            </label>
                            <input
                              required
                              value={userData.name ?? ""}
                              name="name"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer Name"
                            />
                          </div>

                          <div className="col-sm-6 col-xs-6">
                            <label
                              htmlFor="confirm-password"
                              className="form-label mb-2 font-18 font-heading fw-600"
                            >
                              Password
                            </label>
                            <div className="position-relative">
                              <input
                                value={userData.password ?? ""}
                                name="password"
                                type="password"
                                onChange={handleChange}
                                className="common-input common-input--withIcon common-input--withLeftIcon "
                              />
                              <span className="input-icon input-icon--left">
                                <img
                                  src="assets/images/icons/lock-two.svg"
                                  alt=""
                                />
                              </span>
                            </div>
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer address
                            </label>
                            <input
                              required
                              value={userData.addresses.address ?? ""}
                              name="address"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer address"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer city
                            </label>
                            <input
                              required
                              value={userData.addresses.city ?? ""}
                              name="city"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer city"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer country
                            </label>
                            <input
                              required
                              value={userData.addresses.country ?? ""}
                              name="country"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer country"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer fax
                            </label>
                            <input
                              required
                              value="123-456-7890"
                              onChange={handleChange}
                              name="cus_fax"
                              type="text"
                              className="common-input border"
                              placeholder="Customer fax"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer phone
                            </label>
                            <input
                              required
                              value={userData.phone ?? ""}
                              name="phone"
                              type="tel"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer phone"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer postcode
                            </label>
                            <input
                              required
                              value={userData.addresses.zipCode ?? ""}
                              name="zipCode"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer postcode"
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Customer state
                            </label>
                            <input
                              required
                              value={userData.addresses.state ?? ""}
                              name="state"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Customer state"
                            />
                          </div>

                          {/* Shipping */}

                          <div>
                            <p>
                              -------- 🚚 Shipping Information 🛳️ ----------
                            </p>
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping name
                            </label>
                            <input
                              required
                              value={user?.name ?? ""}
                              name="name"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping name"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping address
                            </label>
                            <input
                              required
                              value={userData.shippingAddress.address ?? ""}
                              name="address"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping address"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping city
                            </label>
                            <input
                              required
                              value={userData.shippingAddress.city ?? ""}
                              name="city"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping city"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping country
                            </label>
                            <input
                              required
                              value={userData.shippingAddress.country ?? ""}
                              name="country"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping country"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping phone
                            </label>
                            <input
                              required
                              value={userData.shippingAddress.phone ?? ""}
                              name="phone"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping phone"
                            />
                          </div>
                          <div className="col-sm-6 col-xs-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping postcode
                            </label>
                            <input
                              required
                              value={userData.shippingAddress.zipCode ?? ""}
                              name="zipCode"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping postcode"
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                              Shipping state
                            </label>
                            <input
                              required
                              value={userData.shippingAddress.state ?? ""}
                              name="state"
                              type="text"
                              onChange={handleChange}
                              className="common-input border"
                              placeholder="Shipping state"
                            />
                          </div>

                          <div className="col-sm-12 text-end">
                            <button
                              disabled={userUpdateLoading}
                              type="submit"
                              onClick={handleSubmit}
                              className="btn btn-main btn-lg pill mt-4"
                            >
                              {userUpdateLoading
                                ? "Updating..."
                                : "Update Profile"}
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

export default ProfileInner;
