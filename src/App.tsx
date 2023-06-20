import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import GamePage from "./pages/game/GamePage";
import AboutPage from "./pages/about/AboutPage";
import GamePhaserPage from "./pages/game_phaser/GamePhaserPage";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<GamePhaserPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
