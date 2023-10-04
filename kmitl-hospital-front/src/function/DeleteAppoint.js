import axios from "axios";

const db_domain =  `${process.env.REACT_APP_DB_DOMAIN}`;

const DeleteAppoint = async (report_id) => {
    await axios({
      method: "delete",
      url: `${db_domain}/appoint/` + report_id,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("delete complete: " + report_id);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("cannot delete: " + report_id);
      });
  };

const renderX = (appoint_id) => {
    const token = localStorage.getItem("permission");
    if (token) {
      return (
        <button onClick={() => DeleteAppoint(appoint_id)}>
          &nbsp; &#65794;
        </button>
      );
    } else {
      return null;
    }
};

const DeleteReport = async (report_id, navigate) => {
  await axios({
    method: "delete",
    url: `${db_domain}/report/` + report_id,

  })
    .then((response) => {
      if (response.status === 200) {
        alert("delete complete: " + report_id);
        if(navigate){
          navigate(-1)
        }else{
          window.location.reload();
        }
      }
    })
    .catch((err) => {
      alert("cannot delete: " + report_id);
    });
};

const renderDeleteReport = (report_id, navigate) => {
  const token = localStorage.getItem("permission");
  if (token) {
    return (
      <button onClick={() => DeleteReport(report_id, navigate)}>
        &nbsp; &#65794;
      </button>
    );
  } else {
    return null;
  }
};

export {renderX, renderDeleteReport}