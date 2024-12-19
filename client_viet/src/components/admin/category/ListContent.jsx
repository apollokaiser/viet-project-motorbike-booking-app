import { useState } from "react";

function ListContent({ items, handleDelete, handleUpdate }) {
  const [update, setUpdate] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState("");
  const updateInput = (value, item) => {
    if (value == item.name) {
      setUpdate(false);
      return;
    } else {
      handleUpdate(item.id, value);
      setUpdate(false);
    }
  };
  const handleChange = (e, item) => {
    if (e._reactName == "onKeyUp") {
      if (e.key === "Enter") {
        updateInput(e.target.value, item);
        setUpdate(false);
      } else if (e.key === "Escape") {
        setUpdate(false);
      }
    } else {
      updateInput(e.target.value, item);
    }
  };
  const openUpdateInput = (id) => {
    setUpdate(true);
    setCurrentUpdate(id);
  }

  return (
    <>
      <div className="modcontent">
        <div className="box-category">
          <ul id="cat_accordion" className="list-group">
            {items &&
              items.map((item) => (
                <li className="d-flex justify-content-between" key={item.id}>
                  {update && currentUpdate == item.id ? (
                    <input
                      type="text"
                      autoFocus
                      defaultValue={item.name}
                      name={item.id}
                      onBlur={(e) => handleChange(e, item)}
                      onKeyUp={(e) => handleChange(e, item)}
                      className="form-control"
                    />
                  ) : (
                    <a onDoubleClick={() => openUpdateInput(item.id)}>{item.name}</a>
                  )}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={async () => await handleDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="{2}"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ListContent;
