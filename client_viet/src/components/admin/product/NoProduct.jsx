function NoProduct() {
  return (
    <>
      <div className="no-products">
        <p style={{fontSize:"25px"}}>Có lẽ như bạn chưa có bất cứ sản phẩm nào</p>
        <a href="#" id="add-dummy-product">
          Hãy thêm ngay nào !
        </a>
      </div>
    </>
  );
}

export default NoProduct;
