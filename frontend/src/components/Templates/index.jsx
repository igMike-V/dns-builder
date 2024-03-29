import { useState, useEffect } from 'react'
import { useConfirm } from '../shared/ConfirmContext'

import templateService from '../../services/templateService'

import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import TemplateForm from './TemplateForm'
import styles from '../styles'

const Templates = () => {
  const { isConfirmed } = useConfirm()

  const [templates, setTemplates] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateTemplates, setUpdateTemplates] = useState(0)
  const [editTemplate, setEditTemplate] = useState(null)

  /* Load templates */
  useEffect(() => {
    const fetchtemplates = async () => {
      const templates = await templateService.getTemplates()
      if (templates) setTemplates(templates)
    }
    fetchtemplates()
    console.log('templates set')
  }, [updateTemplates])

  if (!templates)
    return (
      <section className="w-full pt-7">
        <h1>Site List: </h1>
        <p>Loading...</p>
      </section>
    )

  const handleEditClick = (template) => {
    setEditTemplate(template)
    setShowAddForm(true)
  }

  const handleDeleteClick = async (template) => {
    try {
      const confirmMessage = await isConfirmed(
        `Delete Template ${template.name}`,
        `Are you sure you want to delete the template:  "${template.name}"`
      )
      if (confirmMessage) {
        await templateService.deleteTemplate(template.id)
        setUpdateTemplates((prev) => prev + 1)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="w-full pt-7">
      {showAddForm && (
        <TemplateForm
          setShowAddForm={setShowAddForm}
          setUpdateTemplates={setUpdateTemplates}
          editTemplate={editTemplate}
          setEditTemplate={setEditTemplate}
        />
      )}
      <header className="flex flex-row justify-between">
        <h1>DNS Templates: </h1>
        <button
          className={styles.buttons.primary}
          onClick={() => setShowAddForm(true)}
        >
          Create New Template
        </button>
      </header>
      <section className="flex flex-row justify-between py-6">
        <table className={styles.table.table}>
          <thead>
            <tr>
              <th className={styles.table.th}>Name</th>
              <th className={styles.table.th}></th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => {
              return (
                <tr className={styles.table.trBody} key={template.id}>
                  <td
                    className={styles.table.td}
                    onClick={() => handleEditClick(template.id)}
                  >
                    {template.name}
                  </td>
                  <td className={styles.table.td}>
                    <div className="flex gap-2 flex-row justify-end">
                      <HiPencilAlt
                        className={styles.icons}
                        onClick={() => handleEditClick(template)}
                      >
                        Edit
                      </HiPencilAlt>
                      <HiOutlineTrash
                        className={styles.icons}
                        onClick={() => handleDeleteClick(template)}
                      >
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

export default Templates
