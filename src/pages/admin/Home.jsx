import CountCard from "../../components/CountCard";

const Home = () => {
  const cards = [
    {
      count: 1,
      title: "Companies",
    },
    {
      count: 2,
      title: "Users",
    },
    {
      count: 3,
      title: "Admins",
    },
  ];
  return (
    <div>
      <div className="py-10 flex flex-wrap items-center justify-center gap-4">
        {cards.map((card, index) => (
          <CountCard key={index} title={card.title} count={card.count} />
        ))}
      </div>
    </div>
  );
};

export default Home;
