import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user, tweets, setTweets }) => {
  useEffect(() => {
    const collectionRef = collection(db, "tweets");

    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = [];

      snapshot.docs.forEach((doc) =>
        tempTweets.push({ ...doc.data(), id: doc.id })
      );

      setTweets(tempTweets);
    });

    return () => unsub();
  }, []);
  return (
    <div className="main border border-zinc-600 overflow-y-auto">
      <header className=" font-bold p-4 border-b border-zinc-600">
        Anasayfa
      </header>

      <Form user={user} />

      {!tweets ? (
        <Loader styles={"w-8 h-8 my-10"} />
      ) : (
        tweets.map((tweet) => <Post user={user} key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
