import styles from '../../styles'

const Text = ({control, onChange}) => {
  return (
    <div className={styles.forms.inputContainer}>
      <label className={styles.forms.label} >
        {control.label}
      </label>
      <input
        className={styles.forms.inputs.text}
          type="text" name={control.name} value={control.value} onChange={(e) => onChange(e)}
      />
      { control.error && <p className={styles.forms.error}>{control.errorMessage}</p> }
    </div>
  )
}

export default Text