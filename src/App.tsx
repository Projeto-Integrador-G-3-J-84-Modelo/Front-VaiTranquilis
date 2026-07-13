import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'
import Home from './pages/home/Home'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  )
}