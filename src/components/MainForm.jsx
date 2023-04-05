import { useState } from 'react'
import { copyContent } from '../utilities/utilities'


export const MainForm = () => {
  const [inputs, setInputs] = useState({
    ip: '',
    domain:''
  })

  const handleCopy = () => {
    //TODO Validation
    copyContent(`${document.location.origin}/?ip=${inputs.ip}&domain=${inputs.domain}`)
  }
  const handleClick = () => {
    //TODO Validation
  }

  const validateIP = (ip) => {
    try { 
      const address = new URL(`http://${ip}`).hostname
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
 
  const validateDomain = (domain) => {
    if (domain.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/)) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='bg-gray-100 mb-8 p-4 rounded-lg max-w-4xl' >
      <div className='flex align-middle gap-2 items-center mb-4'>
        <h1 className="font-bold">Let's get your site connected.</h1>
        </div>
      <p>Type in your domain name and the ip address we supplied you to get DNS records required to connect to your application</p>
      <form className='w-full pt-7'>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              IP Address
            </label>
          </div>
          <div className="" >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                type="text" name="ip" value={inputs.ip} onChange={(e) => setInputs({ ...inputs, ip: e.target.value })}
            />
          </div>
        </div>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Domain Name (optional)
            </label>
          </div>
          <div className="" >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                type="text" name="domain" value={inputs.domain} onChange={(e) => setInputs({...inputs, domain: e.target.value}) }
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <button className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Show Settings</button>
          <button className="shadow bg-gray-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleCopy}>Copy Link</button>
        </div>
        
      </form>
    </div>
  )
}

