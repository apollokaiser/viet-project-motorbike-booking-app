import relationship_image from "@/assets/img/product/avatar-honda-rsx-8999.jpg"
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getXe } from "@/apis/getData";
import convertToVND from "@/utils/convertVND";
import RentPolicy from "@comps/product/RentPolicy";
import RentalInfomation from "@comps/product/RentalInfomation";
import {useDispatch } from 'react-redux'
import { addCart } from "@/redux/cart/cartSplice";
function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [xe, setXe] = useState(null);
    useEffect(()=>{
        getXe(id).then(result => {
            setXe(result.data)
        })
    },[])
    const getImage = () =>{
        if(!xe?.hinhAnhs || xe.hinhAnhs.length ==0) {
          return "";
        }
        return xe.hinhAnhs[0].url; 
      }
      const getVND = () =>{
        return convertToVND(xe?.gia_thue);
      }
      const addCartItem = () =>{
        dispatch(addCart({
            id,
            quantity: 1
        }))
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
                        <button className="add-cart-btn" onClick={addCartItem}>Thuê ngay</button>
                        <button className="book-btn">Đặt xe trước</button>
                    </div>
                    <RentPolicy />
                </div>
                <div className="rental-information">
                    <RentalInfomation/>
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