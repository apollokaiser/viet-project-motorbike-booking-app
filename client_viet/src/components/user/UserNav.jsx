import GoogleImage from "@/assets/img/google-image.png";
import UpdateUserButton from "./UpdateUserButton";
import { useSelector } from "react-redux";

function UserNav() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img
              className={"profile_img " + (!user?.CMND ? "not-allow" : "")}
              src={GoogleImage}
              alt="student dp"
            />
          </div>
          <div className="card-body">
            <div className="update-button">
              <UpdateUserButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNav;
