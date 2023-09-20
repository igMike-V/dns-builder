import ToolTip from '../shared/ToolTip'
import { HiOutlineClipboardCopy, HiClipboardCopy } from 'react-icons/hi'
import { BsCloudSlash, BsFillCloudCheckFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
// Creates a single entry of a dns record

const SiteRecord = ({ siteRecord, ip, site }) => {
  const { name, hostName, ttl, description, id, lookupString } = siteRecord
  const type = siteRecord.recordType.name
  let value = siteRecord.value
  if (value === 'n/a') value = null

  const [copyMessages, setCopyMessages] = useState({
    host: null,
    value: null
  })
  // Status of connection 0 = not connected
  const [connection, setConnection] = useState(0)
  const [connectMessage, setConnectMessage] = useState(null)
  // copies data to clipboard and sets copied message
  const copyContent = (text, element) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyMessages({ ...copyMessages, [element]: true })
        setTimeout(() => {
          setCopyMessages({ ...copyMessages, [element]: false })
        }, 2000)
      },
      (error) => {
        console.error('could not copy', error)
      }
    )
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
          const response = await fetch(url)
          const data = await response.json()
          console.log('data', data)

          if (data.Answer) {
            // Extract the A records from the DNS response

            const aRecords = data.Answer
            const rec = aRecords[0]
            if (rec.data.replace(/\.$/, '') === compareString) {
              console.log(
                `${rec.name} is connected to ${rec.data} TTL:${rec.TTL}`
              )
              setConnection(1)
              setConnectMessage(
                `${rec.name} is connected to ${rec.data} TTL:${rec.TTL}`
              )
            } else {
              setConnection(0)
              setConnectMessage(
                `${rec.name} is connected to ${rec.data} TTL:${rec.TTL}`
              )
            }
          } else {
            setConnection(-1)
            throw new Error('DNS lookup failed')
          }
        } catch (error) {
          setConnection(-1)
          console.log('A Record lookup error', error)
          return null
        }
      }

      getRecords(site)
    }
  }, [])

  console.log(connection)

  return (
    <div className="pt-4 mb-8 bg-gray-100 rounded-lg">
      <div className="flex flex-col gap-2 mb-4 sm:items-center sm:align-middle sm:flex-row">
        <div className='flex flex-row items-center gap-2'>
        <h2 className="font-bold">{name}</h2>
        <ToolTip tip={description}>
          <div className="flex justify-center w-6 h-6 text-center text-white bg-gray-600 rounded-full cursor-pointer hover:bg-pink-600">
            ?
          </div>
        </ToolTip>
        </div>
        {connection > 0 && (
          <div className="flex items-center gap-2">
            <span>Status: </span>
            {connection > 0 ? (
              <BsFillCloudCheckFill className="text-2xl text-teal-500" />
            ) : (
              <BsCloudSlash
                className={`${
                  connection === -1 ? 'text-red-600' : 'text-grey-500'
                } text-2xl`}
              />
            )}
            {connectMessage && (
              <span className="text-xs text-teal-700">{connectMessage}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-start gap-5 align-middle">
        <div className="">
          Record type: <span className="font-bold">{type}</span>
        </div>
        <div className="record--ttl">
          {`Suggested TTL:`}
          <span className="font-bold"> {ttl}</span>
        </div>
      </div>

      <div
        className="flex flex-col justify-start gap-3 p-2 mt-5 bg-gray-400 rounded-lg cursor-pointer sm:items-center sm:p-4 sm:flex-row group"
        id={`host-${id}`}
        onClick={() => copyContent(hostName, 'host')}
      >
        <div className="w-20 px-3 text-2xl font-normal text-white">Host</div>
        <div className="relative items-center rounded-lg bg-gray-50 group-hover:bg-teal-300 p-7 grow">
          <div className="absolute z-10 px-6 py-4 mx-auto my-auto align-middle transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-lg opacity-0 sm:px-20 group-hover:opacity-100 top-1/2 left-1/2 width">
            {copyMessages.host ? 'Copied to clipboard' : 'Copy'}
          </div>
          <p className="z-0 break-all">{hostName}</p>
        </div>
        {!copyMessages.host ? (
          <HiOutlineClipboardCopy
            onClick={() => copyContent(host)}
            className="hidden sm:block min-w-fit group-hover:text-teal-600"
          />
        ) : (
          <HiClipboardCopy className="text-teal-600 min-w-fit" />
        )}
      </div>

      <div
        className="flex flex-col justify-start gap-3 p-2 mt-5 bg-gray-400 rounded-lg cursor-pointer sm:items-center sm:p-4 sm:flex-row group"
        id={`value-${id}`}
        onClick={() => copyContent(value ? value : ip, 'value')}
      >
        <div className="w-20 px-3 text-2xl font-normal text-white">Value</div>
        <div className="relative items-center rounded-lg bg-gray-50 group-hover:bg-teal-300 p-7 grow">
          <div className="absolute z-10 px-6 py-4 mx-auto my-auto align-middle transform -translate-y-1/2 bg-white bg-opacity-75 rounded-lg opacity-0 -translate-x-2/4 px:4 sm:px-20 group-hover:opacity-100 top-1/2 left-1/2 width">
            {copyMessages.value ? 'Copied to clipboard' : 'Copy'}
          </div>
          <p className="z-0 break-all">{value ? value : ip}</p>
        </div>
        {!copyMessages.value ? (
          <HiOutlineClipboardCopy
            onClick={() => copyContent(value)}
            className="hidden sm:block min-w-fit group-hover:text-teal-600"
          />
        ) : (
          <HiClipboardCopy className="text-teal-600 min-w-fit" />
        )}
      </div>
    </div>
  )
}

export default SiteRecord
