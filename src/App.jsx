import {Records} from './components/Records/Records'
import { MainForm } from './components/MainForm'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

function App() {

  const ip = urlParams.get('ip')
  const site = urlParams.get('domain')

  // base tester to check for domain Connection

  /*
  1 : A record (IPv4 address)
2 : NS record (name server)
5 : CNAME record (canonical name)
6 : SOA record (start of authority)
15: MX record (mail exchange)
16: TXT record (text)
28: AAAA record (IPv6 address)
33: SRV record (service)

*/
  

  return (
    <section className='flex-col max-w-6xl '>
      <header className='flex items-center justify-between p-5'>
        <div id="logo">
          <a href={document.location.origin} >
          <img src='/logo.png' className="w-48"></img>
          </a>
        </div>
        <p className=' align-middle text-2xl font-light'>DNS records { site ? `for ${site}` : ' for hosted sites' }</p>
      </header>
      {ip && ip != '' ? <Records ipAddress={ip} site={site} /> : <MainForm/> }
      
    </section>
  )
}

export default App
