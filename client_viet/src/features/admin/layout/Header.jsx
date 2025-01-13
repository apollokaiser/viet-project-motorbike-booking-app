
import user_img from "@assets/img/admin/user.png"
import search from "@assets/img/admin/search.png"
import notifications from "@assets/img/admin/notifications.png"


function Header() {
    return (<>
        <>{ /*Header*/ }
        <div className="header">
            <div className="nav">
                <div className="search">
                    <input type="text" placeholder="Search.." />
                    <button type="submit"><img src={search} alt="" /></button>
                </div>
                <div className="user">
                    <a href="#" className="btn">Thêm đơn</a>
                    <img src={notifications} alt="" />
                    <div className="img-case">
                        <img src={user_img} alt="" />
                    </div>
                </div>
            </div>
        </div>
        { /*/Header*/ }</>
    </>);
}

export default Header;