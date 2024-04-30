import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız başarı ile oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error(err.message));
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesaba giriş yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.message);
          setIsError(true);
        });
    }
  };

  const sendEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("E-postanıza şifre sıfırlama bağlantısı gönderildi");
    });
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      toast.success("Hesabınıza giriş yapıldı");
      navigate("/home");
    });
  };

  return (
    <section className=" h-screen grid place-items-center">
      <div className=" bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a giriş yap</h1>

        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img className=" h-[20px] " src="/google-logo.svg" alt="" />
          <span className="text-black whitespace-nowrap">
            Google ile Giriş Yap
          </span>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className=" text-black rounded-md mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            required
          />

          <label className=" mt-5">Şifre</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className=" text-black rounded-md mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />

          <button
            className=" mt-10 bg-white rounded-full text-black p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>

          <p className=" mt-5">
            <span className="text-gray-500">
              {isLogin ? "Hesabınız yoksa" : "Hesabınız varsa"}
            </span>
            <span
              onClick={() => setIsLogin(!isLogin)}
              className=" ms-2 text-blue-500 cursor-pointer"
            >
              {isLogin ? "Kaydolun" : "Giriş Yap"}
            </span>
          </p>
        </form>

        {isError && isLogin && (
          <button
            onClick={sendEmail}
            className=" text-center text-red-500 cursor-pointer"
          >
            Şifrenizi mi unuttunuz?
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
