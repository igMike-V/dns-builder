import { copyContent } from '../../utilities/utilities'
import { HiOutlineClipboardCopy, HiClipboardCopy } from 'react-icons/hi'
import { useState } from 'react'
// Creates a single entry of a dns record
export const Record = ({ recordContent, ip }) => {
  const { record, type, hostName, value, ttl, description, id } = recordContent
  const [hover, setHover] = useState({
    host: false,
    value: false,
  })

  const handleHover = (targetId) => {
    setHover({ ...hover, [targetId.split('-')[0]]: true })
  }
  
  const handleLeave = (targetId) => {
    setHover({...hover, [targetId.split('-')[0]]: false})
  }

  return (
    <div className='bg-gray-100 mb-8 p-4 rounded-lg max-w-4xl' >
      <div className='flex align-middle gap-2 items-center mb-4'>
        <h2 className='font-bold'>
          {record}
        </h2>
        <div className='text-center bg-gray-600 hover:bg-pink-600 cursor-pointer rounded-full w-6 h-6 text-white flex justify-center'>?</div>
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
        className="flex gap-3 justify-start items-center p-4 mt-5 bg-gray-400 rounded-lg cursor-pointer"
        id={`host-${id}`}
        onMouseEnter={(e) => handleHover(e.target.id)}
        onMouseLeave={(e) => handleLeave(e.target.id)}
        onClick={() => copyContent(hostName)}
      >
        <div className="font-normal text-white text-2xl px-3 w-20">
          Host
        </div>        
        <div className={`${hover.host ? 'bg-teal-100' : 'bg-gray-50'} rounded-lg p-7 grow items-center` }>
          <p className='break-all'>{hostName}</p>
        </div>
        <HiOutlineClipboardCopy className={`${hover.host ? 'text-teal-600' : 'text-white'} min-w-fit`} />
      </div>

      <div
        className="flex gap-3 justify-start items-center p-4 mt-5 bg-gray-400 rounded-lg cursor-pointer"
        id={`value-${id}`}
        onMouseEnter={(e) => handleHover(e.target.id)}
        onMouseLeave={(e) => handleLeave(e.target.id)}
        onClick={() => copyContent(value ? value : ip)}
      >
        <div className="font-normal text-white text-2xl px-3 w-20">
          Value
        </div>        
        <div className={`${hover.value ? 'bg-teal-100' : 'bg-gray-50'} rounded-lg p-7 grow items-center` }>
          <p className='break-all'>{value ? value : ip}</p>
        </div>
        <HiOutlineClipboardCopy className={`${hover.value ? 'text-teal-600' : 'text-white'} min-w-fit`} />
      </div>
      

    </div>
  )

}