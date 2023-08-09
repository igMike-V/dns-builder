import { useState } from 'react'
import siteService from '../services/siteService'


const AddSiteForm = ({setShowAddForm, setUpdateSites}) => {

  const [inputs, setInputs] = useState({
    name: {
      value: '',
      error: false,
      errorMessage: ''
    },
    domain: {
      value: '',
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
            errorMessage: 'Invalid site name - site name must be more then 3 characters long'
          }
        }
      })
    }
    if (valid) {
      const site = {
        name: inputs.name.value,
        domain: inputs.domain.value
      }
      siteService.addSite(site)
      setShowAddForm(false)
      setUpdateSites(prev => prev + 1)

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
    <h1>Add a site</h1>
      <form className='w-full pt-7'>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Site Name
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
          <button className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={(e) => handleClick(e)}>Add Site</button>
          <button className="shadow bg-orange-600 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={(e) => handleCancel(e)}>Cancel</button>
        </div>
        <hr className='py-8' />
        
      </form>
    </>
  )
}

export default AddSiteForm