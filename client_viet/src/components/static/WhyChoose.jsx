import dv_icon_1 from "@assets/img/dv-icon-1-67190.png"
import dv_icon_2 from "@assets/img/dv-icon2-89531.png"
import dv_icon_3 from "@assets/img/dv-icon-3-69270.png"
import dv_icon_4 from "@assets/img/dv-icon-4-72881.png"


function WhyChoose() {
    return ( 
        <>
        <div className="fade-in whychoose-items">
                    <div className="whychoose-item">
                        <div className="whychoose-item-icon">
                            <img src={dv_icon_1} alt="" />
                        </div>
                        <div className="whychoose-content">
                            <div className="whychoose-title">Giao - trả tân
                                nơi</div>
                            <div className="whychoose-description">Công ty giao xe
                                và nhận trả xe tận nơi theo yêu cầu trong khung
                                giờ từ 8h-20h với phí thương lượng trước. </div>
                        </div>
                    </div>
                    <div className="whychoose-item">
                        <div className="whychoose-item-icon">
                            <img src={dv_icon_2} alt="" />
                        </div>
                        <div className="whychoose-content">
                            <div className="whychoose-title">Đổi xe nếu không hài
                                lòng</div>
                            <div className="whychoose-description">Khách hoàn toàn
                                có thể yêu cầu đổi xe nếu phát sinh lỗi trong
                                quá trình thuê</div>
                        </div>
                    </div>
                    <div className="whychoose-item">
                        <div className="whychoose-item-icon">
                            <img src={dv_icon_3} alt="" />
                        </div>
                        <div className="whychoose-content">
                            <div className="whychoose-title">Đặt xe nhanh 24/7</div>
                            <div className="whychoose-description">Khách có thể đặt
                                xe nhanh trên Website, Zalo, Facebook, Nhân viên
                                sẽ liên hệ và giao xe đến bạn theo yêu cầu</div>
                        </div>
                    </div>
                    <div className="whychoose-item">
                        <div className="whychoose-item-icon">
                            <img src={dv_icon_4} alt="" />
                        </div>
                        <div className="whychoose-content">
                            <div className="whychoose-title">Hỗ trợ khi phát sinh sự
                                cố</div>
                            <div className="whychoose-description">Trong quá trình
                                sử dụng xe, khi cần hỗ trợ khách có thể liên hệ
                                nhanh về Hotline</div>
                        </div>
                    </div>
                </div>
        </>
     );
}

export default WhyChoose;