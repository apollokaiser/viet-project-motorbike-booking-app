import Product from "@comps/Product";
import VideoBanner from "@comps/static/VideoBanner";
import WhyChoose from "@comps/static/WhyChoose";

import zalo_img from '@assets/img/anh-bia-zalo-xe-47070.jpg'
function Home() {

    // initialize
    const products = [
        {
            id: 1,
            name: "Xe tay ga",
            price: 15000000,
            image: "https://cdn.tgdd.vn/Products/Images/42/213896/xe-tay-ga-mau-xanh-duong-15000000-1-600x600.jpg"
        },
        {
            id: 2,
            name: "Xe số",
            price: 20000000,
            image: "https://cdn.tgdd.vn/Products/Images/42/213897/xe-so-mau-do-duong-20000000-1-600x600.jpg"
        },
        //...
    ]
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
                            <li className="product-type-option-item active">Xe tay
                                ga</li>
                            <li className="product-type-option-item">Xe số</li>
                        </ul>
                    </div>
                    <div className="product-list">
                        {products.map(product =>
                            <Product key={product.id} product={product} />
                        )
                        }
                        <div className="load-all">
                            <button>Xem tất cả</button>
                        </div>
                    </div>
                </div>
                <VideoBanner/>
                <WhyChoose/>
        </>
    )
}
export default Home;