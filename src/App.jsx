import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

function App() {
  return (
    <main className="min-h-screen w-screen overflow-hidden bg-black">
      <Navbar />
      <Hero />
      <Projects />
    </main>
  )
}

export default App
