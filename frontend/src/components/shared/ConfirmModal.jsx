import { useConfirm } from './ConfirmContext'
import { HiOutlineX } from 'react-icons/hi'

const ConfirmModal = () => {
  const { heading, message, isOpen, proceed, cancel } = useConfirm()

  if (!isOpen) return null

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50  bg-black bg-opacity-75">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="rounded-lg shadow-lg relative flex flex-col w-full p-1 bg-white">
          <div className="flex flex-row justify-end">
            <HiOutlineX className="text-2xl cursor-pointer" onClick={cancel} />
          </div>
          <div className="flex flex-col gap-2 p-9">
            <h3 className="text-3xl font-semibold">{heading}</h3>
            <p className="text-gray-600 text-lg">{message}</p>
            <div className="flex gap-2 pb-8">
              <button
                className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                onClick={proceed}
              >
                Yes
              </button>
              <button
                className="shadow bg-orange-600 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                onClick={cancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
