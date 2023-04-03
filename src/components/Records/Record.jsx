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
        onClick={() => copyContent(hostName)}
      >
        <div className="font-normal text-white text-2xl px-3 w-20">
          Host
        </div>        
        <div className="bg-gray-50 hover:bg-teal-300 rounded-lg p-7 grow items-center peer cursor-pointer">
          <p className='break-all'>{hostName}</p>
        </div>
        <HiOutlineClipboardCopy onClick={() => copyContent(hostName)} className='min-w-fit  hover:text-teal-600  peer-hover:text-teal-600 peer cursor-pointer' />
      </div>

      <div
        className="flex gap-3 justify-start items-center p-4 mt-5 bg-gray-400 rounded-lgcursor-pointer"
        id={`value-${id}`}
        onClick={() => copyContent(value ? value : ip)}
      >
        <div className="font-normal text-white text-2xl px-3 w-20">
          Value
        </div>        
        <div className="bg-gray-50  hover:bg-teal-300 rounded-lg p-7 grow items-center peer cursor-pointer">
          <p className='break-all'>{value ? value : ip}</p>
        </div>
        <HiOutlineClipboardCopy onClick={() => copyContent(hostName)} className='min-w-fit  hover:text-teal-600  peer-hover:text-teal-600 peer cursor-pointer' />
      </div>
      

    </div>
  )

}