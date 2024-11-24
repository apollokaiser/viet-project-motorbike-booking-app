import OtherInfo from "@comps/user/OtherInfo";
import UserInfo from "@comps/user/UserInfo";
import UserNav from "@comps/user/UserNav";
import "@/components/user/css/user.css";
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
                      <UserInfo />
                      <div style={{ height: 26 }} />
                      <OtherInfo />
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
