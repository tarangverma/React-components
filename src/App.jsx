import './App.css'
import CardCarousel from './components/CircularSlider'
import HeroSection from './components/MotionImages'
import HoverBook from './components/BookStack'
import Scene from './components/Scene'
import HUD from './components/Hud'
import New from './components/New'

function App() {

  return (
  
    <div style={{ position: 'fixed', inset: 0, background: 'black' }}>
      {/* <New /> */}
      {/* <CardCarousel /> */}
      {/* <HeroSection /> */}
      <HoverBook />
    </div>
  )
}

export default App
