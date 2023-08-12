import { useState } from 'react'
import recordService from '../../services/recordService'


const RecordForm = ({setShowAddForm, setUpdateRecords, editRecord, setEditRecord}) => {

  const [inputs, setInputs] = useState({
    name: {
      value: editRecord ? editRecord.name : '',
      required: true,
      error: false,
      errorMessage: ''
    },
    description: {
      value: editRecord ? editRecord.description : '',
      required: false,
      error: false,
      errorMessage: ''
    },
    lookup: {
      value: editRecord ? editRecord.lookup : '',
      required: false,
      error: false,
      errorMessage: ''
    },
    host: {
      value: editRecord ? editRecord.host : '',
      required: false,
      error: false,
      errorMessage: ''
    },
    value: {
      value: editRecord ? editRecord.value : '',
      required: true,
      error: false,
      errorMessage: ''
    },
    ttl: {
      value: editRecord ? editRecord.ttl : '',
      required: true,
      error: false,
      errorMessage: ''
    },
    record_type: {
      value: editRecord ? editRecord.record_type : '',
      required: true,
      error: false,
      errorMessage: '',
    },
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
    setEditRecord(null)
    setShowAddForm(false)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    let valid = true
    if ( !(validateDomain(inputs.domain.value)) ) {
      valid = false
      setInputs(prevInputs => {
        return {
          ...prevInputs,
          domain: {
            ...prevInputs.domain,
            error: true,
            errorMessage: 'Invalid domain name'
          }
        }
      })
    }
    if ( !(validateName(inputs.name.value)) ) {
      valid = false
      setInputs(prevInputs => {
        return {
          ...prevInputs,
          name: {
            ...prevInputs.name,
            error: true,
            errorMessage: 'Invalid record name - record name must be more then 3 characters long'
          }
        }
      })
    }
    if (valid) {
      /* Record inputs are valid lets submit */
      const record = {
        name: inputs.name.value,
        domain: inputs.domain.value
      }
      /* Check if the form is in update or new record mode */
      if(editRecord) {
        recordService.update(editRecord.id, record)
      } else {
        recordService.add(record)
      }
      setEditRecord(null)
      setShowAddForm(false)
      setUpdateRecords(prev => prev + 1)
    }
  }
 
  const validateDomain = (domain) => {
    if (domain.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/)) {
      return true
    } else {
      return false
    }
  }

  const validateName = (text) => {
    if (text.length > 3) return true 
    return false
  }

  return (
    <>
    <h1>{editRecord ? `Edit Record: "${editRecord.name} (${editRecord.domain})"` : "Add a record" }</h1>
      <form className='w-full pt-7'>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Record Name
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
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Domain Name
            </label>
          </div>
          <div className="" >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                type="text" name="domain" value={inputs.domain.value} onChange={(e) => handleChange(e) }
            />
            { inputs.domain.error && <p className='text-red-700'>{inputs.domain.errorMessage}</p> }
          </div>
        </div>
        <div className='flex gap-2 pb-8'>
          <button 
            className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
            onClick={(e) => handleClick(e)}
          >
            {editRecord ? "Update Record" : "Add Record"}
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

export default RecordForm