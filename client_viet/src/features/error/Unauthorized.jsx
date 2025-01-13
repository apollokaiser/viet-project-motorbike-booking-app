import "./error.css"

function Unauthorized() {
  return (
    <>
      <div className="error-container">
        <h1 className="error-heading">401</h1>
        <h2 className="error-subheading">Unauthorized</h2>
        <p className="error-text">
          Looks like you are not allowed to access this route
        </p>
        <a href="/" className="error-button">
          <i className="bx bx-arrow-back" />
          Return to website
        </a>
      </div>
    </>
  );
}

export default Unauthorized;
