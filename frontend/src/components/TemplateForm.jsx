import { useState } from 'react'
import templateService from '../services/templateService'


const TemplateForm = ({setShowAddForm, setUpdateTemplates, editTemplate, setEditTemplate}) => {

  if (editTemplate) console.log('editTemplate', editTemplate)

  const [inputs, setInputs] = useState({
    name: {
      value: editTemplate? editTemplate.name : '',
      error: false,
      errorMessage: ''
    }
  })

  const handleChange = (e) => {
    const targetField = e.target.name
    const targetValue = e.target.value
    setInputs(prevInputs =>  {
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
    if ( !(validateName(inputs.name.value)) ) {
      valid = false
      setInputs(prevInputs => {
        return {
          ...prevInputs,
          name: {
            ...prevInputs.name,
            error: true,
            errorMessage: 'Invalid template name - template name must be more then 3 characters long'
          }
        }
      })
    }
    if (valid) {
      /* All imputs validate lets submit */
      const template = {
        name: inputs.name.value,
      }
      /* Check if the form is in update or new template mode */
      if(editTemplate) {
        await templateService.updateTemplate(editTemplate.id, template)
        setEditTemplate(null)
      } else {
        await templateService.addTemplate(template)
      }
      setShowAddForm(false)
      setUpdateTemplates(prev => prev + 1)
    }
  }

  const validateName = (text) => {
    if (text.length > 3) return true 
    return false
  }

  return (
    <>
    <h2>Add a template</h2>
      <form className='w-full pt-7'>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Template Name
            </label>
          </div>
          <div className="" >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                type="text" name="name" value={inputs.name.value} onChange={(e) => handleChange(e)}
            />
            { inputs.name.error && <p className='text-red-700'>{inputs.name.errorMessage}</p> }
          </div>
        </div>
        <div className='flex gap-2 pb-8'>
          <button 
            className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
            onClick={(e) => handleClick(e)}
          >
            {editTemplate ? "Edit Template" : "Add template"}
          </button>
          <button 
            className="shadow bg-orange-600 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
        </div>
        <hr className='py-8' />
        
      </form>
    </>
  )
}

export default TemplateForm