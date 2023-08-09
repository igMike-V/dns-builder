import { userState } from 'react'
import Styles from './Styles/Styles'
import { HiOutlineTrash } from 'react-icons/hi'
import ConfirmModal from './ConfirmModal'

const DeleteButton = async ({ action, argument, title, confirmLabel, cancelLabel }) => {
  const [visible, setVisible] = useState(false)
  const [confirmation, setConfirmation] = useState(false)

  const handleDeleteClick = async () => {
    setVisible(true)
  }

  return (
    <>
    { visible && <ConfirmModal setVisible={setVisible} /> }
      <HiOutlineTrash 
        className={Styles.icons}
        onClick={() => action(argument)}
      >
        Delete
      </HiOutlineTrash>
    </>
  )
}

export default DeleteButton