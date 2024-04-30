import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import Form from "../Form";

const Buttons = ({
  likeCount,
  handleLike,
  isLiked,
  setIsComment,
  isComment,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div
          onClick={() => setIsComment(!isComment)}
          className="grid place-items-center px-3 py-3 rounded-full transition hover:bg-[#789cc855] hover:text-[#568bc7e8]"
        >
          <BiMessageRounded />
        </div>
        <div className="grid place-items-center px-3 py-3 rounded-full transition hover:bg-[#88d38873] hover:text-[#74de74eb]">
          <FaRetweet />
        </div>
        <div
          onClick={handleLike}
          className=" rounded-full transition  hover:text-[#d34baaee] flex items-center justify-center "
        >
          <span className="rounded-full transition hover:bg-[#c676ae7a] px-3 py-3 ">
            {!isLiked ? <AiOutlineHeart /> : <FcLike />}
          </span>
          <span className="ms-[-2px]">{likeCount}</span>
        </div>
        <div className="grid place-items-center px-3 py-3 rounded-full transition hover:bg-[#6e6a6a8e]">
          <FiShare2 />
        </div>
      </div>
    </div>
  );
};

export default Buttons;
