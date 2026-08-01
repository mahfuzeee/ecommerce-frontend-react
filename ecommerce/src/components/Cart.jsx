import { Link } from "react-router-dom";
import { useEffect } from "react";
import cartStore from "../store/cart.store";
import { ErrorToast } from "../helper/helper";

const Cart = () => {
  //Cart store objecsts
  const { cart, getCart, deleteCart, updateCart } = cartStore();
  useEffect(() => {
    (async () => {
      await getCart();
    })();
  }, [getCart]);

  const handleDeleteCart = async (id) => {
    await deleteCart(id);
    await getCart();
  };

  const incrementQuantity = async (id, quantity) => {
    const data = { quantity: quantity + 1 };
    await updateCart(id, data);
    await getCart();
  };

  const decrementQuantity = async (id, quantity) => {
    if (quantity > 1) {
      const data = { quantity: quantity - 1 };
      await updateCart(id, data);
      await getCart();
    } else {
      ErrorToast("Minimum quantity is 1");
    }
  };

  return (
    <div className="cart padding-y-120">
      <div className="container">
        <div className="cart-content">
          <div className="table-responsive">
            {cart.length > 0 ? (
              <table className="table style-two">
                <thead>
                  <tr>
                    <th>Product Details</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="cart-item">
                          <div className="d-flex align-items-center gap-3">
                            <div className="cart-item__thumb">
                              <Link
                                to={`/product-details/?product_id=${item?.product_id}`}
                                className="link"
                              >
                                <img
                                  src={item?.product?.images[0]}
                                  alt={item?.product?.name}
                                  className="cover-img"
                                />
                              </Link>
                            </div>
                            <div className="cart-item__content">
                              <h6 className="cart-item__title font-heading fw-700 text-capitalize font-18 mb-4">
                                {" "}
                                <Link
                                  to={`/product-details/?product_id=${item?.product_id}`}
                                  className="link"
                                >
                                  {item?.product?.name}
                                </Link>
                              </h6>
                              <div className="cart-item__price font-15 text-heading fw-500">
                                Category:{" "}
                                <span className="text-body font-18">
                                  {item?.category?.name}
                                </span>
                              </div>
                              <div className="cart-item__price font-15 text-heading fw-500">
                                Size:{" "}
                                <span className="text-body font-18">
                                  {item?.product?.size}
                                </span>
                              </div>
                              <div className="cart-item__price font-15 text-heading fw-500">
                                Color:{" "}
                                <span className="text-body font-18">
                                  {item?.product?.color}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flx-align gap-4 mt-3 mt-lg-4">
                            <button
                              onClick={() => handleDeleteCart(item?._id)}
                              className="rounded-btn delete-btn text-danger hover-text-decoration-underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="cart-item__count">
                          <button
                            onClick={() =>
                              decrementQuantity(item?._id, item?.quantity)
                            }
                            data-decrease="data-decrease"
                          >
                            {" "}
                            <i className="fas fa-minus" />
                          </button>
                          <input
                            data-value="data-value"
                            type="number"
                            value={item?.quantity}
                            readOnly
                          />
                          <button
                            onClick={() =>
                              incrementQuantity(item?._id, item?.quantity)
                            }
                            data-increase="data-increase"
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <span className="cart-item__totalPrice text-body font-18 fw-400 mb-0">
                          ৳
                          {item?.product?.isDiscounted
                            ? item?.product?.discountPrice
                            : item?.product?.price}
                          <del className="font-12 text-danger ">
                            {" "}
                            {item?.product?.isDiscounted
                              ? `৳${item?.product?.price}`
                              : ""}
                          </del>{" "}
                        </span>
                      </td>
                      <td>
                        <span className="cart-item__totalPrice text-body font-18 fw-400 mb-0">
                          ৳
                          {item?.product?.isDiscounted
                            ? Number(item?.product?.discountPrice).toFixed(2) *
                              Number(item?.quantity)
                            : Number(item?.product?.price).toFixed(2) *
                              Number(item?.quantity)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h5 className="text-center">Cart is empty</h5>
            )}
          </div>

          <div className="cart-content__bottom flx-between gap-2">
            <Link
              to="/all-products?category_id=0&brand_id=0&remark=0&keyword=0&per_page=12&page_no=1"
              className="btn btn-outline-light flx-align gap-2 pill btn-lg"
            >
              <span className="icon line-height-1 font-20">
                <i className="las la-arrow-left" />
              </span>
              Continue Shopping
            </Link>
            <Link
              to="/cart-personal"
              className="btn btn-main flx-align gap-2 pill btn-lg"
            >
              Next
              <span className="icon line-height-1 font-20">
                <i className="las la-arrow-right" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
