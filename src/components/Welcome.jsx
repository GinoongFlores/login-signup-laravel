import Navbar from "./Navbar";

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
        </div>
      </section>
    </>
  );
};

export default Welcome;
