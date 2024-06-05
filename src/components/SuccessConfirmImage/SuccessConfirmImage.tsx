const SuccessConfirmImage = () => {
  return (
    <div
      className="swal2-icon swal2-success swal2-icon-show"
      style={{
        display: "flex",
        marginTop: "30px",
        marginBottom: "20px",
      }}
    >
      <div
        className="swal2-success-circular-line-left"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      ></div>
      <span className="swal2-success-line-tip"></span>{" "}
      <span className="swal2-success-line-long"></span>
      <div className="swal2-success-ring"></div>{" "}
      <div
        className="swal2-success-fix"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      ></div>
      <div
        className="swal2-success-circular-line-right"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      ></div>
    </div>
  );
};

export default SuccessConfirmImage;
