import SimpleDialog from "./components/SimpleDialog.vue"
import { createConfirmDialog } from 'vuejs-confirm-dialog'

const useConfirmBeforeAction = (action, props) => {
  const { reveal, onConfirm } = createConfirmDialog(SimpleDialog, props)

  onConfirm(action)

  reveal()
}

export default useConfirmBeforeAction