import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../firebase/config";
import { CiFaceSmile } from "react-icons/ci";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsCardImage } from "react-icons/bs";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const CommentForm = ({ user, tweet }) => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputCom, setInputCom] = useState("");

  //
  const tweetsRef = doc(db, "tweets", tweet.id);

  const uploadImage = async (file) => {
    // dosyanın type nı sorgula
    if (!file || !file.type.startsWith("image")) {
      return null;
    }

    //dosyanın yükleneceği yerin referansını al
    const fileRef = ref(storage, v4() + file.name);
    //referansını belirlediğimiz konuma dosyayı yükleme
    await uploadBytes(fileRef, file);

    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = inputCom;
    const image = e.target[1].files[0];

    try {
      const url = await uploadImage(image);

      if (!text && !url) {
        return toast.info("Lütfen içerik giriniz");
      }

      setIsLoading(true);

      await updateDoc(tweetsRef, {
        comments: arrayUnion({
          id: v4(),
          text,
          image: url,
          createdAt: Date.now(),
          isEdited: false,
          user: {
            id: user?.uid,
            name: user?.displayName,
            photo: user?.photoURL,
          },
          like: [],
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);

    e.target.reset();
    setInputCom("");
    setIsOpenEmoji(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3  p-4">
      <img
        className="rounded-full h-[35px] md:h-[45px]"
        src={user?.photoURL}
        alt={user?.displayName}
      />
      <div className="w-full">
        <div className="flex items-center relative">
          <input
            onChange={(e) => setInputCom(e.target.value)}
            value={inputCom}
            className="w-full bg-transparent my-2 outline-none md:text-xl"
            type="text"
            placeholder="Yanıtınız..."
          />
          <span
            onClick={() => {
              setIsOpenEmoji(!isOpenEmoji);
            }}
            className="text-xl p-2  rounded-full hover:bg-gray-700"
          >
            <CiFaceSmile />
          </span>
          {isOpenEmoji && (
            <div
              onMouseLeave={() => setIsOpenEmoji(false)}
              className="absolute z-10 top-[40px] right-0"
            >
              <Picker
                previewPosition="none"
                onEmojiSelect={(e) => {
                  setInputCom(inputCom + e.native);
                }}
                data={data}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <label
            className="text-xl p-3 rounded-full hover:bg-zinc-700"
            htmlFor="file-input"
          >
            <BsCardImage />
          </label>
          <input id="file-input" className="hidden" type="file" />
          <button
            className=" bg-blue-600 flex items-center justify-center px-4 py2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800
          "
          >
            {isLoading ? <Loader styles={"h-6 w-6 text-white"} /> : "Yanıtla"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
