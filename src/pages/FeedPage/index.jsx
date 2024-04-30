import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const FeedPage = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <section className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />

      <Main user={user} setTweets={setTweets} tweets={tweets} />

      <Aside tweets={tweets} />
    </section>
  );
};

export default FeedPage;
