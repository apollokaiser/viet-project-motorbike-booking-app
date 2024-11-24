import { useState } from "react";
import "./css/update-button.css"
import UpdateInfoDialog from "./UpdateInfoDialog";

function UpdateUserButton() {
    const [open, setOpen] = useState(false);
    const openModal = () =>{
        setOpen(true);
    }
    const toggleOpen = () =>{
        setOpen(!open);
    }
    return (<>
        <button onClick={openModal} className="button">
          <span className="button__icon-wrapper">
            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="10">
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>

            <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
          </span>
        Cập nhật thông tin
        </button>
                <UpdateInfoDialog openModal={open} toggleOpen={toggleOpen}/>
    </>);
}

export default UpdateUserButton;