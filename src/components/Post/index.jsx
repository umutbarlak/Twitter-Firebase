import moment from "moment/moment";
import "moment/locale/tr";
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Content from "./Content";
import EditMode from "./EditMode";

const Post = ({ user, tweet }) => {
  const [isComment, setIsComment] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  const isLiked = tweet.like.includes(auth.currentUser.uid);

  const commentArray = tweet?.comments?.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  const handleDelete = (tweet) => {
    const tweetRef = doc(db, "tweets", tweet.id);

    deleteDoc(tweetRef)
      .then(() => {
        toast.warn("Tweet akıştan kaldırıldı");
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Tweet silinirken sorun oluştu");
      });
  };

  const deleteComment = async (tweetId, commentId) => {
    const tweetRef = doc(db, "tweets", tweetId);
    try {
      const tweetDoc = await getDoc(tweetRef);

      const newComments = tweetDoc
        .data()
        .comments.filter((c) => c.id !== commentId);
      await updateDoc(tweetRef, {
        comments: newComments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //like
  const handleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    try {
      updateDoc(tweetRef, {
        like: isLiked
          ? arrayRemove(auth.currentUser.uid)
          : arrayUnion(auth.currentUser.uid),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 ">
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
              <Dropdown
                setIsEdit={() => setIsEdit(true)}
                handleDelete={() => handleDelete(tweet)}
              />
            )}
          </div>

          {!isEdit ? (
            <Content tweet={tweet} />
          ) : (
            <EditMode
              handleDelete={handleDelete}
              tweet={tweet}
              setIsEdit={setIsEdit}
            />
          )}

          <Buttons
            setIsComment={setIsComment}
            isComment={isComment}
            isLiked={isLiked}
            handleLike={handleLike}
            likeCount={tweet.like.length}
          />
        </div>
      </div>

      {isComment && <CommentForm user={user} tweet={tweet} />}

      {isComment && (
        <div className=" bg-zinc-900">
          <h3 className=" px-4 py-3 font-bold text-xl underline">Yorumlar</h3>
          {commentArray.length === 0 ? (
            <p className=" px-4 mb-2">Gösterilecek Yorum Yok</p>
          ) : (
            commentArray.map((com) => (
              <Comment
                key={com.id}
                com={com}
                deleteComment={() => deleteComment(tweet.id, com.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
