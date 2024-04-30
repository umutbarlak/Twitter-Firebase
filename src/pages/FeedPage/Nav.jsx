import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../../constants";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end ">
      <div className="flex flex-col justify-between h-full px-2 py-4">
        <div>
          <img className="w-14 mb-4" src="x-logo.webp" alt="" />
          {navSections.map((i, index) => (
            <div
              key={index}
              className="flex items-center max-md:justify-center gap-3 md:text-2xl text-3xl p-3 py-2 max-md:py-3 cursor-pointer rounded-full whitespace-nowrap transition  hover:bg-[#505050] w-fit"
            >
              <span>{i.icon}</span>
              <span className="max-md:hidden">{i.title}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 text-2xl max-md:justify-center">
          {!user ? (
            <div className="flex gap-1">
              <div className=" mx-auto w-12 h-12 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-3/4 p-1 grid place-items-center max-md:hidden">
                <p className="animate-pulse h-2/5 w-full bg-gray-400 rounded-full "></p>
              </div>
            </div>
          ) : (
            <div className="flex items-center  gap-2 max-md:justify-center">
              <img
                className="flex w-12 h-12 rounded-full"
                src={user.photoURL}
                alt=""
              />
              <p className="max-md:hidden text-[15px]">{user.displayName}</p>
            </div>
          )}
          <button
            onClick={() => signOut(auth)}
            className="flex gap-2 p-1 py-2 max-md:justify-center justify-center items-center bg-zinc-700 rounded transition hover:bg-zinc-900"
          >
            <BiDoorOpen />
            <span className="max-md:hidden text-[15px]">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
