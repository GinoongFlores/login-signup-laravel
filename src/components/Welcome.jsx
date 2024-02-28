import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <section className="bg-gray-900 dark:text-white">
        <div className="flex justify-around items-center">
          <div>
            <h1 className="text-3xl">Welcome!</h1>
          </div>

          <div>
            <ul className="flex gap-8">
              <li>Logout</li>
              {/* <li>Login</li> */}
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
