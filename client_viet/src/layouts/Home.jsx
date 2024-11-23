import zalo_img from "@assets/img/anh-bia-zalo-xe-47070.jpg";

import { useEffect, useState } from "react";

import { getAllLoaiXe, getAllXe } from "@/apis/getData";

import VideoBanner from "@comps/static/VideoBanner";
import WhyChoose from "@comps/static/WhyChoose";
import Product from "@comps/product/Product";
function Home() {
  const [LoaiXe, setLoaiXe] = useState(null);
  const [chooseCategory, setChooseCategory] = useState("TG");
  const [products, setProducts] = useState(null);
  useEffect(() => {
    getAllLoaiXe().then((result) => {
      setLoaiXe(result.data);
    });
  }, []);
  useEffect(() => {
    getAllXe(chooseCategory).then((result) => {
      setProducts(result.data);
    });
  }, [chooseCategory]);
  const changeCategory = (ma_loai) => {
    setChooseCategory(ma_loai);
  };
  //template
  return (
    <>
      <div className="website-introduce-image">
        <img src={zalo_img} alt="" />
      </div>
      <div className="fade-in main-content">
        <div className="main-title">Chọn dòng xe</div>
        <div className="product-type-option">
          <ul>
            {LoaiXe &&
              LoaiXe.map((loai, index) => (
                <li
                  onClick={() => changeCategory(loai.ma_loai)}
                  key={loai.ma_loai}
                  className={`product-type-option-item ${
                    chooseCategory == loai.ma_loai ? "active" : ""
                  }`}
                >
                  {loai.ten_loai}
                </li>
              ))}
          </ul>
        </div>
        <div className="product-list">
          {products &&
            products.map((product) => (
              <Product key={product.ma_xe} product={product} />
            ))}
          <div className="load-all">
            <button>Xem tất cả</button>
          </div>
        </div>
      </div>
      <VideoBanner />
      <WhyChoose />
    </>
  );
}
export default Home;
