import { Outlet } from "react-router-dom";
import "./setting.css";
import SettingSideBar from "./components/SettingSideBar";
import DescriptionSetting from "./DescriptionSetting";

function SettingPage() {
  return (
    <>
      <div className="setting-container">
        <div className="bookbar">
          <h1>Trung tâm điều khiển quản trị viên</h1>
        </div>
        <div className="container admin-panel">
          <div className="row two-col">
            <div className="col-xs-12">
              <div className="box white clearfix">
                <SettingSideBar />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        {/* <Outlet /> */}
      </div>
    </>
  );
}

export default SettingPage;
