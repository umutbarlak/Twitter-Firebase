import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";
import { CiFaceSmile } from "react-icons/ci";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Form = ({ user }) => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState();

  //
  const tweetsCol = collection(db, "tweets");

  const uploadImage = async (file) => {
    // dosyanın type nı sorgula
    if (!file || !file.type.startsWith("image")) return null;
    //dosyanın yükleneceği yerin referansını al
    const fileRef = ref(storage, v4() + file.name);
    //referansını belirlediğimiz konuma dosyayı yükleme
    await uploadBytes(fileRef, file);

    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;

    const textContent = input;
    const imageContent = e.target[1].files[0];

    try {
      url = await uploadImage(imageContent);

      if (!textContent && !url) {
        return toast.info("Lütfen içerik giriniz");
      }

      setIsLoading(true);

      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        isEdit: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
        like: [],
        comments: [],
      });
    } catch (error) {
      toast.error("Bir hata oluştu");
      console.log(error);
    }

    setIsLoading(false);

    e.target.reset();
    setInput("");
    setIsOpenEmoji(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px]"
        src={user?.photoURL}
        alt={user?.displayName}
      />
      <div className="w-full">
        <div className="flex items-center relative">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input || ""}
            className="w-full bg-transparent my-2 outline-none md:text-xl"
            type="text"
            placeholder="Neler oluyor?"
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
                  setInput(input + e.native);
                }}
                data={data}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <label
            className="text-xl p-3 rounded-full hover:bg-zinc-700"
            htmlFor="file/image"
          >
            <BsCardImage />
          </label>
          <input className="hidden" id="file/image" type="file" />
          <button
            type="submit"
            className=" bg-blue-600 flex items-center justify-center px-4 py2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800
          "
          >
            {isLoading ? <Loader styles={"h-6 w-6 text-white"} /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
