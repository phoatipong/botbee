import React from "react";

function Hearder({title}) {
  return (
    <header className=" justify-between items-center p-4">
      <h1 className="font-kanit text-2xl">ระบบจำแนกสถานการณ์ในกล่องเลี้ยงผึ้งด้วยเสียงผ่านไลน์แชทบอท</h1>
      <h1 className="font-kanit text-2xl mt-3">{title}</h1>
    </header>
  );
}

export default Hearder;
