import { useEffect, useState } from 'react'
import recordService from '../../services/recordService'
import Text from '../shared/Forms/Text'
import Select from '../shared/Forms/Select'
import recordTypeService from '../../services/recordTypeService'
import styles from '../styles'


const RecordForm = ({setShowAddForm, setUpdateRecords, editRecord, setEditRecord}) => {
  const [inputs, setInputs] = useState({
    name: {
      name: 'name',
      label: 'Name',
      value: editRecord ? editRecord.name : '',
      required: true,
      error: false,
      errorMessage: '',

    },
    description: {
      name: 'description',
      label: 'Description',
      value: editRecord ? editRecord.description : '',
      required: false,
      error: false,
      errorMessage: '',

    },
    lookupString: {
      name: 'lookupString',
      label: 'Lookup',
      value: editRecord ? editRecord.lookup : '',
      required: false,
      error: false,
      errorMessage: '',

    },
    hostName: {
      name: 'hostName',
      label: 'Host',
      value: editRecord ? editRecord.host : '',
      required: false,
      error: false,
      errorMessage: '',

    },
    value: {
      name: 'value',
      label: 'Value',
      value: editRecord ? editRecord.value : '',
      required: true,
      error: false,
      errorMessage: '',

    },
    ttl: {
      name: 'ttl',
      label: 'TTL (Time to live in seconds)',
      value: editRecord ? editRecord.ttl : '',
      required: true,
      error: false,
      errorMessage: '',

    },
    recordType: {
      name: 'recordType',
      label: 'Record Type',
      value: editRecord ? editRecord.record_type : '',
      required: true,
      error: false,
      errorMessage: '',
    }
  })

  const [recordTypes, setRecordTypes] = useState([])

  useEffect(() => {
    const getRecordTypes = async () => {
      const typeOptions = await recordTypeService.getRecordTypes()
      setRecordTypes(typeOptions)
    }
    getRecordTypes()
  }, [])
  

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

  //TODO - do validations
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
 

  const validateName = (text) => {
    if (text.length > 3) return true 
    return false
  }


  return (
    <>
    <h1>{editRecord ? `Edit Record: ${editRecord.type} "(${editRecord.name})"` : "Add a record" }</h1>
      <form className='w-full pt-7'>
        <Select control={inputs.recordType} options={recordTypes} onChange={handleChange} />
        <Text control={inputs.name} onChange={handleChange} />
        <Text control={inputs.description} onChange={handleChange} />
        <Text control={inputs.lookupString} onChange={handleChange} />  
        <Text control={inputs.hostName} onChange={handleChange} />
        <Text control={inputs.value} onChange={handleChange} />
        <Text control={inputs.ttl} onChange={handleChange} />
        
        <div className='flex gap-2 pb-8'>
          <button 
            className={styles.buttons.primary} 
            onClick={(e) => handleClick(e)}
          >
            {editRecord ? "Update Record" : "Add Record"}
          </button>
          <button 
            className={styles.buttons.cancel} 
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