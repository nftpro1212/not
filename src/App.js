import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import telegramAuth from "./telegram/telegram";
import axios from "axios";

const API = "http://localhost:4000";

export default function App() {
  const [token, setToken] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    const tgData = telegramAuth();
    if (tgData) {
      axios.post(`${API}/api/auth/login`, {
        telegramId: tgData.id,
        username: tgData.username,
        firstName: tgData.first_name,
        lastName: tgData.last_name
      })
      .then(res => {
        setToken(res.data.token);
        setMe(res.data.user);
      })
      .catch(err => {
        console.error("Auth error:", err);
      });
    }
  }, []);

  if (!me) return <div className="loading">⏳ Loading Cyberpunk UI...</div>;

  return (
    <BrowserRouter>
      <div className="cyberpunk-app">
        <nav className="navbar">
          <Link to="/" className="nav-link">🏠 Dashboard</Link>
          <Link to="/market" className="nav-link">🛒 Marketplace</Link>
          <Link to="/deposit" className="nav-link">💰 Deposit</Link>
          <Link to="/withdraw" className="nav-link">📤 Withdraw</Link>
        </nav>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard me={me} token={token} />} />
            <Route path="/market" element={<Marketplace me={me} token={token} />} />
            <Route path="/deposit" element={<Deposit me={me} token={token} />} />
            <Route path="/withdraw" element={<Withdraw me={me} token={token} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
