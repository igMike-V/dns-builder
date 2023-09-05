import { useState, useEffect } from 'react'
import recordService from '../../services/recordService'
import { useNavigate } from 'react-router-dom'

import { useConfirm } from '../shared/ConfirmContext'
import { HiPencilAlt,  HiOutlineTrash } from 'react-icons/hi'
import RecordForm from './RecordForm'
import styles from '../styles'

const Records = () => {
  const { isConfirmed } = useConfirm()
  const [records, setRecords] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateRecords, setUpdateRecords] = useState(0)
  const [editRecord, setEditRecord] = useState(null)

  const newRecord = () => {
    setShowAddForm(true)
  }

  /* Load records */
  useEffect(() => {
    console.log('Records: useEffect')
    const fetchRecords = async () => {
      const allRecords = await recordService.get()
      if (allRecords) {
        console.log('Records: useEffect: allRecords', allRecords)
        setRecords(allRecords)
      }
    }
    fetchRecords()
  }, [updateRecords])

  if (!records) return (
    <section className='w-full pt-7'>
      <h1>Records List: </h1>
      <p>Loading...</p>
    </section>
  )

  const handleEditClick = async(record) => {
    await setEditRecord(record.id)
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
      { showAddForm && <RecordForm setShowAddForm={setShowAddForm} setUpdateRecords={setUpdateRecords} records={records} setRecords={setRecords} setEditRecord={setEditRecord} editRecord={editRecord} /> }
      <header className='flex flex-row justify-between'>
        <h1>Record List: </h1>
        {!showAddForm && <button className={styles.buttons.primary} onClick={newRecord}>Add Record</button>}
      </header>
      <section className='flex flex-row justify-between py-6'>
        <table className={styles.table.table}>
          <thead>
            <tr>
              <th className={styles.table.th}>Type</th>
              <th className={styles.table.th}>Name</th>
              <th className={styles.table.th}>Value</th>
              <th className={styles.table.th}></th>
            </tr>
          </thead>
          <tbody>
        {records.map(record => {
          return (
            <tr className={styles.table.trBody} key={record.id}>
              <td className={styles.table.td}>{record.recordType.name}</td>
              <td className={styles.table.td}>{record.name}</td>
              <td className={styles.table.td}>{record.value}</td>
              <td className={styles.table.td}>
                <div className='flex flex-row justify-end gap-2'>
                  <HiPencilAlt 
                    className={styles.icons} 
                    onClick={() => handleEditClick(record)}
                  >
                    Edit
                  </HiPencilAlt>
                  <HiOutlineTrash
                    className={styles.icons} 
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