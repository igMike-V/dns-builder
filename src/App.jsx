import {Records} from './components/Records/Records'
import { MainForm } from './components/MainForm'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

function App() {

  const ip = urlParams.get('ip')
  const site = urlParams.get('domain')

  return (
    <section className='flex-col max-w-6xl '>
      <header className='flex items-center justify-between p-5'>
        <div id="logo">
          <img src='/logo.png' className="w-48"></img>
        </div>
        <p className=' align-middle text-2xl font-light'>DNS records { site ? `for ${site}` : ' for hosted sites' }</p>
      </header>
      {ip && ip != '' ? <Records ipAddress={ip} /> : <MainForm/> }
      
    </section>
  )
}

export default App
