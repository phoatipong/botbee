import Link from "next/link";
import Image from "next/image";
function Sidebar({ signOut }) {
  
  return (
    <div className=" w-72 h-full bg-yellow-400">
      <div className="flex justify-center p-6">
        <Image
          src={
            "data:image/png;base64,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"
          }
          alt="bee"
          height={60}
          width={60}
          objectFit="fill"
        />
      </div>
      <div className="w-full flex mx-3 py-5">
        <div className="w-full h-full flex text-gray-700 text-xl font-prompt">
          <div className=" w-11/12">
            <div className="bg-white rounded-md pt-2 pb-2 ">
              <ul className="space-y-3">
                <li className="flex border-b border-yellow-300">
                  <Link href={"/"} passHref>
                    <p className="p-1 hover:cursor-pointer">Dashboard</p>
                  </Link>
                </li>
                <li className="border-b border-yellow-300">
                  <Link href={"/statTable"} passHref>
                    <p className="p-1 font-prompt hover:cursor-pointer">
                      ประวัติการณ์วินิจฉัย
                    </p>
                  </Link>
                </li>
                <li className="" onClick={signOut}>
                  <Link href={"#"} passHref>
                    <p className="p-1 hover:cursor-pointer">ออกจากระบบ</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
