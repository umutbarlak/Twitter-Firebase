import moment from "moment/moment";
import "moment/locale/tr";
import { auth } from "../../firebase/config";
import Dropdown from "./Dropdown";

const Comment = ({ com, deleteComment }) => {
  const date = com?.createdAt;
  const formatDate = moment(new Date(date)).fromNow();

  return (
    <div className="flex gap-3 px-4">
      <img
        className=" w-6 h-6 rounded-full"
        src={com.user.photo}
        alt={com.user.name}
      />

      <div className=" w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className=" font-semibold">{com.user.name}</p>
            <p className=" text-gray-400 text-sm">
              @{com.user.name.toLowerCase().split(" ").join("_")}
            </p>
            <p className=" text-gray-400 text-sm">{formatDate}</p>
            {com.isEdited && (
              <p className=" text-gray-400 text-xs">*düzenlendi</p>
            )}
          </div>

          {auth.currentUser.uid === com.user.id && (
            <Dropdown deleteComment={deleteComment} />
          )}
        </div>
        <div className=" my-4 w-full">
          {com.text && <p>{com.text}</p>}
          {com.image && (
            <img
              className="max-h-[400px] object-cover w-full rounded-lg my-2"
              src={com.image}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
