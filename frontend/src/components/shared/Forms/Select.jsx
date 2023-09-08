import styles from '../../styles'

/* options should be an array of objects with values name and id  */
const Select = ({ control, options, onChange }) => {
  return (
    <div className={styles.forms.inputContainer}>
      <label className={styles.forms.label} htmlFor={control.name}>
        {control.label}
      </label>
      <select
        className={styles.forms.inputs.select}
        id={control.name}
        name={control.name}
        value={control.value}
        onChange={(e) => onChange(e)}
      >
        <option disabled value="0">
          Select a {control.label}
        </option>
        {options &&
          options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
      </select>
      {control.error && (
        <p className={styles.forms.error}>{control.errorMessage}</p>
      )}
    </div>
  )
}

export default Select
