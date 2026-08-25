import Paginate from "../helper/Paginate";
import { useState, useCallback, useRef, useContext } from "react";
import { useAllOrder, useExportOrder, useUpdateOrder } from "../hooks/useOrder";
import { useSingleInvoice } from "../hooks/useInvoice";
import { useSearchParams } from "react-router-dom";
import { formatDate } from "../helper/helper";
import { ToWords } from "to-words";
import { useReactToPrint } from "react-to-print";

const AllOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  //State for setting invoice id for viewing a invoice.
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  //State for setting from and to date
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  //Data fetching using hooks.
  const { data: allOrderData } = useAllOrder({
    page,
    limit,
  });
  const { refetch: exportOrders } = useExportOrder({
    from: fromDate,
    to: toDate,
  });
  const updateOrderMutation = useUpdateOrder();

  const orderData = Array.isArray(allOrderData)
    ? allOrderData[0]
    : allOrderData;
  const allOrders = orderData?.orders || [];
  const totalCount = orderData?.totalCount || 0;

  const { data: selectedInvoiceData } = useSingleInvoice(selectedInvoiceId);

  const selectedInvoice = Array.isArray(selectedInvoiceData)
    ? selectedInvoiceData[0]
    : selectedInvoiceData;

  const billing = selectedInvoice?.cus_details || {};
  const invoiceProducts = selectedInvoice?.invoiceProducts || [];

  //Subtotal and total calculation
  const subTotal = invoiceProducts.reduce(
    (total, product) => total + parseInt(product.price * product.quantity),
    0,
  );
  const vat = subTotal * 0.15;
  const shippingFee = 80;
  const grandTotal = parseInt(subTotal + vat + shippingFee);

  //Handle download csv
  const handleDownload = async () => {
    try {
      const { data } = await exportOrders();
      const csvBlob =
        data instanceof Blob
          ? data
          : new Blob([data], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "order.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle view invoice function
  const handleViewInvoice = (id) => {
    setSelectedInvoiceId(id);
  };

  //Handle delivery status update
  const handleUpdateOrder = async (_id, user_id, delivery_status) => {
    await updateOrderMutation.mutateAsync({
      _id,
      user_id,
      delivery_status,
    });
  };

  //Handle page change function
  const handlePageChange = ({ selected }) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", selected + 1);

      return params;
    });
  };

  //Amount to words converstion
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Taka",
        plural: "Taka",
        symbol: "Tk.",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paisa",
          symbol: "",
        },
      },
    },
  });

  //Print invoice Section
  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);
  const componentRef = useRef(null);
  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
    copyStyles: true, // 👈 copies styles from your app into print iframe
    pageStyle: `
    @page {
      size: A4;
      margin: 4mm;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      font-family: Arial, sans-serif;
      padding: 0px;
    }
    table {
      border-collapse: collapse !important;
      width: 100%;
    }
    th, td {
      border: 1px solid #ccc !important;
      padding: 6px !important;
    }
  `,
  });

  return (
    <div className="dashboard-body__content">
      {/* ========================= Statement section start =========================== */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label fw-semibold">From Date</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">To Date</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="col-md-3 text-center">
            <button
              onClick={handleDownload}
              className="btn d-block btn-primary px-4 mt-2"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
      <div className="row gy-4">
        <div className="col-12">
          <div className="card common-card border border-gray-five">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table text-body mt--24">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer name</th>
                      <th>Order ID</th>
                      <th>Payment status</th>
                      <th>Deliver status</th>
                      <th>Deliver Action</th>
                      <th>Total Payable</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.length === 0 && <tr>No Data Found</tr>}
                    {allOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{formatDate(order?.createdAt)}</td>
                        <td>{order?.cus_details?.[0]?.name}</td>

                        <td>
                          <span>{order?._id}</span>
                        </td>
                        <td>
                          <span
                            className={`badge text-capitalize rounded-pill ${order?.payment_status === "paid" ? "bg-success" : "bg-danger"}`}
                          >
                            {order?.payment_status}
                          </span>{" "}
                        </td>
                        <td>
                          <span
                            className={`badge text-capitalize rounded-pill ${order?.delivery_status === "delivered" ? "bg-success" : order?.delivery_status === "cancelled" ? "bg-danger" : "bg-warning"}`}
                          >
                            {order?.delivery_status}
                          </span>
                        </td>
                        <td>
                          <button>
                            <select
                              onChange={(e) =>
                                handleUpdateOrder(
                                  order?._id,
                                  order?.user_id,
                                  e.target.value,
                                )
                              }
                              className=" common-input border custom"
                              defaultValue={order?.delivery_status}
                            >
                              <option value={"pending"}>Pending</option>
                              <option value={"delivered"}>Delivered</option>
                              <option value={"cancelled"}>Cancel</option>
                            </select>
                          </button>
                        </td>

                        <td>
                          <p>{order?.payableAmount}</p>
                        </td>
                        <td>
                          <button
                            onClick={() => handleViewInvoice(order?._id)}
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target={`#exampleModal_1`}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flx-between justify-content-end gap-2">
                <nav aria-label="Page navigation example">
                  <div>
                    {allOrders.length > 0 && (
                      <Paginate
                        handelPageClick={handlePageChange}
                        page_no={page}
                        per_page={limit}
                        totalCount={totalCount}
                      />
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========================= Statement section End =========================== */}

      {/*  */}
      <>
        <div
          className="modal fade order_item"
          id={`exampleModal_1`}
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title fs-5" id="exampleModalLabel">
                  Super Admin Invoice View
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
                      <div className="container my-5">
                        {/* Invoice Content */}
                        <div
                          className="p-5 bg-white"
                          id="invoice"
                          ref={componentRef}
                        >
                          {/* Header */}
                          <div className="row mb-4 border-bottom pb-3">
                            <div className="col-sm-6">
                              <h2 className="fw-bold">INVOICE</h2>
                              <p className="mb-0">
                                #INV no: {selectedInvoice?._id}
                              </p>
                              <p className="mb-0">
                                #TRA no: {selectedInvoice?.tran_id}
                              </p>
                              <small>
                                {formatDate(selectedInvoice?.createdAt)}
                              </small>
                            </div>
                            <div className="col-sm-6 text-end">
                              <h5 className="fw-bold">PixBO</h5>
                              <p className="mb-0">123 Street, Dhaka</p>
                              <p className="mb-0">support@pixbo.com</p>
                              <p className="mb-0">+880 1234 567 890</p>
                            </div>
                          </div>

                          {/* Billing Details */}
                          <div className="row mb-4">
                            <div className="col-sm-6">
                              <h6 className="fw-bold">Bill To:</h6>
                              <p className="mb-0">{billing?.name}</p>

                              <p className="mb-0">{billing?.email}</p>
                              <p className="mb-0">{billing?.phone}</p>
                              <p className="mb-0">{billing?.address}</p>
                            </div>
                            <div className="col-sm-6 text-end">
                              <h6 className="fw-bold">Payment information: </h6>
                              <p className="mb-1">
                                Payment Status:{" "}
                                <span
                                  className={`fw-bold  text-capitalize ${selectedInvoice?.payment_status === "paid" ? "text-success" : selectedInvoice?.payment_status === "pending" ? "text-warning" : "text-danger"}`}
                                >
                                  {selectedInvoice?.payment_status}
                                </span>
                              </p>
                              <p className="mb-1">
                                Deliver Status:{" "}
                                <span
                                  className={`fw-bold text-capitalize ${selectedInvoice?.delivery_status === "pending" ? "text-warning" : selectedInvoice?.delivery_status === "delivered" ? "text-success" : "text-danger"}`}
                                >
                                  {selectedInvoice?.delivery_status}
                                </span>
                              </p>
                              <p className="mb-0">
                                Total payable:{" "}
                                <span className="fw-bold text-uppercase">
                                  {parseInt(selectedInvoice?.payableAmount)} tk.
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Table */}
                          <div className="table-responsive invoice mb-4">
                            <table className="table  align-middle">
                              <thead className="table-light">
                                <tr>
                                  <th>Product</th>
                                  <th className="text-center">Color</th>
                                  <th className="text-center">Size</th>
                                  <th className="text-center">Quantity</th>
                                  <th className="text-center">Price</th>
                                  <th className="text-end">Total</th>
                                </tr>
                              </thead>
                              <tbody className="text-dark">
                                {invoiceProducts?.map((product, index) => (
                                  <tr key={index}>
                                    <td className="text-start">
                                      {product?.product_name}
                                    </td>

                                    <td>{product?.color}</td>
                                    <td>{product?.size}</td>
                                    <td>{product?.quantity}</td>
                                    <td>{product?.price} Tk.</td>
                                    <td className="text-end">
                                      {parseInt(
                                        product?.price * product?.quantity,
                                      )}{" "}
                                      Tk.
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Summary */}
                          <div className="row justify-content-end">
                            <div className="col-8">
                              <p className="text-danger small fst-italic">
                                {toWords.convert(Number(grandTotal || 0))}
                              </p>
                            </div>
                            <div className="col-4">
                              <ul className="list-unstyled">
                                <li className="d-flex justify-content-between mb-2">
                                  <span>Subtotal:</span>{" "}
                                  <span>{subTotal} Tk.</span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                  <span>Vat (15%):</span>{" "}
                                  <span>{vat.toFixed(2)} Tk.</span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                  <span>Shipping cost:</span>{" "}
                                  <span>{shippingFee} Tk.</span>
                                </li>
                                <li className="d-flex justify-content-between border-top pt-2 fw-bold">
                                  <span>Total:</span>{" "}
                                  <span>{grandTotal} Tk.</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="text-center mt-5 text-muted small">
                            <p className="mb-1">Thank you for your purchase!</p>
                            <p>
                              This invoice was generated electronically and is
                              valid without a signature.
                            </p>
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
                  onClick={printFn}
                  type="button"
                  className="btn btn-primary"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AllOrders;
