import { useEffect, useState } from 'react'
import recordService from '../../services/recordService'
import { Text, Select } from '../shared/Forms'
import recordTypeService from '../../services/recordTypeService'
import styles from '../styles'
import validator from '../shared/Forms/validator'

const recordFormInitialState = (recordForEdit) => {
  return {
    name: {
      name: 'name',
      label: 'Name',
      value: recordForEdit ? recordForEdit.name : '',
      required: true,
      validator: 'isText',
      min: 2,
      error: false,
      errorMessage: ''
    },
    description: {
      name: 'description',
      label: 'Description',
      value: recordForEdit ? recordForEdit.description : '',
      required: false,
      validator: 'isText',
      error: false,
      errorMessage: ''
    },
    lookupString: {
      name: 'lookupString',
      label: 'Lookup',
      value: recordForEdit ? recordForEdit.lookupString : '',
      required: false,
      validator: 'isText',
      error: false,
      errorMessage: ''
    },
    hostName: {
      name: 'hostName',
      label: 'Host Name',
      value: recordForEdit ? recordForEdit.hostName : '@',
      required: false,
      validator: 'isText',
      error: false,
      errorMessage: ''
    },
    value: {
      name: 'value',
      label: 'Value',
      value: recordForEdit ? recordForEdit.value : '',
      required: true,
      error: false,
      validator: 'isText',
      errorMessage: ''
    },
    ttl: {
      name: 'ttl',
      label: 'TTL (Time to live in seconds)',
      value: recordForEdit ? recordForEdit.ttl : 3600,
      required: true,
      error: false,
      validator: 'isNumber',
      errorMessage: ''
    },
    recordTypeId: {
      name: 'recordTypeId',
      label: 'Record Type',
      value: recordForEdit ? recordForEdit.recordType.id : '0',
      required: true,
      error: false,
      errorMessage: ''
    }
  }
}

const RecordForm = ({
  setShowAddForm,
  setUpdateRecords,
  editRecord,
  setEditRecord,
  records,
  setRecords
}) => {
  const recordForEdit = records.find((record) => record.id === editRecord)
  const [inputs, setInputs] = useState(recordFormInitialState(recordForEdit))

  const [recordTypes, setRecordTypes] = useState([])

  useEffect(() => {
    const getRecordTypes = async () => {
      const typeOptions = await recordTypeService.getRecordTypes()
      setRecordTypes(typeOptions)
    }
    getRecordTypes()
    setInputs(recordFormInitialState(recordForEdit))
  }, [recordForEdit])

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
    setEditRecord(null)
    setShowAddForm(false)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    let valid = true
    /* Validate inputs */
    for (const field in inputs) {
      if (inputs[field].required && !inputs[field].value) {
        valid = false
        validator.setInvalid(
          setInputs,
          field,
          `${inputs[field].label} is required`
        )
      }
      if (inputs[field].validator && inputs[field].validator === 'isText') {
        try {
          const isValid = validator.isText(
            inputs[field].value,
            inputs[field].label,
            inputs[field].min ? inputs[field].min : undefined,
            inputs[field].max ? inputs[field].max : undefined
          )
          if (isValid.valid === false) {
            valid = false
            validator.setInvalid(
              setInputs,
              field,
              isValid.message
                ? isValid.message
                : `${inputs[field].label} is invalid`
            )
          }
        } catch (err) {
          valid = false
          validator.setInvalid(
            setInputs,
            field,
            'error with text input, check your entry and try again'
          )
        }
      }
      if (inputs[field].validator && inputs[field].validator === 'isNumber') {
        try {
          const isValid = validator.isNumber(
            inputs[field].value,
            inputs[field].label,
            inputs[field].min ? inputs[field].min : undefined,
            inputs[field].max ? inputs[field].max : undefined
          )
          if (isValid.valid === false) {
            valid = false
            validator.setInvalid(
              setInputs,
              field,
              isValid.message
                ? isValid.message
                : `${inputs[field].label} is invalid`
            )
          }
        } catch (err) {
          valid = false
          validator.setInvalid(
            setInputs,
            field,
            'error with number input, check your entry and try again'
          )
        }
      }
      if (field === 'recordTypeId' && inputs[field].value === '0') {
        valid = false
        validator.setInvalid(
          setInputs,
          field,
          `${inputs[field].label} is required`
        )
      }
    }

    if (valid) {
      /* Record inputs are valid lets submit */
      const record = {}
      for (const field in inputs) {
        record[field] = inputs[field].value
      }

      /* Check if the form is in update or new record mode */
      if (recordForEdit) {
        await recordService.update(recordForEdit.id, record)
      } else {
        await recordService.add(record)
      }
      setEditRecord(null)
      setUpdateRecords((prev) => prev + 1)
      setShowAddForm(false)
    }
  }

  const validateName = (text) => {
    if (text.length > 3) return true
    return false
  }

  return (
    <>
      <h1>
        {recordForEdit
          ? `Edit "${recordForEdit.recordType.name}" record: ${recordForEdit.name}`
          : 'Add a record'}
      </h1>
      <form className="w-full pt-7">
        <Select
          control={inputs.recordTypeId}
          options={recordTypes.map((type) => {
            return {
              value: type.id,
              label: type.name
            }
          })}
          onChange={handleChange}
        />
        <Text control={inputs.name} onChange={handleChange} />
        <Text control={inputs.description} onChange={handleChange} />
        <Text control={inputs.lookupString} onChange={handleChange} />
        <Text control={inputs.hostName} onChange={handleChange} />
        <Text control={inputs.value} onChange={handleChange} />
        <Text control={inputs.ttl} onChange={handleChange} />

        <div className="flex gap-2 pb-8">
          <button
            className={styles.buttons.primary}
            onClick={(e) => handleClick(e)}
          >
            {recordForEdit ? 'Update Record' : 'Add Record'}
          </button>
          <button
            className={styles.buttons.cancel}
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

export default RecordForm
