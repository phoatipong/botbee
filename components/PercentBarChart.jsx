import React from "react";
import classNames from "classnames";
import { useEffect } from "react";
function PercentBarChart({ label, percent, color }) {
  const goodstr = classNames(` rounded p-1`, color);

  return (
    <div className="w-1/2 ">
      <div className={goodstr}>
        <span className="text-white font-kanit text-lg ">
          {label} {percent} %
        </span>
      </div>
    </div>
  );
}

export default PercentBarChart;
