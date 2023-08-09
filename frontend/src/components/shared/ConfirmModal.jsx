
import {HiOutlineX} from 'react-icons/hi'


const ConfirmModal = ({ setVisible, title, Message }) => {
  console.log('modalOptions', modalOptions)
  const { show, title, message, confirmLabel, cancelLabel, confirmationAction } = modalOptions
  let { id } = modalOptions
  const handleConfirm = (e) => {
    e.preventDefault()
    const deleteId = id
    id =  null
    confirmationAction(deleteId)
    show(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    show(false)
  }

  if (open === false) return null

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50  bg-black bg-opacity-75">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
      <div className="rounded-lg shadow-lg relative flex flex-col w-full p-1 bg-white">
        <div className='flex flex-row justify-end'>
          <HiOutlineX className='text-2xl cursor-pointer' onClick={(e) => handleCancel(e)} />
        </div>
        <div className='flex flex-col gap-2 p-9'>
          <h3 className="text-3xl font-semibold">
            {title} "{}"
          </h3>
          <p className="text-gray-600 text-lg">
            {message}
          </p>
          <div className='flex gap-2 pb-8'>
            <button className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={(e) => handleConfirm(e)}>Yes</button>
            <button className="shadow bg-orange-600 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={(e) => handleCancel(e)}>No</button>
          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default ConfirmModal