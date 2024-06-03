import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { ShoppingCartOutlined as BuyIcon } from "@mui/icons-material";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"; // Import Link
import { useNavigate } from "react-router"; // Import useNavigate from react-router
import "./Dashboard.css";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchasedCoins, setPurchasedCoins] = useState([]);
  const navigate = useNavigate(); // Use useNavigate from react-router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleBuyNow = (coin) => {
    setSelectedCoin(coin);
    setPurchaseAmount(0);
  };

  const handleSavePurchase = () => {
    setPurchasedCoins([...purchasedCoins, { ...selectedCoin, amount: purchaseAmount }]);
    setSelectedCoin(null);
  };

  const getPriceColor = (coin) => {
    if (coin.current_price > coin.market_cap) {
      return "green";
    } else {
      return "red";
    }
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    navigate(`/coin/${coin.id}`); // Navigate to the coin details screen using useNavigate
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Cryptocurrency Dashboard</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price (INR)</th>
            <th>Market Cap (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} >
              <td>
                <img onClick={() => handleCoinClick(coin)} src={coin.image} alt={coin.name} className="coin-icon" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td style={{ color: getPriceColor(coin) }}>₹{coin.current_price.toFixed(2)}</td>
              <td>₹{coin.market_cap.toLocaleString()}</td>
              <td>
                <Button variant="outlined" color="primary" startIcon={<BuyIcon />} onClick={() => handleBuyNow(coin)}>
                  Buy Now
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <Button onClick={prevPage} disabled={page === 1} variant="contained">
          Previous Page
        </Button>
        <Button onClick={nextPage} variant="contained">Next Page</Button>
      </div>

      {selectedCoin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedCoin(null)}>&times;</span>
            <h2>Buy {selectedCoin.name}</h2>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
            />
            <Button variant="contained" onClick={handleSavePurchase}>Save Purchase</Button>
          </div>
        </div>
      )}

      <div className="purchased-coins">
        <h2>Purchased Coins</h2>
        <ul>
          {purchasedCoins.map((coin, index) => (
            <li key={index}>{coin.name} - Amount: {coin.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
