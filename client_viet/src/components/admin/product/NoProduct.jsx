function NoProduct() {
  return (
    <>
      <div className="no-products">
        <p>Looks like you do not have any products.</p>
        <a href="#" id="add-dummy-product">
          Add dummy product?
        </a>
      </div>
    </>
  );
}

export default NoProduct;
