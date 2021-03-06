import { useNavigate } from "react-router-dom";
import { handleUserLogout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
const BrandIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill={props.fill}
    stroke={props.stroke}
    style={{
      width: "70px",
      height: "70px",
    }}
  >
    <path d="M 5.0058594 9 A 1.0001 1.0001 0 0 0 4 10 L 4 33 A 1.0001 1.0001 0 0 0 4.2128906 33.617188 L 22.212891 56.617188 A 1.0001 1.0001 0 0 0 23 57 L 41 57 A 1.0001 1.0001 0 0 0 41.787109 55.382812 L 5.7871094 9.3828125 A 1.0001 1.0001 0 0 0 5.0058594 9 z M 58.970703 9 A 1.0001 1.0001 0 0 0 58.21875 9.375 L 34.21875 39.375 A 1.0001 1.0001 0 0 0 35 41 L 53 41 A 1.0001 1.0001 0 0 0 53.777344 40.628906 L 59.777344 33.230469 A 1.0001 1.0001 0 0 0 60 32.599609 L 60 10 A 1.0001 1.0001 0 0 0 58.970703 9 z M 58 12.851562 L 58 32.246094 L 52.523438 39 L 37.082031 39 L 58 12.851562 z M 6 12.900391 L 38.947266 55 L 23.486328 55 L 6 32.654297 L 6 12.900391 z M 11.814453 30.958984 A 1.0001 1.0001 0 0 0 11.195312 31.179688 L 9.6191406 32.412109 A 1.0003975 1.0003975 0 0 0 10.851562 33.988281 L 12.427734 32.755859 A 1.0001 1.0001 0 0 0 11.814453 30.958984 z M 15.160156 35.236328 A 1.0001 1.0001 0 0 0 14.541016 35.457031 L 12.966797 36.689453 A 1.0003977 1.0003977 0 1 0 14.199219 38.265625 L 15.773438 37.033203 A 1.0001 1.0001 0 0 0 15.160156 35.236328 z M 18.509766 39.513672 A 1.0001 1.0001 0 0 0 17.890625 39.734375 L 16.314453 40.966797 A 1.0001 1.0001 0 1 0 17.546875 42.541016 L 19.123047 41.310547 A 1.0001 1.0001 0 0 0 18.509766 39.513672 z M 21.855469 43.791016 A 1.0001 1.0001 0 0 0 21.236328 44.011719 L 19.662109 45.244141 A 1.0001 1.0001 0 1 0 20.894531 46.818359 L 22.46875 45.585938 A 1.0001 1.0001 0 0 0 21.855469 43.791016 z M 25.203125 48.066406 A 1.0001 1.0001 0 0 0 24.583984 48.289062 L 23.009766 49.519531 A 1.0001 1.0001 0 1 0 24.240234 51.095703 L 25.816406 49.863281 A 1.0001 1.0001 0 0 0 25.203125 48.066406 z" />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token;

  if (sessionStorage.getItem("disecto__token") !== "undefined") {
    token = JSON.parse(sessionStorage.getItem("disecto__token"));
  }

  const handleLogout = () => {
    dispatch(handleUserLogout());
    navigate("/login");
  };
  return (
    <>
      <div className="w-full flex md:flex-row flex-col items-center justify-between py-4 px-1 bg-slate-800">
        <div
          className="flex items-center justify-center pl-10"
          onClick={() => navigate("/")}
        >
          <div className="cursor-pointer">
            <BrandIcon fill="#fff" />
          </div>
        </div>
        <div className="bg-darkCharcoal rounded-md mb-6 mt-6 pl-3 md:pr-10">
          <button
            onClick={() => navigate("/createcollection")}
            className="mr-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 focus:border-b-0 rounded"
          >
            create collection
          </button>
          <button
            onClick={() => navigate("/collections")}
            className="mr-0 bg-zinc-500 hover:bg-zinc-400 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 focus:border-b-0 rounded"
          >
            All collection
          </button>
          {token && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 focus:border-b-0 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export { Navbar, BrandIcon };
