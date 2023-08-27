import ToolTip from '../shared/ToolTip'
import { HiOutlineClipboardCopy, HiClipboardCopy } from 'react-icons/hi'
import { BsCloudSlash, BsFillCloudCheckFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
// Creates a single entry of a dns record


const SiteRecord = ({siteRecord, ip, site}) => {
  const { name, hostName, ttl, description, id, lookupString } = siteRecord
  const type = siteRecord.recordType.name
  let value = siteRecord.value
  if(value === 'n/a') value = null

  const [copyMessages, setCopyMessages] = useState({
    host: null,
    value: null,
  })
  // Status of connection 0 = not connected
  const [connection, setConnection] = useState(0)
  const [connectMessage, setConnectMessage] = useState(null)
  // copies data to clipboard and sets copied message
  const copyContent = (text, element) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessages({...copyMessages, [element]: true})
      setTimeout(() => {
        setCopyMessages({ ...copyMessages, [element]: false })
      }, 2000)
    }, (error) => {
      console.error('could not copy', error)
    })
  }

  useEffect(() => {
    if (lookupString !== '') {

      //TODO this whole section will need to be replaced with a backend call to a dns server
      const getRecords = async (domain) => {
        try {
        let url = `https://dns.google.com/resolve?name=${domain}&type=A`
        let compareString = ip
        switch (lookupString) {
          case null:
            url = `https://dns.google.com/resolve?name=${domain}&type=A`
            compareString = ip
            break
          case 'www':
            url = `https://dns.google.com/resolve?name=www.${domain}&type=A`
            compareString = domain
            break
          default:
            break
        } 
          const response = await fetch(url);
          const data = await response.json();
          console.log('data', data)
          
          if (data.Answer) {
            // Extract the A records from the DNS response
            
            const aRecords = data.Answer
            const rec = aRecords[0]
            if (rec.data.replace(/\.$/, '') === compareString) {
              console.log(`${rec.name} is connected to ${rec.data} TTL:${rec.TTL}`)
              setConnection(1)
              setConnectMessage(`${rec.name} is connected to ${rec.data} TTL:${rec.TTL}`)
            } else {
              setConnection(0)
              setConnectMessage(`${rec.name} is connected to ${rec.data} TTL:${rec.TTL}`)
            }
          } else {
            setConnection(-1)
            throw new Error('DNS lookup failed');
            
          }
        } catch (error) {
          setConnection(-1)
          console.log('A Record lookup error', error)
          return null;
        }
      }

      getRecords(site)
    }
  }, [])

  console.log(connection)
  
  return (
    <div className='bg-gray-100 mb-8 p-4 rounded-lg max-w-4xl' >
      <div className='flex align-middle gap-2 items-center mb-4'>
        <h2 className='font-bold'>
          {name}
        </h2>
        <ToolTip tip={description}>
          <div className='text-center bg-gray-600 hover:bg-pink-600 cursor-pointer rounded-full w-6 h-6 text-white flex justify-center'>?</div>
        </ToolTip>
        {connection > 0 &&
          <div className='flex items-center gap-2'>
            <span>Status: </span>
            {connection > 0
              ? <BsFillCloudCheckFill className='text-teal-500 text-2xl' />
              : <BsCloudSlash className={`${connection === -1 ? 'text-red-600' : 'text-grey-500'} text-2xl`} />
            }
            {connectMessage && <span className='text-teal-700 text-xs'>{connectMessage}</span>}
          </div>
        }
      </div>

      <div className="flex align-middle justify-start gap-5">
        <div className="">
          Record type: <span className='font-bold'>{type}</span>
        </div>
        <div className="record--ttl">{`Suggested TTL:`}
          <span className='font-bold'> {ttl}</span>
        </div>
      </div>

      <div
        className="flex gap-3 justify-start items-center p-4 mt-5 bg-gray-400 rounded-lg cursor-pointer group"
        id={`host-${id}`}
        onClick={() => copyContent(hostName, 'host')}
      >
        <div className="font-normal text-white text-2xl px-3 w-20">
          Host
        </div>        
        <div className="bg-gray-50  group-hover:bg-teal-300 rounded-lg p-7 grow items-center relative">
          <div className='opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 width rounded-lg bg-opacity-75 bg-white px-20 py-4 align-middle my-auto mx-auto'>{copyMessages.host ? 'Copied to clipboard' : 'Copy'}</div>
          <p className='break-all z-0'>{hostName}</p>
        </div>
        {!copyMessages.host ?
          <HiOutlineClipboardCopy onClick={() => copyContent(host)} className='min-w-fit group-hover:text-teal-600' />
          :<HiClipboardCopy className='min-w-fit text-teal-600' />
        }
      </div>

      <div
        className="flex gap-3 justify-start items-center p-4 mt-5 bg-gray-400 rounded-lg cursor-pointer group"
        id={`value-${id}`}
        onClick={() => copyContent(value ? value : ip, 'value')}
      >
        <div className="font-normal text-white text-2xl px-3 w-20">
          Value
        </div>        
        <div className="bg-gray-50  group-hover:bg-teal-300 rounded-lg p-7 grow items-center relative">
          <div className='opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 width rounded-lg bg-opacity-75 bg-white px-20 py-4 align-middle my-auto mx-auto'>{copyMessages.value ? 'Copied to clipboard' : 'Copy'}</div>
          <p className='break-all z-0'>{value ? value : ip}</p>
        </div>
        {!copyMessages.value ?
          <HiOutlineClipboardCopy onClick={() => copyContent(value)} className='min-w-fit group-hover:text-teal-600' />
          :<HiClipboardCopy className='min-w-fit text-teal-600' />
        }
      </div>
    </div>
  )

}

export default SiteRecord