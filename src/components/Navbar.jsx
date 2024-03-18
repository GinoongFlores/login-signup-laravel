import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, getUser, logout } = useAuthContext();
  // console.log(user.data?.name);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser, user]);

  return (
    <>
      <nav className="bg-gray-900 dark:text-white">
        <div className="flex justify-around items-center">
          <div>
            <h1 className="text-3xl">Welcome! {user?.name.toUpperCase()}</h1>
          </div>

          <div>
            <ul className="flex gap-8">
              <li>
                <button onClick={logout}> Logout </button>
              </li>
              {/* <li>Login</li> */}
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
