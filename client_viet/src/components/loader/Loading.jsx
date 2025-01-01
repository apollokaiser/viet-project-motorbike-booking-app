import "./loading.css"


function Loading({title}) {
  return (
    <>
      <div className="loading-spinner d-flex flex-column justify-content-center align-items-center">
        <>
          <div className="dot-spinner">
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
          </div>
          <div style={{ padding: "5px" }}>{title}</div>
        </>
      </div>
    </>
  );
}

export default Loading;
