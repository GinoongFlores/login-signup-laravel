import Navbar from "./Navbar";
import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <section>
        <div className="max-w-sm p-6 rounded-lg bg-white">
          <div>
            <h2 className="text-2xl">
              Name: <span></span>
            </h2>
            <h2 className="text-2xl">
              Email: <span></span>
            </h2>
          </div>
          <div className="test"></div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
