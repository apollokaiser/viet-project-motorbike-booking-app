import convertToVND from "@/utils/convertVND";
import { NavLink } from "react-router-dom";

function Product({product}) {
  const getIntroImage = () =>{
    if(!product.hinhAnhs || product.hinhAnhs.length ==0 ) {
      return "";
    }
    return product.hinhAnhs[0].url; // Return the first image URL if available, otherwise return an empty string.  This is just a placeholder, you may need to adjust this logic based on your specific requirements.  For example, you might want to return a default image or a placeholder image.  For a more complete solution, you might want to use a library like "react-image-gallery" or "react-responsive-carousel" to handle image loading
  }
  const getVND = () =>{
    return convertToVND(product.gia_thue); // Convert the price to VND using the convertToVND function from the utils folder.  This is just a placeholder, you may need to adjust this logic based on your specific requirements.  For example, you might want to format the price to include commas or add currency symbols.  For a more complete solution, you might want to use a library like "react-currency-format" to handle currency formatting.  For example, you might want to format the price to include commas or add currency symbols.  For a more complete solution, you might want to use a library like "react-currency-format" to handle currency formatting.  For example, you might want to format the price to include commas or add currency symbols.  For a more complete solution, you might want to use a library like "react-currency-format" to handle currency formatting.  For example, you might want to format
  }
  return (
    <>
      <div className="product-item">
        <div className="product-image">
          <img
            src={getIntroImage()}
            alt=""
          />
        </div>
        <div className="product-info">
          <NavLink to={`/chi-tiet-xe/${product.ma_xe}`}  className="product-name">{product.ten_xe}</NavLink>
          <div className="product-price">
            <span>Giá từ :</span>
            <span className="price" />
            {getVND()}
          </div>
        </div>
      </div>
    </>
  );
}
export default Product;
