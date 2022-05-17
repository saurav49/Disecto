import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { AiFillEye, AiTwotoneEyeInvisible } from "../../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser, toggleAuthLoader } from "../authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState("");
  const { authLoader } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0) return setError("Please Enter Email Id");
    if (password.length === 0) return setError("Please Enter Password");

    setError("");
    dispatch(toggleAuthLoader("TRUE"));
    dispatch(loginUser({ email, password }));

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <h2 className="text-3xl text-gray-900 font-bold py-2"> Log In </h2>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div className={styles.inptWrapper}>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inptWrapperPass}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            {showPassword ? (
              <AiTwotoneEyeInvisible
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                className={styles.passwordIcon}
              />
            ) : (
              <AiFillEye
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                className={styles.passwordIcon}
              />
            )}
          </div>
          {err && (
            <div className="w-[80%]">
              <p className="mb-4 italic text-md text-red-400 font-bold">
                {err}
              </p>
            </div>
          )}
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-3 px-10 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase"
          >
            {authLoader ? (
              <Oval color="#fff" height={20} width={70} />
            ) : (
              <span>log in</span>
            )}
          </button>
        </form>
        <p>
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className={styles.spanStyle}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export { Login };
