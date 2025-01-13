import Utils from "@utils/Utils";
import search from "@assets/img/admin/search.png";
function ReportTable({ datas, title }) {
  return (
    <>
      <div className="data-table-container">
        <div className="title">
          <h2>{title}</h2>
          <div className="search">
            <input type="text" placeholder="Search.." />
            <button type="submit">
              <img src={search} alt="" />
            </button>
          </div>
          <a href="#" className="btn mx-5">
            Tất cả
          </a>
          <a className="btn">
            Xuất tất cả
          </a>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Tháng</th>
              <th>Số đơn thuê</th>
              <th>Số đơn hoàn tất</th>
              <th>Số đơn bị hủy</th>
              <th>Tổng tiền phạt</th>
              <th>Tổng thu</th>
              <th>Tổng tiền</th>
              <th />
            </tr>
            {datas &&
              datas.map((data) => (
                <tr key={data.thang_nam}>
                  <td>{data.thang_nam}</td>
                  <td>{data.order_count}</td>
                  <td>{data.completion_order}</td>
                  <td>{data.order_count - data.completion_order}</td>
                  <td>{Utils.convertToVND(data.fines_total)}</td>
                  <td>{Utils.convertToVND(data.orders_total)}</td>
                  <td>
                    {Utils.convertToVND(
                      Number.parseInt(data.orders_total) +
                        Number.parseInt(data.fines_total)
                    )}
                  </td>
                  <td>Export</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReportTable;
