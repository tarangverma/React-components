import './App.css'
import GiftCardAnimation from './components/CardSuffle'
import CardCarousel from './components/CircularSlider'
import Hero from './components/CosmosParticles'
// import HeroSection from './components/MotionImages'
// import HoverBook from './components/BookStack'
// import Scene from './components/Scene'
// import HUD from './components/Hud'
// import New from './components/ParticlesCosmos'
// import AppleScene from './components/AppleScene'
// import EnergyInChaos from './components/Energy'
import EnvelopeAnimation from './components/Letter'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LinkedInGlassCard from './components/LinkedinGlass'
import TarangSite from './components/HeroDesign'
import BubbleManipulator from './components/BubbleSimulation'
import ShinyCards from './components/ShinyCards'
import HourGlass from './components/HourGlasses'
import AngryJelly from './components/AngryJelly'
import CurvePathAnimator from './components/CSSMOTION'
function App() {

  return (
    <Routes>
      <Route path="/" element={<HourGlass />} />
      <Route path="/projects" element={<CardCarousel />} />
      {/* <New /> */}
      {/* <CardCarousel /> */}
      {/* <HeroSection /> */}
      {/* <HoverBook /> */}
      {/* <AppleScene /> */}
      {/* <EnergyInChaos /> */}

    </Routes>


  )
}

export default App
