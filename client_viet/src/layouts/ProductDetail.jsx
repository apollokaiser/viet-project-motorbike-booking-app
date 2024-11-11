
import relationship_image from "@/assets/img/product/avatar-honda-rsx-8999.jpg"
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getXe } from "@/apis/getData";
import convertToVND from "@/utils/convertVND";
function ProductDetail() {
    const { id } = useParams();
    console.log(id);
    const [xe, setXe] = useState(null);
    // http://stackoverflow.com/chi-tiet-xe/1234
    useEffect(()=>{
        getXe(id).then(result => {
            setXe(result.data)
        })
    },[])
    const getImage = () =>{
        if(!xe?.hinhAnhs || xe.hinhAnhs.length ==0) {
          return "";
        }
        return xe.hinhAnhs[0].url; // Return the first image URL if available, otherwise return an empty string.  This is just a placeholder, you may need to adjust this logic based on your specific requirements.  For example, you might want to return a default image or a placeholder image.  For a more complete solution, you might want to use a library like "react-image-gallery" or "react-responsive-carousel" to handle image loading
      }
      const getVND = () =>{
        return convertToVND(xe?.gia_thue); // Convert the price to VND using the convertToVND function from the utils folder.  This is just a placeholder, you may need to adjust this logic based on your specific requirements.  For example, you might want to format the price to include commas or add currency symbols.  For a more complete solution, you might want to use a library like "react-currency-format" to handle currency formatting.  For example, you might want to format the price to include commas or add currency symbols.  For a more complete solution, you might want to use a library like "react-currency-format" to handle currency formatting.  For example, you might want to format the price to include commas or add currency symbols.  For a more complete solution, you might want to use a library like "react-currency-format" to handle currency formatting.  For example, you might want to format
      }
    return ( <>
    <div className="fade-in main-content">
        <div className="product-container">
                <div className="product-img">
                    <img src={getImage()} alt="" />
                </div>
                <div className="product-content">
                    <h3 className="product-name">{xe?.ten_xe}</h3>
                    <div className="share-zalo">
                        <button><svg width="20" height="20" version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                            <path fill="#1976D2" d="M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24 s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z" />
                            <g fill="#1E88E5">
                                <circle cx="11" cy="24" r="7" />
                                <circle cx="37" cy="14" r="7" />
                                <circle cx="37" cy="34" r="7" />
                            </g>
                        </svg><span>Chia sẻ</span></button>
                    </div>
                    <div className="product-price">
                        <span>Giá từ :</span> <span className="price">{getVND()}</span>
                    </div>
                    <div className="basic-info">
                        {/* <div><span>Đời xe: </span> <span>SH 2020</span></div>
                        <div><span>Lượt thuê: </span><span>4700</span></div> */}
                        <div className="procedure-info">
                            <span>☑️Thủ Tục : CCCD đủ 18 Hoặc giấy tờ tùy thân khác có ảnh (GPLX , Pastport...) <span style={{ color: "red" }}>☎</span>  Hotline: 0908.428.642 (a. Quang) / 0366.367.919 (a. Chiêu) / 0908.630.065 (a. Hạnh)</span>
                        </div>
                    </div>
                    <div className="product-action">
                        <button className="add-cart-btn">Thuê ngay</button>
                        <button className="book-btn">Đặt xe trước</button>
                    </div>
                    <div className="rent-policy">
                        <p>▶️ Người dưới 18 tuổi không được phép thuê xe</p>
                        <p>▶️ Khi thuê xe bạn được sẵn 2 mũ nếu yêu cầu (mặc định là 1)</p>
                        <p>▶️ Bắt buộc phải cọc thế chân khi nhận xe, Cty hoàn đủ cọc khi trả xe (Có thể thương lượng trước)</p>
                        <p>▶️ Giao xe tận nơi (8h-20h) trong sài gòn (Có phí) để nv đi grab về (Có thương lượng trước), sau khung giờ trên KH vui lòng đến thuê hoặc trả xe tại cty</p>
                    </div>
                </div>
                <div className="rental-information">
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
                    <div className="other-product">
                        <h3>Có Thể Bạn Sẽ Thích</h3>
                        <div className="other-product-list">
                            <div className="other-product-item">
                                <div className="other-product-image">
                                    <img src={relationship_image} alt="" />
                                </div>
                                <div className="other-product-info">
                                    <div className="product-name">Honda RSX</div>
                                    <div className="product-price"><span>Giá từ: </span>200.000đ</div>
                                </div>
                            </div>
                            <div className="other-product-item">
                                <div className="other-product-image">
                                    <img src={relationship_image} alt="" />
                                </div>
                                <div className="other-product-info">
                                    <div className="product-name">Honda RSX</div>
                                    <div className="product-price"><span>Giá từ: </span>200.000đ</div>
                                </div>
                            </div>
                            <div className="other-product-item">
                                <div className="other-product-image">
                                    <img src={relationship_image} alt="" />
                                </div>
                                <div className="other-product-info">
                                    <div className="product-name">Honda RSX</div>
                                    <div className="product-price"><span>Giá từ: </span>200.000đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </> );
}

export default ProductDetail;