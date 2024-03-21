const CountCard = ({ title, count }) => {
  return (
    <>
      <div
        href="#"
        className="block w-[150px] max-w-sm p-6 bg-white border-none border-gray-200 rounded-lg shadow  dark:bg-gray-300 dark:border-gray-700 "
      >
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">
          {count}
        </h2>
        <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">
          {title}
        </p>
      </div>
    </>
  );
};

export default CountCard;
