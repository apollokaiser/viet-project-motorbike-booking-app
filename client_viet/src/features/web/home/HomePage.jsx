import zalo_img from "@assets/img/anh-bia-zalo-xe-47070.jpg";

import VideoBanner from "@comps/static/VideoBanner";
import WhyChoose from "@comps/static/WhyChoose";
import CategoryContent from "./components/CategoryContent";
import ProductContent from "./components/ProductContent";
import { useEffect } from "react";
import SettingService from "@/services/SettingService";
function Home() {
  useEffect(() => {
    Promise.all([
      SettingService.getAttribute("web_title"),
      SettingService.getAttribute("web_icon"),
      SettingService.getAttribute("tag_line"),
    ]).then(([title, icon, tag_line]) => {
      if (title) {
        if (tag_line) {
          document.title = `${title} - ${tag_line}`;
        } else {
          document.title = title;
        }
      }
      if (icon) document.querySelector("link['rel']").href = icon;
    });
  }, []);
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
