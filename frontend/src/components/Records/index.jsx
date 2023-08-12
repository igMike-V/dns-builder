import { useState, useEffect } from 'react'
import { copyContent } from '../../utilities/utilities'
import recordService from '../../services/recordService'
import { useNavigate } from 'react-router-dom'

import { useConfirm } from '../shared/ConfirmContext'
import { HiPencilAlt, HiClipboardCopy, HiOutlineTrash } from 'react-icons/hi'
import RecordForm from './RecordForm'
import Styles from '../Styles/Styles'

const Records = () => {
  const { isConfirmed } = useConfirm()
  
  const navigate = useNavigate()

  const [records, setRecords] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateRecords, setUpdateRecords] = useState(0)
  const [editRecord, setEditRecord] = useState(null)

  const newRecord = () => {
    setShowAddForm(true)
  }


  /* Load records */
  useEffect(() => {
    const fetchRecords = async () => {
      const Records = await recordService.get()
      if(Records) setRecords(Records)
    }
    fetchRecords()
  }, [updateRecords])


  if (!records) return (
    <section className='w-full pt-7'>
      <h1>Records List: </h1>
      <p>Loading...</p>
    </section>
  )

  const handleEditClick = (record) => {
    setEditRecord(record)
    setShowAddForm(true)
  }

  const handleDeleteClick = async (record) => {
    try {
      const confirmMessage = await isConfirmed(`Delete record ${record.name}`, `Are you sure you want to delete the record:  "${record.name}"`)
      if (confirmMessage) {
        await recordService.remove((record.id))
        setUpdateRecords(prev => prev + 1)
      }
    } catch (err) {
      console.error(err)
    } 
  }

  return (
    <section className='w-full pt-7'>
      { showAddForm && <RecordForm setShowAddForm={setShowAddForm} setUpdateRecords={setUpdateRecords} setEditRecord={setEditRecord} editRecord={editRecord} /> }
      <header className='flex flex-row justify-between'>
        <h1>Record List: </h1>
        {!showAddForm && <button className='shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded' onClick={newRecord}>Add Record</button>}
      </header>
      <section className='flex flex-row justify-between py-6'>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th className={Styles.th}>Name</th>
              <th className={Styles.th}>Domain</th>
              <th className={Styles.th}></th>
            </tr>
          </thead>
          <tbody>
        {records.map(record => {
          return (
            <tr className={Styles.trBody} key={record.id}>
              <td className={Styles.td}>{record.name}</td>
              <td className={Styles.td}>{record.domain}</td>
              <td className={Styles.td}>
                <div className='flex gap-2 flex-row justify-end'>
                  <HiPencilAlt 
                    className={Styles.icons} 
                    onClick={() => handleEditClick(record)}
                  >
                    Edit
                  </HiPencilAlt>
                  <HiOutlineTrash
                    className={Styles.icons} 
                    onClick={() => handleDeleteClick(record)}>
                      Delete
                  </HiOutlineTrash>
                </div>
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
        </section>
    </section>
  )
}

export default Records