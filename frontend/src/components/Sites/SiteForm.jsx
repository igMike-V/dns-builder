import { useEffect, useState } from 'react'
import siteService from '../../services/siteService'
import {Text, Select} from '../shared/Forms'
import recordService from '../../services/recordService'
import styles from '../styles'
import validator from '../shared/Forms/validator'
import { HiOutlineTrash, HiPlusCircle, HiMinusCircle } from 'react-icons/hi'

const SiteForm = ({setShowAddForm, setUpdateSites, editSite, setEditSite, sites, setSites }) => {
  const site = editSite ? sites.find(s => {
    if (s.id === editSite) return s
  }) : null

  const formInitialState = {
    name: {
      name: 'name',
      label: 'Name',
      value: site ? site.name : '',
      required: true,
      validator: 'isText',
      min: 5,
      error: false,
      errorMessage: ''
    },
    domain: {
      name: 'domain',
      label: 'Domain',
      value: site ? site.domain : '',
      required: true,
      validator: 'isDomain',
      error: false,
      errorMessage: ''
    },
    ip: {
      name: 'ip',
      label: 'Server IP Address',
      value: site ? site.ip : '',
      required: true,
      validator: 'isIp',
      error: false,
      errorMessage: ''
    }
  }

  const [inputs, setInputs] = useState(formInitialState)
  const [records, setRecords] = useState([])
  const [recordInputs, setRecordInputs] = useState({
    record: {
      name: 'record',
      label: 'Select a record',
      value: '',
      required: true,
      error: false,
      errorMessage: ''
    },
  })
  const [showRecordForm, setShowRecordForm] = useState(false)

  useEffect(() => {
    const getRecords = async () => {
      const records = await recordService.get()
      setRecords(records)
    }
    setInputs(formInitialState)
    getRecords()
  }, [editSite])

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

  const handleRecordChange = (e) => {
    const targetField = e.target.name
    const targetValue = e.target.value
    setRecordInputs(prevInputs =>  {
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
    setEditSite(null)
    setShowAddForm(false)
  }

  const removeRecord = async(siteRecordId) => {
    const removed = await siteService.removeRecord(siteRecordId)
    if (removed) {
      setSites(prevSites => {
        return prevSites.map(s => {
          if (s.id === site.id) {
            return {
              ...s,
              records: s.records.filter(record => record.siteRecord.id !== siteRecordId)
            }
          } else {
            return s
          }
        })
      })
    }
  }

  const addRecord = async (e, siteId, record) => {
    e.preventDefault()
    if (!record.value){
      setRecordInputs(prevInputs =>  {
        return {
          ...prevInputs,
          record: {
            ...prevInputs.record,
            error: true,
            errorMessage: 'Please select a record'
          }
        }
      })
    }

    const siteRecord = await siteService.addRecord(siteId, record.value)
    setSites(prevSites => {
      return prevSites.map(site => {
        if (site.id === siteId) {
          return {
            ...site,
            records: [
              ...site.records,
              siteRecord
            ]
          }
        } else {
          return site
        }
      })
    })
  }

  const handleCancelAddRecord = (e) => {
    e.preventDefault()
    setShowRecordForm(false)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    let valid = true
    /* Validate inputs */
    for (const field in inputs) {
      if (inputs[field].required && !inputs[field].value) {
        valid = false
        validator.setInvalid(setInputs, field, `${inputs[field].label} is required`)
      }
      
      if (inputs[field].validator && inputs[field].validator === 'isText') {
        try{
          const isValid = validator.isText(
            inputs[field].value,
            inputs[field].label, 
            inputs[field].min? inputs[field].min : undefined,
            inputs[field].max? inputs[field].max : undefined
            )
          if (isValid.valid === false) {
            valid = false
            validator.setInvalid(setInputs, field, isValid.message? isValid.message : `${inputs[field].label} is invalid`)
          }  
        } catch (err) {
          console.error(err)
        }
      }
      
      if (inputs[field].validator && inputs[field].validator === 'isDomain') {
        try{
          const isValid = validator.isDomain(
            inputs[field].value,
            inputs[field].label
            )
          if (isValid.valid === false) {
            valid = false
            validator.setInvalid(setInputs, field, isValid.message? isValid.message : `${inputs[field].label} is invalid`)
          }  
        } catch (err) {
          valid = false
          validator.setInvalid(setInputs, field, 'error with domain input, check your entry and try again')
        }
      }

      if (inputs[field].validator && inputs[field].validator === 'isIp') {
        try{
          const isValid = validator.isIp(
            inputs[field].value,
            inputs[field].label
            )
          if (isValid.valid === false) {
            valid = false
            validator.setInvalid(setInputs, field, isValid.message? isValid.message : `${inputs[field].label} is invalid`)
          }  
        } catch (err) {
          valid = false
          console.log(err)
          validator.setInvalid(setInputs, field, 'error with Ip Address input, input a valid IPv4 address and try again')
        }
      }
    }
    
    if (valid) {
      /* Site inputs are valid lets submit */
      const siteToAdd = {
        name: inputs.name.value,
        domain: inputs.domain.value,
        ip: inputs.ip.value
      }
      /* Check if the form is in update or new site mode */
      if(site) {
        siteService.updateSite(site.id, siteToAdd)
      } else {
        siteService.addSite(siteToAdd)
      }
      setEditSite(null)
      setShowAddForm(false)
      setUpdateSites(prev => prev + 1)
    }
  }

  return (
    <>
    <h1>{site ? `Edit Site: "${site.name} (${site.domain})"` : "Add a site" }</h1>
      <form className='w-full pt-7'>
        <Text control={inputs.name} onChange={handleChange} />
        <Text control={inputs.domain} onChange={handleChange} />
        <Text control={inputs.ip} onChange={handleChange} />
        {site &&
        <div className='flex flex-col gap-2 pb-8'>
          {records && 
          <div>
            <div className='flex flex-row items-center justify-start gap-2 py-1'>
            <h2>Records</h2>
            {showRecordForm ?
            <HiMinusCircle
            className={styles.icons + ' mt-1'}
            onClick={() => setShowRecordForm(!showRecordForm)}
            >Hide add record form</HiMinusCircle>
            :
            <HiPlusCircle
            className={styles.icons + ' mt-1'}
            onClick={() => setShowRecordForm(!showRecordForm)}
            >Add a record</HiPlusCircle>
            }
            </div>
            {showRecordForm &&
            <div className='flex flex-row items-center justify-start gap-2'>
              <Select 
                control={recordInputs.record}
                options={
                  records.map(record => {
                    return {
                      value: record.id,
                      label: record.name
                    }
                  })
                }
                onChange={handleRecordChange}
              />
              <button className={styles.buttons.primary} onClick={(e) => addRecord(e, site.id, recordInputs.record)}>Add</button>
              <button className={styles.buttons.cancel} onClick={(e) => handleCancelAddRecord(e)}>Cancel</button>
              </div>
            }
            {site && site.records.map(record => {
              return (
                <div key={record.id} className='flex flex-row gap-2 py-1'>
                  <p className="font-bold">{`${record.name} record: `}</p>
                  <p>{record.name}</p>
                  <HiOutlineTrash
                    className={styles.icons} 
                    onClick={() => removeRecord(record.siteRecord.id)}>
                      Delete
                  </HiOutlineTrash>
                </div>
              )
            })}
          </div>
          }
        </div>
        } 
        <div className='flex gap-2 pb-8'>
          <button 
            className={styles.buttons.primary} 
            onClick={(e) => handleClick(e)}
          >
            {site ? "Update Site" : "Add Site"}
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

export default SiteForm