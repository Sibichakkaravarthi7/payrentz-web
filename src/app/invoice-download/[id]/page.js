"use client";
import { PayrentzLogo, PayrentzWhiteLogo } from "@/Icons";
import { GET_DOWNLOAD_INVOICE } from "@/api/urls/urls";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import { formatDateDMY } from "@/utils/Constants";
import makeGetRequest from "@/utils/makeGetRequest";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";

const Page = ({ params }) => {
  // console.log("params", params);

  const {
    data: invoiceData,
    isLoading,
    refetch,
  } = useQuery([], () => makeGetRequest(GET_DOWNLOAD_INVOICE(params?.id), {}), {
    onSuccess: (res) => {},
    onError: (err) => {
      console.log(err);
    },
  });

  const userDetails = invoiceData?.data?.details;

  const reportTemplateRef = useRef(null);
  const data = {
    invoiceTitle: "Monthly Rental Invoice",
    customerName: userDetails?.customer_name,
    floor_no: userDetails?.floor_no,
    address_line1: userDetails?.address_line1,
    address_line2: userDetails?.address_line2,
    phone_number: userDetails?.phone_number,
    email: userDetails?.email,
    payrentz_id: userDetails?.customer_id,
    invoiceId: userDetails?.invoice_id,
    invoiceDate: userDetails?.invoice_created,
    invoicePeriod: userDetails?.invoice_month,
    dueDate: "06 July 2023",
    status: userDetails?.payment_status,
    paymentMode: "---",
    amount: userDetails?.amount,
    invoiceType: userDetails?.invoice_type,
    subType: userDetails?.type,
  };

  // console.log("invoice type", userDetails, userDetails?.type);

  const getTitle = (invoiceType, isPaid = false) => {
    if (invoiceType == "Receipt") return "Receipt";
    if (invoiceType == "Invoice") return "Invoice";
  };

  const getTotal = ({
    deposit,
    handling_charge,
    unit,
    isAccessory = false,
    total = 0,
  }) => {
    // console.log("check", deposit, handling_charge, unit, total);
    if (isAccessory) return parseInt(total);
    return (parseInt(deposit) + parseInt(handling_charge)) * parseInt(unit);
  };

  // const tableKeys = Object.keys(invoiceData?.data?.table_meta || {});
  // const tableHeader = Object.Values(invoiceData?.data?.table_meta || {});

  // console.log("tableHeader",tableHeader)

  const totalAccAmt = 0;
  //  invoiceData?.data?.details?.product_details
  //   ?.filter((f) => f?.type == "accessory")
  //   ?.reduce((acc, item) => acc + parseInt(item?.total), 0);

  const otherInvoiceType = [
    "receipt",
    "debit_invoice",
    "rent_invoice",
    "refund_invoice",
  ];
  const isOtherInvoice = otherInvoiceType?.includes(userDetails?.type);

  // console.log("is other invoice", isOtherInvoice);
  // console.log(invoiceData?.data?.table_meta);
  // console.log(userDetails?.invoice_type);
  return (
    <div
      style={{ background: "#dddddd", paddingBottom: "40px" }}
      className="pdf_container normal-variant-numeric"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          maxWidth: "1000px",
          margin: "auto",
          padding: "10px",
        }}
      >
        <AppButton
          variant={"red"}
          isLoading={isLoading}
          onClick={() => window.print()}
          text={"Download"}
          className={"printPdfbtn !text-[14px] !py-[6px]"}
        />
      </div>
      <LoaderLayout height={75} isLoading={isLoading}>
        <div
          ref={reportTemplateRef}
          className="pdf_page"
          style={{
            width: "100%",
            maxWidth: "1000px",
            padding: "40px 25px",
            paddingBottom: "50px",
            margin: "auto",
            maxHeight: "1400px",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#2b5cab",
                  paddingBottom: "10px",
                }}
              >
                {getTitle(
                  userDetails?.invoice_type,
                  userDetails?.payment_status?.toLowerCase() == "paid"
                )}
              </p>
            </div>
            <AppImage
              className="self-start"
              src={PayrentzLogo}
              alt={"logo"}
              loading="lazy"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                }}
              >
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >{` ${data.customerName}`}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",

                  maxWidth: "80%",
                }}
              >
                <p style={{ fontWeight: 500 }}>{`${data?.address_line1}`}</p>
                <p style={{ fontWeight: 500 }}>{`${data?.address_line2}`}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  paddingBottom: "10px",
                }}
              >
                <p
                  style={{ fontWeight: 500, minWidth: "130px" }}
                >{`Mobile Number`}</p>
                <p>{`:  ${data?.phone_number}`}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  paddingBottom: "10px",
                }}
              >
                <p style={{ fontWeight: 500, minWidth: "130px" }}>{`Email`}</p>
                <p>{`:  ${data?.email}`}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  paddingBottom: "10px",
                }}
              >
                <p
                  style={{ fontWeight: 500, minWidth: "130px" }}
                >{`Customer ID `}</p>
                <p>{`:  ${data?.payrentz_id}`}</p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <p style={{ fontWeight: 500 }}>
                {userDetails?.invoice_type == "Receipt"
                  ? `Receipt No`
                  : `Invoice No`}
              </p>
              <p style={{ fontWeight: 600, fontSize: "13px" }}>
                {`: ${data?.invoiceId}`}
              </p>
              <p style={{ fontWeight: 500 }}>
                {userDetails?.invoice_type == "Receipt"
                  ? `Receipt Date`
                  : `Invoice Date`}
              </p>
              <p>{`: ${data?.invoiceDate}`}</p>

              {/* <p style={{ fontWeight: 500 }}>{`Invoice Period:`}</p>
              <p>{data?.invoicePeriod}</p> */}
              {/* <p>{`Due Date:`}</p>
              <p>{data?.dueDate}</p> */}

              <p style={{ fontWeight: 500 }}>
                {userDetails?.invoice_type == "Receipt"
                  ? `Receipt Type`
                  : `Invoice Type`}
              </p>
              <p
                style={{ textTransform: "capitalize" }}
              >{`: ${userDetails?.type?.replace("_", " ")}`}</p>
              {userDetails?.type != "handling_charge" &&
                userDetails?.due_date && (
                  <>
                    <p
                      style={{ fontWeight: 500, minWidth: "130px" }}
                    >{`Due Date`}</p>
                    <span>{`: ${formatDateDMY(
                      userDetails?.due_date?.split("T")?.[0]
                    )}`}</span>
                  </>
                )}
              {userDetails?.paid_on && (
                <>
                  <p style={{ fontWeight: 500 }}>{`Paid On `}</p>
                  <span>{`: ${formatDateDMY(
                    userDetails?.paid_on?.split("T")?.[0]
                  )}`}</span>
                </>
              )}
              <p style={{ fontWeight: 500 }}>
                {userDetails?.invoice_type == "Receipt"
                  ? `Receipt Amount`
                  : `Invoice Amount`}
              </p>

              <span
                style={{ fontSize: "18px", fontWeight: 600 }}
              >{`:  ₹ ${data?.amount}`}</span>
              <p style={{ fontWeight: 500, minWidth: "130px" }}>{`Status`}</p>
              <span
                style={{
                  color: data?.status == "Paid" ? "green" : "red",
                  fontWeight: 600,
                }}
              >
                {`: ${data?.status}`}
              </span>
            </div>
          </div>

          {/* <div
            style={{
              borderRadius: "5px",
              background: "#f3f7ff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "3rem",
              margin: "30px 0px",
              padding: "20px 10px",
              fontSize: "12px",
              border: "1px solid #dddddd",
            }}
          >
            <div>
              <p style={{ color: "#2b5cab", fontWeight: 600 }}>Pending Dues</p>
              <p style={{ color: "#2d2d2d", fontWeight: 500 }}>₹ 0</p>
            </div>
            <div>
              <p style={{ color: "#2b5cab", fontWeight: 600 }}></p>
              <p
                style={{
                  color: "#2d2d2d",
                  fontWeight: 500,
                  fontSize: "25px",
                }}
              >
                +
              </p>
            </div>
            <div>
              <p style={{ color: "#2b5cab", fontWeight: 600 }}>
                Charges for this Month
              </p>
              <p style={{ color: "#2d2d2d", fontWeight: 500 }}>
                ₹ {userDetails?.amount}
              </p>
            </div>
            <div>
              <p style={{ color: "#2b5cab", fontWeight: 600 }}></p>
              <p
                style={{
                  color: "#2d2d2d",
                  fontWeight: 500,
                  fontSize: "25px",
                }}
              >
                =
              </p>
            </div>
            <div>
              <p style={{ color: "#2b5cab", fontWeight: 600 }}>
                Amount Payable
              </p>
              <p style={{ color: "#2d2d2d", fontWeight: 500 }}>
                ₹ {userDetails?.amount}
              </p>
            </div>
            <div>
              <p style={{ color: "#2b5cab", fontWeight: 600 }}>
                Amount After Due Date (06Jul)
              </p>
              <p style={{ color: "#2d2d2d", fontWeight: 500 }}>
                ₹ {userDetails?.amount}
              </p>
            </div>
            <div>
              <p className="charges"></p>
              <p style={{ color: "#2d2d2d", fontWeight: 500 }}></p>
            </div>
          </div> */}

          <h2
            style={{
              color: "#2b5cab",
              fontWeight: 600,
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            Current Summary
          </h2>
          <table
            style={{
              width: "100%",
              border: "1px solid #dddddd",
              borderCollapse: "collapse",
            }}
          >
            <tr
              style={{ borderBottom: "1px solid #dddddd", fontSize: "14px" }}
              className=""
            >
              <th style={{ padding: "10px" }}>S.No</th>
              {Object?.values(invoiceData?.data?.table_meta || [])?.map(
                (h, ind) => (
                  <>
                    {/* <>
                      {ind == 1 && !isOtherInvoice ? (
                        <th style={{ padding: "10px" }}>SAC Code</th>
                      ) : null}
                    </> */}
                    <th
                      style={{
                        padding: "10px",
                        textAlign:
                          h == "Particulars" ||
                          h == "Product" ||
                          h == "Description"
                            ? "left"
                            : "center",
                      }}
                      key={ind}
                    >
                      {h}
                    </th>
                  </>
                )
              )}
              {/* {userDetails?.invoice_type == "buy_invoice" ? (
                <th style={{ padding: "10px" }}>Total(₹)</th>
              ) : null} */}
            </tr>
            <tbody
              style={{
                fontSize: "14px",
                fontFamily: "sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {invoiceData?.data?.details?.product_details?.map((m, ind) => (
                <tr style={{ textAlign: "center" }} key={ind}>
                  <td style={{ padding: "10px" }}>{ind + 1}</td>
                  {Object.keys(invoiceData?.data?.table_meta || {})?.map(
                    (k, metaIndex) => (
                      <td
                        style={{
                          padding: "10px",
                          paddingRight:
                            userDetails?.type != "debit_invoice" &&
                            k == "amount"
                              ? "45px"
                              : "10px",
                          textAlign:
                            userDetails?.type === "debit_invoice"
                              ? "center"
                              : k === "product_desc" || k === "product"
                              ? "left"
                              : k === "amount"
                              ? "right"
                              : "center",
                          maxWidth: "190px",
                        }}
                        key={metaIndex}
                      >
                        {typeof m?.[k] === "object" && m?.[k] !== null
                          ? m?.[k]?.label || JSON.stringify(m?.[k])
                          : m?.[k] ?? "-"}
                      </td>
                    )
                  )}
                  {/* {userDetails?.invoice_type == "buy_invoice" ? (
                    <td style={{ padding: "10px" }}>
                      {getTotal({
                        deposit: m?.deposit,
                        unit: m?.quantity,
                        handling_charge: m?.handling_charge,
                        isAccessory: m?.type == "accessory",
                        total: m?.total,
                      })}
                    </td>
                  ) : null} */}
                </tr>
              ))}
              {userDetails?.lifting_charge > 0 &&
              userDetails?.type == "receipt" &&
              invoiceData?.data?.table_meta?.handling_charge ? (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <td style={{ textAlign: "right", padding: "10px" }}>
                    Lifting Charge (₹)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.lifting_charge}
                  </td>
                </tr>
              ) : null}
              {userDetails?.distance_charge > 0 &&
              userDetails?.type == "receipt" &&
              invoiceData?.data?.table_meta?.handling_charge ? (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <td style={{ textAlign: "right", padding: "10px" }}>
                    Distance Charge (₹)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.distance_charge}
                  </td>
                </tr>
              ) : null}
              {userDetails?.type == "sale_invoice" ||
              userDetails?.type == "service_invoice" ||
              userDetails?.type == "other_invoice" ||
              userDetails?.type == "handling_charge" ? (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  <th></th>
                  <th></th>
                  <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    Sub Total (₹)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.total_price}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}></td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.total_cgst_amount}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.total_sgst_amount}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "10px",
                      paddingRight:
                        userDetails?.type != "debit_invoice" ? "45px" : "10px",
                    }}
                  >
                    {userDetails?.sub_total}
                  </td>
                </tr>
              ) : userDetails?.type == "rent_invoice" ? (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  <th></th>
                  <th></th>
                  <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    Sub Total (₹)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.total_rent}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}></td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.total_cgst_amount}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.total_sgst_amount}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.sub_total}
                  </td>
                </tr>
              ) : userDetails?.invoice_type == "Receipt" ||
                userDetails?.type == "debit_invoice" ? (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  {invoiceData?.data?.table_meta?.refundable_amount ? (
                    <th></th>
                  ) : null}
                  {invoiceData?.data?.table_meta?.handling_charge ? (
                    <th></th>
                  ) : null}
                  {invoiceData?.data?.table_meta?.handling_charge ? (
                    <th></th>
                  ) : null}
                  {invoiceData?.data?.table_meta?.handling_charge ? (
                    <th></th>
                  ) : null}
                  <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    Sub Total (₹)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.amount}
                  </td>
                </tr>
              ) : (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  {userDetails?.type == "refund_invoice" ? null : <th></th>}

                  {userDetails?.type == "refund_invoice" ? null : <th></th>}

                  {/* {userDetails?.type == "buy_invoice" ? (
                  <th style={{ textAlign: "right", paddingRight: "20px" }}></th>
                ) : null} */}
                  {userDetails?.type == "refund_invoice" ? null : <th></th>}
                  {userDetails?.type == "buy_invoice" ? null : <th></th>}
                  {userDetails?.type == "deposit_invoice" ? null : <th></th>}
                  {/* {["service_invoice", "other_invoice"]?.includes(
                  userDetails?.invoice_type
                ) ? (
                  <th></th>
                ) : null} */}
                  <td style={{ textAlign: "right", paddingRight: "20px" }}>
                    Sub Total (₹)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {userDetails?.sub_total || userDetails?.total_amount}
                  </td>
                </tr>
              )}
              {userDetails?.type == "receipt" ||
              userDetails?.type == "debit_invoice" ? (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  {invoiceData?.data?.table_meta?.refundable_amount ? (
                    <th></th>
                  ) : null}
                  {invoiceData?.data?.table_meta?.handling_charge ? (
                    <th></th>
                  ) : null}
                  {invoiceData?.data?.table_meta?.handling_charge ? (
                    <th></th>
                  ) : null}
                  {invoiceData?.data?.table_meta?.handling_charge ? (
                    <th></th>
                  ) : null}
                  <th style={{ textAlign: "right", padding: "10px 0" }}>
                    Grand Total (₹)
                  </th>
                  <th
                    style={{
                      textAlign: invoiceData?.data?.table_meta?.total_deposit
                        ? "center"
                        : "right",
                      padding: "10px ",
                      paddingRight: invoiceData?.data?.table_meta?.total_deposit
                        ? "10px"
                        : "45px",
                    }}
                  >
                    {userDetails?.amount}
                  </th>
                </tr>
              ) : (
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>

                  {userDetails?.type == "rent_invoice" ? null : <th></th>}
                  {userDetails?.type == "rent_invoice" ? <th></th> : null}
                  {userDetails?.type == "rent_invoice" ? <th></th> : null}
                  {userDetails?.type == "rent_invoice" ? <th></th> : null}
                  {userDetails?.type == "rent_invoice" ? null : <th></th>}
                  {userDetails?.type == "rent_invoice" ? null : <th></th>}

                  <th style={{ textAlign: "right", padding: "10px 0" }}>
                    Grand Total (₹)
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "10px ",
                      paddingRight:
                        userDetails?.type == "rent_invoice" ? "55px" : "45px",
                    }}
                  >
                    {userDetails?.total_amount}
                  </th>
                </tr>
              )}
            </tbody>
          </table>

          <p style={{ textAlign: "center", marginTop: "17px" }}>
            <span
              style={{
                color: "#2b5cab",

                textTransform: "capitalize",
              }}
            >{`Rupees ${userDetails?.amount_in_word} Only`}</span>
          </p>

          <footer
            className="print-footer"
            style={{
              fontWeight: 500,
              position: "fixed",
              bottom: "0px",
              right: "0px",
              left: "0px",
            }}
          >
            <div
              style={{
                borderTop: "1px solid #dddddd",
                padding: "20px 0px",
                maxWidth: "1000px",
                margin: "auto",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  maxWidth: "500px",
                  margin: "auto",
                  textAlign: "center",
                  padding: "0 10px",
                }}
              >
                <p
                  style={{
                    color: "#2b5cab",
                    fontSize: "16px",
                    marginBottom: "20px",
                  }}
                >
                  No: 14/20, Ground Floor, Mahalakshmi Street, Gandhi Road,
                  Velachery, Chennai- 600042
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxWidth: "800px",
                  margin: "auto",
                  marginTop: "20px",
                  padding: "0 10px",
                  gap: "20px",
                }}
              >
                {/* Left Side (Mobile & CIN No.) */}
                <div style={{ flex: 1, minWidth: "250px", textAlign: "left" }}>
                  <p className="footer-links">Mobile: +91 89395 81818</p>
                  <p className="footer-links">CIN No: U71309TN2016PTC113411</p>
                </div>

                {/* Right Side (Email & GSTIN) */}
                <div style={{ flex: 1, minWidth: "250px", textAlign: "right" }}>
                  <p className="footer-links">Email: rent@payrentz.com</p>
                  <p className="footer-links">GSTIN: 33AAICP8598H1ZT</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </LoaderLayout>
    </div>
  );
};

export default Page;
