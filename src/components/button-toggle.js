import React, { useEffect } from "react";

const ButtonToggle = ({toggleFunction, isOn, title}) => {

  useEffect(() => {
    console.log(`title ${title} isOn ${isOn} ${isOn ? "btn-toggle" : "btn-toggle off"}`);
  }, [title, isOn]);

  useEffect(() => {
    console.log('mount');

    return () => {
      console.log('unmount');
    }
  }, []);

  return (
    <button
      onClick={toggleFunction}
      className={isOn ? "btn-toggle" : "btn-toggle off"}
    >
      {
        isOn ?
          <i className="fa fa-check-circle-o fa-lg"></i>
        :
          <i className="fa fa-ban fa-lg"></i>
      }
      {' '}{title}
    </button>
  );
}

export default ButtonToggle;