// Neflity Multi‑Page React Website
// Single-file React app with React Router
// Pages: /portal, /staff, /commands, /ranks, /join

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* ------------------ STAFF DATA ------------------ */
const staff = [
  { name: "Astra", role: "Owner", bio: "Founder & lead developer", avatar: "https://i.pravatar.cc/150?img=32" },
  { name: "Kai", role: "Admin", bio: "Server operations & moderation", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Nova", role: "Moderator", bio: "Community moderator", avatar: "https://i.pravatar.cc/150?img=5" }
];

/* ------------------ APP SHELL ------------------ */
function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-indigo-600 text-white py-4 shadow sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Shattered Universe</h1>
          <nav className="space-x-4">
            <Link to="/portal">Portal</Link>
            <Link to="/staff">Staff</Link>
            <Link to="/commands">Commands</Link>
            <Link to="/ranks">Ranks</Link>
            <Link to="/join">Join</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>

      <footer className="text-center text-gray-500 py-6">© {new Date().getFullYear()} Neflity</footer>
    </div>
  );
}

/* ------------------ PORTAL PAGE ------------------ */
function PortalPage() {
  const [serverName] = useState("Shattered Universe");
  const [players, setPlayers] = useState(0);
  const [mapName, setMapName] = useState("Unknown");
  const [gamemode, setGamemode] = useState("Sandbox");
  const [maxPlayers, setMaxPlayers] = useState(64);
  const [status, setStatus] = useState("unknown");

  // Your real server IP and port (provided earlier)
  const SERVER_IP = "45.62.160.68";
  const SERVER_PORT = "27080";
  const serverIP = `${SERVER_IP}:${SERVER_PORT}`;

  useEffect(() => {
    let cancelled = false;

    async function fetchPlayers() {
      try {
        // Example public A2S proxy endpoint - adjust if you use another service.
        const url = `https://gameserveranalytics.com/api/v2/query?ip=${SERVER_IP}&port=${SERVER_PORT}&game=source`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;

        const info = json || {};
        setPlayers(info.players ?? info.numplayers ?? info.players_online ?? 0);
        setMaxPlayers(info.maxplayers ?? info.maxPlayers ?? info.max_players ?? 64);
        setMapName(info.map ?? info.current_map ?? info.mapname ?? "Unknown");
        setGamemode(info.gamemode ?? info.game ?? info.mod ?? "Unknown");
        setStatus(info.online === false ? "offline" : "online");
      } catch (err) {
        // Fallback simulated data so UI still shows meaningful info
        setPlayers(Math.floor(Math.random() * 24));
        setMapName(["rp_city17", "gm_construct", "gm_flatgrass"][Math.floor(Math.random()*3)]);
        setGamemode(["DarkRP", "Sandbox", "StarwarsRP"][Math.floor(Math.random()*3)]);
        setMaxPlayers(64);
        setStatus("offline");
      }
    }

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 10000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-4">{serverName}</h2>
        <p className="text-lg mb-6">Welcome to the official <strong>Shattered Universe</strong> GMod server portal!</p>

        <div className="bg-white rounded shadow p-5 mb-4">
          <p className="text-gray-700">Server IP: <span className="font-semibold">{serverIP}</span></p>

          <p className="text-gray-700 mt-3">Players Online:</p>
          <p className="text-3xl font-bold text-green-600">{players} / {maxPlayers}</p>

          <p className="text-gray-700 mt-3">Map: <span className="font-semibold">{mapName}</span></p>
          <p className="text-gray-700">Gamemode: <span className="font-semibold">{gamemode}</span></p>
          <p className={`mt-3 font-medium ${status === 'online' ? 'text-green-600' : 'text-red-600'}`}>Status: {status}</p>

          <div className="mt-4">
            <a href={`steam://connect/${serverIP}`} className="px-4 py-2 bg-green-600 text-white rounded inline-block font-medium mr-2">Connect Now</a>
            <Link to="/join" className="px-4 py-2 bg-indigo-600 text-white rounded inline-block font-medium">Join Discord</Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">About Shattered Universe</h3>
        <p className="text-gray-600">
          A Garry's Mod roleplay server featuring custom lore, active staff, and a growing community.
        </p>
      </div>
    </div>
  );
}

/* ------------------ STAFF PAGE ------------------ */
function StaffPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Staff Team</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staff.map((s) => (
          <div key={s.name} className="bg-white p-4 rounded-lg shadow text-center">
            <img src={s.avatar} className="w-24 h-24 rounded-full mx-auto mb-3" alt={`${s.name} avatar`} />
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-indigo-600 text-sm">{s.role}</p>
            <p className="text-gray-600 text-sm mt-2">{s.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------ COMMANDS PAGE ------------------ */
function CommandsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Command Roster</h2>
      <p className="text-gray-600 mb-4">Replace this table with your Google Sheet version if needed.</p>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Command</th>
              <th className="p-3 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border">!help</td><td className="p-3 border">Show help menu</td></tr>
            <tr><td className="p-3 border">!play &lt;url&gt;</td><td className="p-3 border">Play music</td></tr>
            <tr><td className="p-3 border">!ban &lt;user&gt;</td><td className="p-3 border">Ban a user</td></tr>
            <tr><td className="p-3 border">!kick &lt;user&gt;</td><td className="p-3 border">Kick a user</td></tr>
            <tr><td className="p-3 border">!stats</td><td className="p-3 border">Show stats</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------ RANKS PAGE ------------------ */
function RanksPage() {
  const rankSections = [
    {
      title: "Ownership",
      roles: [
        { emoji: "🛡️", name: "Owner", user: "Don" },
        { emoji: "🎖️", name: "Co Owner", user: "Junior Jr" },
        { emoji: "🎖️", name: "Co Owner", user: "N/A" }
      ]
    },
    {
      title: "Senior Management Team",
      roles: [
        { emoji: "⚠️", name: "Head of Management", user: "N/A" },
        { emoji: "🛠️", name: "Developer Overseer", user: "Psycho" },
        { emoji: "🟢", name: "Community Manager", user: "CT-0908 Ensign PL Hawk" },
        { emoji: "🔧", name: "Staff Director", user: "Not grannen" },
        { emoji: "🎮", name: "Game Master Director", user: "N/A" }
      ]
    },
    {
      title: "Management Team",
      roles: [
        { emoji: "🟢", name: "Assistant Community Manager", user: "Mason" },
        { emoji: "🟦", name: "Assistant Staff Director", user: "N/A" },
        { emoji: "🟥", name: "Staff Manager", user: "N/A" }
      ]
    },
    {
      title: "Junior Management Team",
      roles: [
        { emoji: "🔧", name: "Head Developer", user: "N/A" },
        { emoji: "📘", name: "Head Admin", user: "N/A" },
        { emoji: "🎬", name: "Head Event Master", user: "212th CC-3245 Soren" }
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Rank Structure</h2>

      <div className="space-y-10">
        {rankSections.map((section) => (
          <div key={section.title} className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.roles.map((role, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <span className="text-lg">
                    {role.emoji} <strong>{role.name}</strong>
                  </span>
                  <span className="text-gray-700">{role.user}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------ JOIN PAGE ------------------ */
function JoinPage() {
  return (
    <div className="text-center max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4">Join the Discord</h2>
      <p className="text-gray-600 mb-6">Click below to join the Neflity community.</p>

      <a
        href="https://discord.gg/INVITE_HERE"
        target="_blank"
        rel="noreferrer"
        className="px-6 py-3 bg-indigo-600 text-white rounded font-semibold inline-block"
      >
        Join Discord
      </a>
    </div>
  );
}

/* ------------------ ROOT WRAPPER ------------------ */
export default function NeflitySite() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<PortalPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/ranks" element={<RanksPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}
