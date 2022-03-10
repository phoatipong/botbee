import React from "react";
import classNames from "classnames";

function CardStat({ title, content = "", color, w='56' }) {
  const classStr = classNames('h-auto rounded-lg  py-3 px-3 text-white ',color,w)

  return (
    <div className={classStr}>
      <div>
        <h1 className="font-kanit text-lg">{title}</h1>
      </div>
      <div className="flex items-center align-middle justify-center space-x-4">
        <h1 className="flex text-center font-kanit text-3xl">{content}</h1>
        <h1 className="flex text-center font-kanit text-xl">ครั้ง</h1>
      </div>
    </div>
  );
}

export default CardStat;
