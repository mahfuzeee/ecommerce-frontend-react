import { useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ToWords } from "to-words";
import Paginate from "../helper/Paginate";
import { useSearchParams } from "react-router-dom";
import { useAllInvoice, useSingleInvoice } from "../hooks/useInvoice";
import { formatDate } from "../helper/helper";

const DashboardOrder = () => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;
  const { data, isLoading } = useAllInvoice();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const invoiceData = Array.isArray(data) ? data[0] : data;
  const allInvoice = invoiceData?.invoices || [];
  const totalCount = invoiceData?.totalCount?.[0]?.count || 0;

  const { data: selectedInvoiceData, isLoading: isInvoiceLoading } =
    useSingleInvoice(selectedInvoiceId);

  const selectedInvoice = Array.isArray(selectedInvoiceData)
    ? selectedInvoiceData[0]
    : selectedInvoiceData;

  const billing = selectedInvoice?.cus_details || {};
  const shipping = selectedInvoice?.ship_details || {};
  const invoiceProducts = selectedInvoice?.invoiceProducts || [];

  const subTotal = invoiceProducts.reduce(
    (total, product) => total + parseInt(product.price * product.quantity),
    0,
  );
  const vat = subTotal * 0.15;
  const shippingFee = 80;
  const grandTotal = subTotal + vat + shippingFee;

  const componentRef = useRef(null);

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Invoice",
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

  return (
    <div className="dashboard-body__content">
      {/* ========================= Statement section start =========================== */}
      <div className="row gy-4">
        <div className="col-12">
          <div className="card common-card border border-gray-five">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table text-body mt--24">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction ID</th>
                      <th>Order ID</th>
                      <th>Deliver status</th>
                      <th>Payment status</th>
                      <th>Total Payable</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInvoice.length === 0 ? (
                      <tr>
                        <td>No data found</td>
                      </tr>
                    ) : (
                      allInvoice.map((item, index) => (
                        <tr key={index}>
                          <td>{formatDate(item.createdAt)}</td>
                          <td>{item?.tran_id}</td>
                          <td>
                            <span>{item?._id}</span>
                          </td>
                          <td>
                            <span
                              className={`badge rounded-pill ${item?.delivery_status === "delivered" ? "bg-success" : item.delivery_status === "pending" ? "bg-warning" : "bg-danger"}`}
                            >
                              {item?.delivery_status}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge rounded-pill ${item?.payment_status === "paid" ? "bg-success" : item.payment_status === "pending" ? "bg-warning" : "bg-danger"}`}
                            >
                              {item?.payment_status}
                            </span>{" "}
                          </td>
                          <td>
                            <p>{item?.payableAmount}</p>
                          </td>
                          <td>
                            <button
                              onClick={() => setSelectedInvoiceId(item?._id)}
                              className="btn btn-success"
                              data-bs-toggle="modal"
                              data-bs-target={`#exampleModal_1`}
                            >
                              View order
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flx-between justify-content-end gap-2">
                <nav aria-label="Page navigation example">
                  <Paginate
                    page_no={page}
                    per_page={limit}
                    totalCount={totalCount}
                  />
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
                      <div ref={componentRef} className="container my-5">
                        {/* Invoice Content */}
                        {isInvoiceLoading ? (
                          <div className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-5 bg-white">
                            {/* Header */}
                            <div className="row mb-4 border-bottom pb-3">
                              <div className="col-sm-6">
                                <h2 className="fw-bold">INVOICE</h2>
                                <p className="mb-0">
                                  #INV no: {selectedInvoice?._id || "N/A"}
                                </p>
                                <p className="mb-0">
                                  #TRA no: {selectedInvoice?.tran_id}
                                </p>
                                <small>
                                  Date:{" "}
                                  {selectedInvoice
                                    ? formatDate(selectedInvoice.createdAt)
                                    : "N/A"}
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
                                <p className="mb-0">{billing?.name || "N/A"}</p>
                                <p className="mb-0">
                                  {billing?.email || "N/A"}
                                </p>
                                <p className="mb-0">
                                  {billing?.phone || "N/A"}
                                </p>
                                <p className="mb-0">
                                  {billing?.address || "N/A"}
                                </p>
                                <p className="mb-0">
                                  {billing?.city || ""},{" "}
                                  {billing?.country || ""}
                                </p>
                              </div>
                              <div className="col-sm-6 text-end">
                                <h6 className="fw-bold">
                                  Payment information:{" "}
                                </h6>
                                <p className="mb-1">
                                  Payment Status:{" "}
                                  <span
                                    className={`fw-bold text-uppercase ${selectedInvoice?.payment_status === "paid" ? "text-success" : selectedInvoice?.payment_status === "pending" ? "text-warning" : "text-danger"}`}
                                  >
                                    {selectedInvoice?.payment_status || "N/A"}
                                  </span>
                                </p>
                                <p className="mb-1">
                                  Deliver Status:{" "}
                                  <span
                                    className={`fw-bold text-uppercase ${selectedInvoice?.delivery_status === "delivered" ? "text-success" : selectedInvoice?.delivery_status === "pending" ? "text-warning" : "text-danger"}`}
                                  >
                                    {selectedInvoice?.delivery_status || "N/A"}
                                  </span>
                                </p>
                                <p className="mb-0">
                                  Total payable:{" "}
                                  <span className="fw-bold text-uppercase">
                                    {selectedInvoice?.payableAmount
                                      ? `${selectedInvoice.payableAmount} Tk.`
                                      : "N/A"}
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
                                  {invoiceProducts.map((product, index) => (
                                    <tr key={index}>
                                      <td className="text-start">
                                        {product?.product_name}
                                      </td>

                                      <td>{product?.color}</td>
                                      <td>{product?.size}</td>
                                      <td>{product?.quantity}</td>
                                      <td>{product?.price} Tk.</td>
                                      <td className="text-end">
                                        {(
                                          product?.price * product?.quantity
                                        ).toFixed(2)}{" "}
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
                                  {toWords.convert(
                                    Number(selectedInvoice?.payableAmount || 0),
                                  )}
                                </p>
                              </div>
                              <div className="col-4">
                                <ul className="list-unstyled">
                                  <li className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>{" "}
                                    <span>
                                      {subTotal ? `${subTotal} Tk.` : "N/A"}
                                    </span>
                                  </li>
                                  <li className="d-flex justify-content-between mb-2">
                                    <span>Vat (15%):</span>{" "}
                                    <span>
                                      {vat ? `${vat.toFixed(2)} Tk.` : "N/A"}
                                    </span>
                                  </li>
                                  <li className="d-flex justify-content-between mb-2">
                                    <span>Shipping cost:</span>{" "}
                                    <span>
                                      {shippingFee
                                        ? `${shippingFee} Tk.`
                                        : "N/A"}
                                    </span>
                                  </li>
                                  <li className="d-flex justify-content-between border-top pt-2 fw-bold">
                                    <span>Total:</span>{" "}
                                    <span>
                                      {grandTotal
                                        ? `${parseInt(grandTotal)} Tk.`
                                        : "N/A"}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center mt-5 text-muted small">
                              <p className="mb-1">
                                Thank you for your purchase!
                              </p>
                              <p>
                                This invoice was generated electronically and is
                                valid without a signature.
                              </p>
                            </div>
                          </div>
                        )}
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

export default DashboardOrder;
