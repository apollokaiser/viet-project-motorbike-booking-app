import "./report.css";
import ReportService from "@/services/ReportService";
import BarChart from "@comps/chart/BarChart";
import PieChart from "@comps/chart/PieChart";
import { useEffect, useMemo, useState } from "react";
import ReportTable from "./components/ReportTable";

function ReportPage() {
  const [reportData, setReportData] = useState();
  useEffect(() => {
    ReportService.getReport().then((report) => {
      if (report) setReportData(report);
    });
  }, []);
  const OrderCountDatasets = useMemo(() => {
    if (!reportData) return null;
    return {
      title: "Số lượng đơn hàng trong từng tháng",
      labels: reportData.map((item) => item.thang_nam),
      datasets: [
        {
          label: "Số đơn hàng",
          data: reportData.map((item) => item.order_count),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [reportData]);
  const OrderBenefitDatasets = useMemo(() => {
    if (!reportData) return null;
    return {
      title: "Số tiền kiếm được hằng tháng",
      labels: reportData.map((item) => item.thang_nam),
      datasets: [
        {
          label: "Tổng thu",
          data: reportData.map((item) => item.orders_total),
          backgroundColor: "rgb(0, 254, 30)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Tổng phí phạt",
          data: reportData.map((item) => item.fines_total),
          backgroundColor: "rgb(254, 123, 0)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [reportData]);
  const OrderSuccessDatasets = useMemo(() => {
    if (!reportData) return null;
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    console.log(thisMonth, thisYear);
    const filterReportsByMonth = reportData.find(
      (item) => item.thang_nam == `${thisYear}-0${thisMonth}`
    );
    if (!filterReportsByMonth) return null;
    return {
      title: "Tỷ lệ đơn thuê xe thành công",
      labels: ["Đơn thành công", "Đơn thất bại"],
      datasets: [
        {
          label: "Số đơn",
          data: [
            filterReportsByMonth.completion_order,
            filterReportsByMonth.order_count -
              filterReportsByMonth.completion_order,
          ],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    };
  });
  return (
    <>
      {!reportData && (
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ width: "100%", paddingTop: "20px" }}
        >
          <h3>Chưa có báo cáo nào !</h3>
          <h4
            style={{ cursor: "pointer", color:"blue" }}
            onClick={() => window.location.reload()}
          >
            Thử lại
          </h4>
        </div>
      )}
      {reportData && (
        <div className="report-container">
          <div className="report-col">
            {reportData && OrderCountDatasets && (
              <BarChart
                data={OrderCountDatasets?.datasets}
                labels={OrderCountDatasets?.labels}
                title={OrderCountDatasets?.title}
              />
            )}
          </div>
          <div
            className="report-col"
            style={{ borderLeft: "1px solid #ccc", height: "40vh" }}
          >
            {reportData && OrderSuccessDatasets && (
              <PieChart
                data={OrderSuccessDatasets?.datasets}
                labels={OrderSuccessDatasets?.labels}
                title={OrderSuccessDatasets?.title}
              />
            )}
          </div>
          <div className="report-col">
            {reportData && OrderBenefitDatasets && (
              <BarChart
                data={OrderBenefitDatasets?.datasets}
                labels={OrderBenefitDatasets?.labels}
                title={OrderBenefitDatasets?.title}
              />
            )}
          </div>
          <div className="report-table">
            {reportData && (
              <ReportTable datas={reportData} title={"Số liệu chi tiết"} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ReportPage;
