import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ me }) {
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="flex items-center justify-between py-4 px-6 bg-black/50 border-b border-purple-700 shadow-neon">
      <div className="flex items-center gap-4">
        <div className="neon-text text-xl font-bold">⚡ NFT Cyber</div>
        <div className="text-sm text-gray-300">TON edition</div>
      </div>

      <nav className="flex items-center gap-4">
        <Link to="/dashboard" className="px-3 py-1 rounded hover:text-neonCyan transition">Dashboard</Link>
        <Link to="/market" className="px-3 py-1 rounded hover:text-neonPink transition">Marketplace</Link>
        <Link to="/deposit" className="px-3 py-1 rounded hover:text-neonGreen transition">Deposit</Link>
        <Link to="/withdraw" className="px-3 py-1 rounded hover:text-neonBlue transition">Withdraw</Link>
        <Link to="/admin" className="px-3 py-1 rounded hover:text-yellow-300 transition">Admin</Link>
        {me ? <div className="ml-4 text-sm text-gray-200">Hi, {me.username || me.firstName}</div> : <Link to="/login">Login</Link>}
      </nav>
    </motion.header>
  );
}
