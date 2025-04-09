"use client";

import Text from "@/components/Text/Text";
import React, { useCallback, useEffect, useState } from "react";
import InvoiceTable from "../InvoiceTable";
import { useMutation, useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import {
  GET_USER_DEPOSIT,
  GET_USER_INVOICES,
  GET_USER_LEDGER,
  GET_USER_RECENT_INVOICES,
} from "@/api/urls/urls";
import UserInvoiceListFilters from "./UserInvoiceListFilters";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import UserLedgerListFilter from "@/components/Dashboard/Invoices/UserLedgerListFilter";
import {
  SET_INVOICE_DOWNLOAD_PAGE,
  convertToPrice,
  formatDate,
} from "@/utils/Constants";
import useInvoicePayment from "@/utils/hooks/useInvoicePayment";
import InvoicePaymentCard from "./InvoicePaymentCard";
import MobileTicketTable from "./MobileInvoicesTable";
import MobileInvoicesTable from "./MobileInvoicesTable";
import MobileLedgersTable from "./MobileLedgersTable";
import AppImage from "@/components/Image/AppImage";
import { NoInvoice, NoInvoices } from "@/Icons";
import { useSearchParams } from "next/navigation";
import UserReceiptListFilters from "./UserReceiptListFilters";

function Invoices() {
  const [tab, setTab] = useState("invoice");
  const [isLedger, setIsLedger] = useState(false);
  const [page, setPage] = useState(1);
  const [ledgerPage, setLedgerPage] = useState(1);
  const [filter, setFilter] = useState({
    is_paid: undefined,
    sort: undefined,
  });
  const [invoiceDownloading, setInvoiceDownloading] = useState();
  const [minToDate, setMinToDate] = useState("");
  const [maxToDate, setMaxToDate] = useState("");

  const { isLoading, triggerPayment } = useInvoicePayment();

  const searchParams = useSearchParams();
  const is_email = searchParams.get("key");

  // console.log("user_token", user_token);
  // console.log("is_email", is_email);

  // console.log("from date", minToDate);
  // console.log("to date", maxToDate);

  const { data: invoiceData, isLoading: invoiceDataIsLoading } = useQuery(
    [GET_USER_RECENT_INVOICES],
    () => makeGetRequest(GET_USER_RECENT_INVOICES, {}),
    {
      onSuccess: (res) => {
        // console.log("invoice data", res);
        setTimeout(() => {
          if (res?.data?.data?.length > 0 && is_email) {
            console.log("yes");
            triggerPayment();
          }
          // else {
          //   console.log("user_token", user_token);
          //   console.log("is_email", is_email);
          // }
        }, 500);
      },
    }
  );

  const { data: invoiceList, isLoading: invoiceIsLoading } = useQuery(
    [GET_USER_INVOICES, tab, filter, page],
    () =>
      makeGetRequest(GET_USER_INVOICES, {
        [tab == "receipt" || tab == "invoice" ? "invoice_type" : "type"]: tab,
        is_paid: filter?.is_paid,
        page,
      }),
    {
      onSuccess: (res) => {
        console.log("Invoice data", res);
      },
      enabled: tab == "ledger" ? false : true,
    }
  );

  const { data: ledgerList, isLoading: ledgerIsLoading } = useQuery(
    [GET_USER_LEDGER, filter, ledgerPage, minToDate, maxToDate],
    () =>
      makeGetRequest(GET_USER_LEDGER, {
        type: filter?.ledgerType?.value,
        page: ledgerPage,
        created__date__gte: minToDate,
        created__date__lte: maxToDate,
      }),
    {
      onSuccess: (res) => {
        console.log("Ledger data", res);
      },
      enabled: isLedger,
    }
  );

  const { data: depositData, isLoading: depositIsLoading } = useQuery(
    [GET_USER_DEPOSIT],
    () => makeGetRequest(GET_USER_DEPOSIT),
    {
      onSuccess: (res) => {
        console.log("Deposit data", res);
      },
      enabled: isLedger,
    }
  );

  const handleClick = (type) => {
    if (type?.toLowerCase() == "ledger") setIsLedger(true);

    setTab(type);
  };

  // const handleDownloadInvoice = (uuid) => {
  //   axios
  //     .get(getHostAPIUrl() + GET_DOWNLOAD_INVOICE(uuid), {
  //       responseType: "arraybuffer",
  //       headers: {
  //         Authorization: `Token ${userToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setInvoiceDownloading({});
  //       toast.success("Downloaded");
  //       const blob = new Blob([response.data], {
  //         type: "application/pdf",
  //       });

  //       const downloadUrl = URL.createObjectURL(blob);

  //       const link = document.createElement("a");
  //       link.href = downloadUrl;
  //       link.download = "invoice.pdf";
  //       link.click();
  //       // onClose();
  //     })
  //     .catch((error) => {
  //       toast.error("Error downloading invoice");
  //       console.error("Error fetching invoice data:", error);
  //       setInvoiceDownloading({});
  //     });
  // };

  const handleInvoiceDownloadRedirection = (id) => {
    window.open(SET_INVOICE_DOWNLOAD_PAGE(id));
  };

  const showTag = {
    status: {
      paid: "green",
      unpaid: "red",
    },
    transaction: {
      rent: "green",
    },
    "debit/credit": {
      debit: "red",
      credit: "green",
    },
  };

  const ledgerDetails = [
    {
      s_no: 1,
      date: "30-11-2024",
      type: "discount",
      // id: "INV-265",
      // transaction: "Rent",
      "debit/credit": "Debit",
      amount: 650,
      transaction_id: null,
    },
  ];

  const invoiceDetails = [
    {
      s_no: 1,
      inv_id: "INV20230019",
      inv_date: "30-06-2023",
      // amount: 650,
      pending_amount: 0,
      type: "rent_invoice",
      late_fee: 0,
      total: 1250,
      status: "Paid",
      trans_date: "07-01-2024",
      trans_id: "TN094578",
    },
  ];

  const receiptDetails = [
    {
      s_no: 1,
      inv_id: "INV20230019",
      inv_date: "30-06-2023",
      // amount: 650,
      late_fee: 0,
      type: "receipt",
      total: 1250,
      status: "Paid",
      trans_date: "07-01-2024",
      trans_id: "TN094578",
    },
  ];
  const invoiceTabs = [
    {
      type: "invoice",
      title: "All Invoices",
    },
    {
      type: "receipt",
      title: "All Receipt",
    },
    // {
    //   type: "rent_invoice",
    //   title: "Rent Invoices",
    // },
    // {
    //   type: "buy_invoice",
    //   title: "Buy Invoices",
    // },
    {
      type: "ledger",
      title: "Ledger",
    },
  ];

  const options = [
    {
      label: "Sort By: Latest Month",
      value: "request",
      classes: "appinput-size-for-sm",
    },
  ];

  function getKeysFromData(data) {
    if (!data || data.length === 0) {
      return [];
    }
    const firstItem = data[0];
    const keys = Object.keys(firstItem);

    return keys;
  }

  const allInvoicesHeaders = getKeysFromData(invoiceDetails);
  const allReceiptHeaders = getKeysFromData(receiptDetails);

  const allLedgerHeaders = getKeysFromData(ledgerDetails);

  const handleDownload = (d) => {
    // setInvoiceDownloading(d?.inv_id);
    // handleDownloadInvoice(d?.uuid);
    handleInvoiceDownloadRedirection(d?.uuid);
  };

  useEffect(() => {
    setPage(1);
  }, [filter, tab]);

  // console.log("fffilleterr", filter);

  // console.log("depositData", depositData?.data?.amount < 0);
  // const totalInvoicesAmount = Math.abs(invoiceData?.data?.total);
  const totalInvoicesAmount = invoiceData?.data?.total;

  return (
    <div className="md:pl-[14px]">
      <Text className={"text-[28px] mt-[10px] font-bold mb-[20px]"}>
        Invoices
      </Text>
      <Text className={"font-medium"}>
        View all your invoices and receipts, we encourage you to make the
        payments on time.
      </Text>

      {totalInvoicesAmount && (
        <InvoicePaymentCard
          onClick={() => triggerPayment()}
          invoiceData={invoiceData}
          isLoading={isLoading}
          depositData={depositData}
        />
      )}

      <div className="flex mt-[30px] gap-[40px] border-b-2 cursor-pointer border-[#DBDBDB]">
        {invoiceTabs?.map((item) => (
          <div
            key={item?.type}
            className={`flex gap-1 pb-[10px] ${
              tab == item?.type ? "border-b-[3px] border-[#ED1F28]" : ""
            }`}
            onClick={() => handleClick(item?.type)}
          >
            <Text
              className={`font-normal text-[10px] md:text-[16px] text-[#858585] ${
                tab == item?.type ? "font-semibold text-[#ED1F28]" : ""
              }`}
            >
              {item?.title}
            </Text>
          </div>
        ))}
      </div>

      {tab == "ledger" ? (
        <LoaderLayout isLoading={ledgerIsLoading} height={50}>
          {ledgerDetails?.length ? (
            <>
              <UserLedgerListFilter
                options={options}
                filter={filter}
                setFilter={setFilter}
                minToDate={minToDate}
                maxToDate={maxToDate}
                setMaxToDate={setMaxToDate}
                setMinToDate={setMinToDate}
              />
              <div className="md:hidden pt-[20px]">
                <MobileLedgersTable
                  balance={depositData?.data?.amount}
                  page={ledgerPage}
                  setPage={setLedgerPage}
                  isLedger
                  next={ledgerList?.data?.next}
                  prv={ledgerList?.data?.previous}
                  count={ledgerList?.data?.count}
                  data={ledgerList?.data?.results?.map((m) => ({
                    // s_no: m?.serial_number,
                    // date: formatDate(m?.created),
                    // id: m.invoice_detail?.id,
                    // transaction: m?.invoice_detail?.type?.replaceAll("_", " "),
                    // transaction_id: m?.transaction_id,
                    // amount: convertToPrice(m?.invoice_detail?.amount),
                    // status: m?.type,
                    s_no: m?.serial_number || "-",
                    date: m?.created ? formatDate(m?.created) : "-",
                    transaction_id:
                      m?.invoice_detail?.transaction_id ||
                      m?.transaction_id ||
                      "-",
                    // id: m.invoice_detail?.id,
                    // transaction: m?.invoice_detail?.type?.replaceAll("_", " ") == "buy invoice" ? "Invoice":"Receipt",
                    type: m?.transaction_type,
                    amount: convertToPrice(m?.invoice_detail?.amount) || "-",
                    status: m?.type || "-",
                  }))}
                />
              </div>
              <div className="hidden md:block">
                <InvoiceTable
                  deposit={depositData?.data?.deposit}
                  balance={depositData?.data?.amount}
                  page={ledgerPage}
                  setPage={setLedgerPage}
                  isLedger
                  next={ledgerList?.data?.next}
                  prv={ledgerList?.data?.previous}
                  count={ledgerList?.data?.count}
                  columnHeaders={allLedgerHeaders}
                  data={ledgerList?.data?.results?.map((m) => ({
                    s_no: m?.serial_number,
                    date: m?.created ? formatDate(m?.created) : "-",
                    transaction_id:
                      m?.invoice_detail?.transaction_id ||
                      m?.transaction_id ||
                      "-",
                    // id: m.invoice_detail?.id,
                    // transaction: m?.invoice_detail?.type?.replaceAll("_", " ") == "buy invoice" ? "Invoice":"Receipt",
                    type: m?.transaction_type || m?.invoice_detail?.type || "-",
                    amount: convertToPrice(
                      m?.invoice_detail?.amount || m?.amount
                    ),
                    "debit/credit": m?.type,
                  }))}
                  showTag={showTag}
                />
              </div>
            </>
          ) : (
            <div className="pt-[20px] pl-[30px] pr-[33px]">
              <Text className={"text-[#858585] text-[16px]"}>No Ledgers</Text>
            </div>
          )}
        </LoaderLayout>
      ) : tab === "receipt" ? (
        <>
          <UserReceiptListFilters
            filter={filter}
            setFilter={setFilter}
            options={options}
          />
          <LoaderLayout isLoading={invoiceIsLoading} height={50}>
            {invoiceList?.data?.results?.length > 0 ? (
              <>
                <div className="md:hidden pt-[20px]">
                  <MobileInvoicesTable
                    page={page}
                    setPage={setPage}
                    next={invoiceList?.data?.next}
                    prv={invoiceList?.data?.previous}
                    count={invoiceList?.data?.count}
                    data={invoiceList?.data?.results?.map((m) => ({
                      id: m?.invoice_id,
                      type: m?.type?.replace(/_/g, " "),
                      amount: convertToPrice(m?.amount),
                      status: m?.is_paid ? "Paid" : "Unpaid",
                      trans_date: formatDate(m?.paid_on) || "-",
                      trans_id: m?.transaction_id || "-",
                      inv_date: m?.created ? formatDate(m?.created) : "-",
                      type: m?.type?.replace(/_/g, " "),
                      s_no: m?.serial_number,
                      uuid: m?.uuid,
                    }))}
                    invoiceDownloading={invoiceDownloading}
                    handleDownload={(d) => handleDownload(d)}
                  />
                </div>
                <div className="hidden md:block">
                  <InvoiceTable
                    page={page}
                    setPage={setPage}
                    next={invoiceList?.data?.next}
                    prv={invoiceList?.data?.previous}
                    count={invoiceList?.data?.count}
                    invoiceDownloading={invoiceDownloading}
                    handleDownload={(d) => handleDownload(d)}
                    showTag={showTag}
                    columnHeaders={allReceiptHeaders}
                    data={invoiceList?.data?.results?.map((m) => ({
                      s_no: m?.serial_number,
                      inv_id: m?.invoice_id || "-",
                      inv_date: formatDate(m?.created),
                      // amount: m?.amount,
                      late_fee: "-",
                      type: m?.type?.replace(/_/g, " "),
                      total: convertToPrice(m?.amount),
                      status: m?.is_paid ? "Paid" : "Unpaid",
                      trans_date: m?.paid_on ? formatDate(m?.paid_on) : "-",
                      trans_id: m?.transaction_id || "-",
                      uuid: m?.uuid,
                    }))}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center pt-[30px] pl-[30px] pr-[33px]">
                <AppImage className="w-ful max-w-[150px]" src={NoInvoice} />
                <Text
                  className={
                    "text-[#BFBFBF] text-[16px] font-[500] text-center"
                  }
                >
                  No Receipt Found
                </Text>
              </div>
            )}
          </LoaderLayout>
        </>
      ) : (
        <>
          <UserInvoiceListFilters
            filter={filter}
            setFilter={setFilter}
            options={options}
          />
          <LoaderLayout isLoading={invoiceIsLoading} height={50}>
            {invoiceList?.data?.results?.length > 0 ? (
              <>
                <div className="md:hidden pt-[20px]">
                  <MobileInvoicesTable
                    page={page}
                    setPage={setPage}
                    next={invoiceList?.data?.next}
                    prv={invoiceList?.data?.previous}
                    count={invoiceList?.data?.count}
                    data={invoiceList?.data?.results?.map((m) => ({
                      id: m?.invoice_id,
                      type: m?.type?.replace(/_/g, " "),
                      amount: convertToPrice(m?.amount),
                      status: m?.is_paid ? "Paid" : "Unpaid",
                      trans_date: m?.paid_on ? formatDate(m?.paid_on) : "-",
                      trans_id: m?.transaction_id || "-",
                      inv_date: m?.created ? formatDate(m?.created) : "-",
                      s_no: m?.serial_number,
                      uuid: m?.uuid,
                    }))}
                    invoiceDownloading={invoiceDownloading}
                    handleDownload={(d) => handleDownload(d)}
                  />
                </div>
                <div className="hidden md:block">
                  <InvoiceTable
                    page={page}
                    setPage={setPage}
                    next={invoiceList?.data?.next}
                    prv={invoiceList?.data?.previous}
                    count={invoiceList?.data?.count}
                    invoiceDownloading={invoiceDownloading}
                    handleDownload={(d) => handleDownload(d)}
                    showTag={showTag}
                    columnHeaders={allInvoicesHeaders}
                    data={invoiceList?.data?.results?.map((m) => ({
                      s_no: m?.serial_number,
                      inv_id: m?.invoice_id || "-",
                      inv_date: m?.created ? formatDate(m?.created) : "-",
                      // amount: m?.amount,
                      late_fee: "-",
                      pending_amount: m?.pending_amount || "-",
                      total: convertToPrice(m?.amount),
                      type: m?.type?.replace(/_/g, " "),
                      status: m?.is_paid ? "Paid" : "Unpaid",
                      trans_date: m?.paid_on ? formatDate(m?.paid_on) : "-",
                      trans_id: m?.transaction_id || "-",
                      uuid: m?.uuid,
                    }))}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center pt-[30px] pl-[30px] pr-[33px]">
                <AppImage className="w-ful max-w-[150px]" src={NoInvoice} />
                <Text
                  className={
                    "text-[#BFBFBF] text-[16px] font-[500] text-center"
                  }
                >
                  No Invoices Found
                </Text>
              </div>
            )}
          </LoaderLayout>
        </>
      )}
    </div>
  );
}

export default Invoices;
