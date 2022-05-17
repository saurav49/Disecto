import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { AiFillEye, AiTwotoneEyeInvisible } from "../../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { validateEmail, validatePassword, isMatch } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, toggleAuthLoader } from "../authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setError] = useState("");
  const { userSelectedRole, authLoader } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError("Enter valid email id");
    if (!validatePassword(password))
      return setError(
        "Password should contain atleast 6 characters of atleast lowercase, uppercase and numeric integer"
      );
    if (!isMatch(password, confirmPassword))
      return setError("Password and Confirm Password does not match");

    if (!userSelectedRole) {
      return setError(
        "Please Select whether you want to signup as admin or user from the homepage"
      );
    }

    setError("");
    dispatch(toggleAuthLoader("TRUE"));
    dispatch(signUpUser({ name, username, email, password, userSelectedRole }));

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <h2 className="text-3xl text-gray-900 font-bold py-2"> Sign Up </h2>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div className={styles.inptWrapper}>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inptWrapper}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
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
          <div className={styles.inptWrapperPass}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
            {showConfirmPassword ? (
              <AiTwotoneEyeInvisible
                onClick={() =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
                className={styles.passwordIcon}
              />
            ) : (
              <AiFillEye
                onClick={() =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
                className={styles.passwordIcon}
              />
            )}
          </div>
          {err && (
            <div className="w-[80%]">
              <p className="mb-4 italic text-md text-red-400 font-bold">
                {err}
              </p>
              {err.split(" ").includes("homepage") && (
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-3 border-b-4 mb-5 border-blue-700 hover:border-blue-500 rounded uppercase"
                >
                  Homepage
                </button>
              )}
            </div>
          )}
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-3 px-10 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase"
          >
            {authLoader ? (
              <Oval color="#fff" height={20} width={70} />
            ) : (
              <span>sign up</span>
            )}
          </button>
        </form>
        <p>
          Already have an account?
          <span onClick={() => navigate("/login")} className={styles.spanStyle}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export { Signup };
