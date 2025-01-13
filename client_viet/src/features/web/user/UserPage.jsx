import UserNav from "@/features/web/user/components/UserNav";
import "./user.css";
import { Outlet } from "react-router-dom";
function UserPage() {
  return (
    <>
      <div className="fade-in main-content">
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              <div className="student-profile py-4">
                <div className="container">
                  <div className="row">
                    <UserNav />
                    <div className="col-lg-8">
                      {/* <UserInfo /> */}
                      <Outlet />
                      <div style={{ height: 26 }} />
                      {/* <OtherInfo /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
