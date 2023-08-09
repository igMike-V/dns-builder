import { useState, useEffect } from 'react'
import templateService from '../services/templateService'
import { useNavigate } from 'react-router-dom'

import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'

import AddTemplateForm from './AddTemplateForm'
import ConfirmModal from './shared/ConfirmModal'

import Styles from './Styles/Styles'

const Templates = () => {
  
  const navigate = useNavigate()

  const [templates, settemplates] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateTemplates, setUpdateTemplates] = useState(0)

  // Delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  

  /* Load templates */
  useEffect(() => {
    const fetchtemplates = async () => {
      const templates = await templateService.getTemplates()
      if(templates) settemplates(templates)
    }
    fetchtemplates()
  }, [updateTemplates])


  if (!templates) return (
    <section className='w-full pt-7'>
      <h1>Site List: </h1>
      <p>Loading...</p>
    </section>
  )

  const handleEditClick = (id) => {
    console.log('row clicked', id)
  }

  const deleteTemplate = async (id) => {
    const response = await templateService.deleteTemplate(id)
    if (response) setUpdateTemplates(updateTemplates + 1)
    else console.log('error deleting template')
  }

  const modalOptions = {
    show: setDeleteModalOpen,
    title: 'Delete Template',
    message: 'Are you sure you want to delete this template?',
    confirmLabel: 'Yes',
    cancelLabel: 'No',
    confirmationAction: deleteTemplate,
    id: null
  }

  const handleDeleteClick = (template) => {
    console.log(template.name)
    if (!template.id) {
      return console.log('error deleting template')
    }
    modalOptions.id = template.id
    modalOptions.title = `${modalOptions.title} "${template.name}"`
    setDeleteModalOpen(true)
    console.log(deleteModalOpen)
  }

 

  return (
    <section className='w-full pt-7'>
      { deleteModalOpen && <ConfirmModal modalOptions={modalOptions} /> }
      {showAddForm && <AddTemplateForm setShowAddForm={setShowAddForm} setUpdateTemplates={setUpdateTemplates} />}
      <header className='flex flex-row justify-between'>
        <h1>DNS Templates: </h1>
        <button className='shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-3 rounded' onClick={() => setShowAddForm(true)}>Create New Template</button>
      </header>
      <section className='flex flex-row justify-between py-6'>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th className={Styles.th}>Name</th>
              <th className={Styles.th}></th>
            </tr>
          </thead>
          <tbody>
        {templates.map(template => {
          return (
            <tr className={Styles.trBody} key={template.id}>
              <td className={Styles.td} onClick={() => handleEditClick(template.id)}>{template.name}</td>
              <td className={Styles.td}>
                <div className='flex gap-2 flex-row justify-end'>
                  <HiPencilAlt className={Styles.icons} onClick={() => handleEditClick(template.id)}>Edit</HiPencilAlt>
                  <HiOutlineTrash className={Styles.icons} onClick={() => handleDeleteClick(template)}>Delete</HiOutlineTrash>
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

export default Templates