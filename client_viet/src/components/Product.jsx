function Product({product}) {
  return (
    <>
      <div className="product-item">
        <div className="product-image">
          <img
            src="https://chothuexemaysaigon.com/thumbs/275x300x2/upload/product/shmodeavatar-5617.jpg"
            alt=""
          />
        </div>
        <div className="product-info">
          <div className="product-name">Xe tay ga XYZ123</div>
          <div className="product-price">
            <span>Giá từ :</span>
            <span className="price" />
            1.500.000đ
          </div>
        </div>
      </div>
    </>
  );
}
export default Product;
