import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const onSubmit = (event) => {
    event.preventDefault();
    if (money === "") {
      return;
    }
    let myMoney = Number(money);
    setMoney("");
  };
  const onChange = (event) => {
    setMoney(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <form onSubmit={onSubmit}>
        <input
          value={money}
          type="text"
          onChange={onChange}
          placeholder="Write you have money "
        ></input>

        <p>{Number(money) / coin.quotes.USD.price}</p>
      </form>
    </div>
  );
}

export default App;
