import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiArrowGoBackFill, RiDeleteBin5Line } from "react-icons/ri";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CiFaceSmile } from "react-icons/ci";

const EditMode = ({ tweet, setIsEdit, handleDelete }) => {
  const [isDeleteBtn, setisDeleteBtn] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [newText, setNewText] = useState(tweet.textContent);

  // const inputRef = useRef();

  const editPost = async (tweet) => {
    // const newText = inputRef.current.value;

    console.log(tweet.imageContent);

    const tweetRef = doc(db, "tweets", tweet.id);

    if (!newText && (!tweet.imageContent ? !deleteImage : deleteImage)) {
      return handleDelete(tweet);
    }

    await updateDoc(tweetRef, {
      textContent: newText,
      imageContent: deleteImage ? "" : tweet.imageContent,
      isEdited: true,
    })
      .then(() => toast.success("Tweet güncellendi"))
      .catch(() => toast.error("Tweet güncellenirken bir hata oluştu"));

    setIsEdit(false);
  };

  return (
    <div className="p-2">
      <div className="flex items-center gap-5  ">
        <div className="w-3/4 flex items-center gap-3 relative bg-white rounded-md px-1">
          <input
            onChange={(e) => setNewText(e.target.value)}
            value={newText}
            className="p-1 w-full   rounded-sm text-black"
            type="text"
          />
          <span
            onClick={() => setOpenEmoji(!openEmoji)}
            className="text-xl font-bold p-1 text text-black  rounded-full hover:bg-gray-300"
          >
            <CiFaceSmile />
          </span>

          {openEmoji && (
            <span
              onMouseLeave={() => setOpenEmoji(false)}
              className=" z-30 absolute top-10 left-0"
            >
              <Picker
                onEmojiSelect={(e) => {
                  setNewText(newText + e.native);
                }}
                previewPosition="none"
                data={data}
              />
            </span>
          )}
        </div>
        <button
          onClick={() => editPost(tweet)}
          className=" text-green-600 cursor-pointer p-2 rounded-full transition shadow-md hover:shadow-green-600 text-xl"
        >
          <FaSave />
        </button>
        <button
          onClick={() => {
            setIsEdit(false);
            setisDeleteBtn(false);
          }}
          className=" text-red-500 cursor-pointer p-2 rounded-full transition shadow-md hover:shadow-red-600 text-xl"
        >
          <IoCloseCircleOutline />
        </button>
      </div>
      {tweet?.imageContent && (
        <div className="my-5 p-2 relative ">
          <img
            className={`w-full object-cover rounded-md max-h-[150px] blur-0 ${
              isDeleteBtn ? " blur-sm" : ""
            } `}
            src={tweet?.imageContent}
            alt=""
          />

          <button
            onClick={() => {
              setisDeleteBtn(!isDeleteBtn);
              setDeleteImage(!deleteImage);
            }}
            className=" text-red-600 cursor-pointer absolute top-6 right-6 text-xl p-1 bg-white rounded-full "
          >
            {!isDeleteBtn ? <RiDeleteBin5Line /> : <RiArrowGoBackFill />}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMode;
