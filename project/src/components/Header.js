import {React, useState} from 'react'
import Button from './Button'
import ToDoModal from './ToDoModal'
import styles from "../styles/modules/app.module.scss"
import { SelectButton } from './Button'
function Header() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className={styles.appHeader}>
        <Button onClick={()=>setModalOpen(true)} type="button" variant='primary'>Add Task</Button>
        <SelectButton id="status">
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </SelectButton>
          <ToDoModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default Header