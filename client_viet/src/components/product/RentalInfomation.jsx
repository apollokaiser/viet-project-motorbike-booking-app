function RentalInfomation() {
    return ( <>
        <div className="rental-main-content">
                        <h3>Bảng Giá Thuê - ( Motorbike rental information )</h3>
                        <table border="1" className="rental-data-table">
                            <tbody><tr className="table-header">
                                <td className="time-to-rent"><p>Thời Gian Thuê</p><p>(To rent - Time)</p></td>
                                <td className="price-to-rent"><p>Giá Thuê</p><p>(Price to rent)</p></td>
                                <td className="procedure-to-rent"><p>Thủ Tục</p><p>(Procedure to rent)</p></td>
                                <td className="down-payment"><p>Tiền Thế Chân</p><p>(Down payment)</p></td>
                            </tr>
                            <tr>
                                <td><p>Từ 1 - 2 ngày</p><p>(1 - 2 days)</p></td>
                                <td>1.500.000đ</td>
                                <td rowSpan={3}>
                                    <p>Công ty sẽ giữ (bản chính) một trong những giấy tờ tùy thân có ảnh sau :</p>
                                    <p><strong style={{ color: "blue" }}>CMND , GPLX , hộ chiếu </strong></p>
                                    <p>(Personal Certificate)</p>
                                    <p><strong style={{ color: "blue" }}>Passport </strong></p>
                                </td>
                                <td rowSpan={3}>
                                    <p><strong style={{ color: "blue" }}>Từ 3 Triệu (Bắt buộc) để nhận xe</strong></p>
                                    <p>Hoàn trả tiền thế chân sau khi kết thúc hợp đồng thuê</p>
                                    <p><strong style={{ color: "blue" }}>To 3.000.000 VND (commitment to refund) </strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Từ 3 - 25 ngày</p><p>(3 - 25 days)</p></td>
                                <td>1.500.000đ</td>
                            </tr>
                            <tr>
                                <td><p>Trọn 1 tháng</p><p>(Full Month)</p></td>
                                <td>1.500.000đ</td>
                            </tr>
                        </tbody></table>
                    </div>
    </> );
}

export default RentalInfomation;