import './App.css'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import Grid from './components/Grid'

function App() {
  return (
    <div className='appbody'>
      <AppBar />
      <Grid width={5} height={5}/>
      <Footer />
    </div>
  )
}

export default App
