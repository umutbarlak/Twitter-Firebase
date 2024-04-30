import { auth } from "../../firebase/config";
import Buttons from "./Buttons";
import Dropdown from "./Dropdown";

const PostContent = ({
  tweet,
  date,
  handleDelete,
  setIsComment,
  isComment,
  isLiked,
  handleLike,
}) => {
  return (
    <div className=" border-y border-zinc-600 flex  gap-3 px-4 py-3">
      <img
        className=" w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className=" w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className=" font-semibold">{tweet.user.name}</p>
            <p className=" text-gray-400 text-sm">
              @{tweet.user.name.toLowerCase().split(" ").join("_")}
            </p>
            <p className=" text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && (
              <p className=" text-gray-400 text-xs">*düzenlendi</p>
            )}
          </div>

          {auth.currentUser.uid === tweet.user.id && (
            <Dropdown handleDelete={handleDelete} />
          )}
        </div>
        <div className=" my-4 w-full">
          {tweet.textContent && <p>{tweet.textContent}</p>}
          {tweet.textContent && (
            <img
              className="max-h-[400px] object-cover w-full rounded-lg my-2"
              src={tweet.imageContent}
            />
          )}
        </div>
      </div>
      <Buttons
        setIsComment={setIsComment}
        isComment={isComment}
        isLiked={isLiked}
        handleLike={handleLike}
        likeCount={tweet.like.length}
      />
    </div>
  );
};

export default PostContent;
