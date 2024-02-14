import pizzaicon from 'assets/favicon-pizza.webp';
import SearchPizzeria from './searchPizzeria/SearchPizzeria';

const Home = () => {
  return (
    <div className="flex flex-col justify-around gap-10 h-full w-full">
      <div className="flex items-center justify-center gap-1">
        <h1>PIZZA FINDER</h1>
        <img className="w-10" src={pizzaicon} alt="Pizza icon" />
      </div>
      <SearchPizzeria />
    </div>
  );
};

export default Home;
