import React from "react";

const ButtonToggle = ({toggleFunction, flag, title}) => (
    <button
      onClick={toggleFunction}
      className={flag ? "btn-toggle" : "btn-toggle off"}
    >
      {flag ? <i className="fa fa-check-circle-o fa-lg"></i> : <i className="fa fa-ban fa-lg"></i>}
      {' '}{title}
    </button>
);

export default ButtonToggle;