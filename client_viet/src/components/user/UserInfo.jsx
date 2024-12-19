import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
function UserInfo() {
  const [query, setQuery] = useSearchParams();
  const id = query.get("id");
  const [user, setUser] = useState({});
  useEffect(() => {
   UserService.getUserInfo(id).then((result) => {
      if(result.status ==200)
      setUser(result.data);
    });
  },[id]);
  return (
    <>
       <div className="card shadow-sm">
        <div className="card-header bg-transparent border-0">
          <h3 className="mb-0">
            <i className="far fa-clone pr-1" />
            Thông tin khách hàng
          </h3>
        </div>
        <div className="card-body pt-0">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th width="30%">Tên</th>
                <td width="2%">:</td>
                <td>{user?.ho_ten || "Không có"}</td>
              </tr>
              <tr>
                <th width="30%">Số CMND </th>
                <td width="2%">:</td>
                <td>{user?.CMND || "Không có"}</td>
              </tr>
              <tr>
                <th width="30%">Số GPLX</th>
                <td width="2%">:</td>
                <td>{user?.GPLX || "Không có"}</td>
              </tr>
              <tr>
                <th width="30%">Email</th>
                <td width="2%">:</td>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <th width="30%">SDT</th>
                <td width="2%">:</td>
                <td>{user?.SDT || "Không có"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
