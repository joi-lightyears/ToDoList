import {React, useState, useSelector} from 'react'
import Button from './Button'
import ToDoModal from './ToDoModal'
import styles from "../styles/modules/app.module.scss"
import { SelectButton } from './Button'
import { useDispatch } from 'react-redux'
import { updateFilterStatus } from '../slices/toDoSlice'
function Header() {
  const [modalOpen, setModalOpen] = useState(false)
  const initialFilterStatus = useSelector((state)=>state.todo.filterStatus)
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus)
  const dispatch = useDispatch()
  const updateFilter = (e)=>{
    dispatch(updateFilterStatus(e.target.value))
  }
  return (
    <div className={styles.appHeader}>
        <Button onClick={()=>setModalOpen(true)} type="button" variant='primary'>Add Task</Button>
        <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </SelectButton>
          <ToDoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default Header