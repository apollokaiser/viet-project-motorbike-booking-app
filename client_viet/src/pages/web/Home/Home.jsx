import zalo_img from "@assets/img/anh-bia-zalo-xe-47070.jpg";


import VideoBanner from "@comps/static/VideoBanner";
import WhyChoose from "@comps/static/WhyChoose";
import CategoryContent from "./CategoryContent";
import ProductContent from "./ProductContent";
function Home() {
  //template
  return (
    <>
      <div className="website-introduce-image">
        <img src={zalo_img} alt="" />
      </div>
      <div className="fade-in main-content">
        <CategoryContent />
        <ProductContent />
      </div>
      <VideoBanner />
      <WhyChoose />
    </>
  );
}
export default Home;
