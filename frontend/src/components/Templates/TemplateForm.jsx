import { useState } from 'react'
import templateService from '../../services/templateService'

const TemplateForm = ({
  setShowAddForm,
  setUpdateTemplates,
  editTemplate,
  setEditTemplate
}) => {
  const [inputs, setInputs] = useState({
    name: {
      value: editTemplate ? editTemplate.name : '',
      error: false,
      errorMessage: ''
    }
  })

  const handleChange = (e) => {
    const targetField = e.target.name
    const targetValue = e.target.value
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [targetField]: {
          ...prevInputs[targetField],
          value: targetValue,
          error: false,
          errorMessage: ''
        }
      }
    })
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setEditTemplate(null)
    setShowAddForm(false)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    let valid = true
    if (!validateName(inputs.name.value)) {
      valid = false
      setInputs((prevInputs) => {
        return {
          ...prevInputs,
          name: {
            ...prevInputs.name,
            error: true,
            errorMessage:
              'Invalid template name - template name must be more then 3 characters long'
          }
        }
      })
    }
    if (valid) {
      /* All imputs validate lets submit */
      const template = {
        name: inputs.name.value
      }
      /* Check if the form is in update or new template mode */
      if (editTemplate) {
        await templateService.updateTemplate(editTemplate.id, template)
        setEditTemplate(null)
      } else {
        await templateService.addTemplate(template)
      }
      setShowAddForm(false)
      setUpdateTemplates((prev) => prev + 1)
    }
  }

  const validateName = (text) => {
    if (text.length > 3) return true
    return false
  }

  return (
    <>
      <h2>Add a template</h2>
      <form className="w-full pt-7">
        <div className="mb-6 md:items-center">
          <div className="">
            <label className="block pr-4 mb-1 font-bold text-gray-500 md:mb-0">
              Template Name
            </label>
          </div>
          <div className="">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-teal-500"
              type="text"
              name="name"
              value={inputs.name.value}
              onChange={(e) => handleChange(e)}
            />
            {inputs.name.error && (
              <p className="text-red-700">{inputs.name.errorMessage}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 pb-8">
          <button
            className="px-4 py-2 font-bold text-white bg-teal-600 rounded shadow hover:bg-teal-400 focus:shadow-outline focus:outline-none"
            onClick={(e) => handleClick(e)}
          >
            {editTemplate ? 'Edit Template' : 'Add template'}
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-orange-600 rounded shadow hover:bg-orange-400 focus:shadow-outline focus:outline-none"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
        </div>
        <hr className="py-8" />
      </form>
    </>
  )
}

export default TemplateForm
