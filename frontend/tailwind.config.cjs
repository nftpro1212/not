module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neonPink: "#ff00ff",
        neonCyan: "#00ffff",
        neonGreen: "#39ff14",
        neonBlue: "#3b82f6",
        darkBg: "#07070a"
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,255,255,0.08), 0 0 40px rgba(255,0,255,0.06)"
      }
    }
  },
  plugins: []
};
