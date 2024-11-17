function Payment() {
  return (
    <>
      <div className="payment-content">
        <div className="payment-method">
          <h3>Hình thức thanh toán</h3>
          <form className="my-form">
            <div>
              <input id="radio-1" type="radio" name="option" />
              <label htmlFor="radio-1">Thanh toán bằng chuyển khoản</label>
            </div>
            <div>
              <input checked={true} id="radio-2" type="radio" name="option" />
              <label htmlFor="radio-2">Thanh toán tại điểm giao hàng</label>
            </div>
            <div>
              <input id="radio-3" type="radio" name="option" />
              <label htmlFor="radio-3">Thanh toán trực tiếp tại của hàng</label>
            </div>
          </form>
        </div>
        <div className="payment-info">
          <h3>Thông tin giao hàng</h3>
          <div className="form">
            <div className="flex">
              <label>
                <input required placeholder="" type="text" className="input" />
                <span>Họ tên</span>
              </label>
              <label>
                <input required placeholder="" type="text" className="input" />
                <span>Số điện thoại</span>
              </label>
            </div>

            <label>
              <input required placeholder="" type="email" className="input" />
              <span>Email</span>
            </label>

            <div className="select-address flex">
              <label htmlFor="">
                <select name="province" id="province">
                  <option value="H\xE0 N\u1ED9i">Hà Nội</option>
                  <option value="H\u1ED3 Ch\xED Minh">Hồ Chí Minh</option>
                  <option value="\u0110\xE0 N\u1EB5ng">Đà Nẵng</option>
                  <option value="C\u1EA7n Th\u01A1">Cần Thơ</option>
                  <option value="H\u1EA3i Ph\xF2ng">Hải Phòng</option>
                  <option value="B\u1EAFc Giang">Bắc Giang</option>
                  <option value="B\u1EAFc K\u1EA1n">Bắc Kạn</option>
                  <option value="B\u1EAFc Ninh">Bắc Ninh</option>
                  <option value="B\u1EBFn Tre">Bến Tre</option>
                  <option value="B\xECnh D\u01B0\u01A1ng">Bình Dương</option>
                </select>
              </label>
              <label htmlFor="">
                <select name="district" id="district">
                  <option value="H\xE0 N\u1ED9i">Hà Nội</option>
                  <option value="H\u1ED3 Ch\xED Minh">Hồ Chí Minh</option>
                  <option value="\u0110\xE0 N\u1EB5ng">Đà Nẵng</option>
                  <option value="C\u1EA7n Th\u01A1">Cần Thơ</option>
                  <option value="H\u1EA3i Ph\xF2ng">Hải Phòng</option>
                  <option value="B\u1EAFc Giang">Bắc Giang</option>
                  <option value="B\u1EAFc K\u1EA1n">Bắc Kạn</option>
                  <option value="B\u1EAFc Ninh">Bắc Ninh</option>
                  <option value="B\u1EBFn Tre">Bến Tre</option>
                  <option value="B\xECnh D\u01B0\u01A1ng">Bình Dương</option>
                </select>
              </label>
              <label htmlFor="">
                <select name="ward" id="ward">
                  <option value="H\xE0 N\u1ED9i">Hà Nội</option>
                  <option value="H\u1ED3 Ch\xED Minh">Hồ Chí Minh</option>
                  <option value="\u0110\xE0 N\u1EB5ng">Đà Nẵng</option>
                  <option value="C\u1EA7n Th\u01A1">Cần Thơ</option>
                  <option value="H\u1EA3i Ph\xF2ng">Hải Phòng</option>
                  <option value="B\u1EAFc Giang">Bắc Giang</option>
                  <option value="B\u1EAFc K\u1EA1n">Bắc Kạn</option>
                  <option value="B\u1EAFc Ninh">Bắc Ninh</option>
                  <option value="B\u1EBFn Tre">Bến Tre</option>
                  <option value="B\xECnh D\u01B0\u01A1ng">Bình Dương</option>
                </select>
              </label>
            </div>
            <label>
              <textarea required rows={3} placeholder="" className="input01" />
              <span>Yêu cầu khác (không bắt buộc)</span>
            </label>

            <button className="fancy" href="#">
              <span className="top-key" />
              <span className="text">Thanh toán</span>
              <span className="bottom-key-1" />
              <span className="bottom-key-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
