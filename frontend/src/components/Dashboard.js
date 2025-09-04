import React from "react";

export default function Dashboard({ me }) {
  return (
    <div className="cyber-card">
      <h1 className="glitch" data-text="Dashboard">Dashboard</h1>
      <p>👤 {me.firstName} {me.lastName}</p>
      <p>💳 Balance: <span className="neon">{me.balance} TON</span></p>
    </div>
  );
}
