import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Brezze from "./templates/Brezze";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Rose from "./templates/Rose";
import PurpleHaze from "./templates/PurpleHaze";
import SkyPetals from "./templates/SkyPetals";
import RoyalGold from "./templates/RoyalGold";
import SweetBlush from "./templates/SweetBlush";
import RoyalBlue from "./templates/RoyalBlue";
import Mocha from "./templates/Mocha";
import RusticBrown from "./templates/RusticBrown";
import TamuUndangan from "./pages/TamuUndangan";
import { HelmetProvider } from "react-helmet-async";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admindatangwoi/larabeyek" element={<Admin />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/rose/:slug/:tamu" element={<Rose />} />
          <Route path="/brezze/:slug/:tamu" element={<Brezze />} />
          <Route path="/mocha/:slug/:tamu" element={<Mocha />} />
          <Route path="/purple-haze/:slug/:tamu" element={<PurpleHaze />} />
          <Route path="/sky-petals/:slug/:tamu" element={<SkyPetals />} />
          <Route path="/royal-gold/:slug/:tamu" element={<RoyalGold />} />
          <Route path="/royal-blue/:slug/:tamu" element={<RoyalBlue />} />
          <Route path="/sweet-blush/:slug/:tamu" element={<SweetBlush />} />
          <Route path="/rustic-brown/:slug/:tamu" element={<RusticBrown />} />
          <Route path="/tamu-undangan/:slug" element={<TamuUndangan />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
