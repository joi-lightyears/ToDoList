import {React, useState} from 'react'
import styles from "../styles/modules/modal.module.scss"
import { MdOutlineClose } from "react-icons/md"
import Button from './Button'
import { useDispatch } from 'react-redux';
import { addToDo } from '../slices/toDoSlice';
import {v4 as uuid} from "uuid"
function ToDoModal({modalOpen, setModalOpen}) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete')
  const dispatch = useDispatch()
  const handleSubmit = (e)=>{
    e.preventDefault()
    if (title === status){
      dispatch(addToDo({
        id: uuid(),
        title,
        status,
        time: new Date().toLocalDateString(),
      }))
      
    }
  }
  return (
    modalOpen && (
      <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.closeButton} 
            onClick={()=>setModalOpen(false)}
            onKeyDown={()=>setModalOpen(false)}
            tabIndex={0}
            role="button">
              <MdOutlineClose/>
            </div>
            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
              <h1 className={styles.formTitle}>Add Task</h1>
              <label htmlFor='title'>
                Title
                <input type="text" id='title' value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
              </label>
              <label htmlFor='status'>
                Status
                <select name='status' id='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">Add Task</Button>
                <Button 
                onClick={()=>setModalOpen(false)}
                onKeyDown={()=>setModalOpen(false)}
                type="button" variant="secondary">Cancel</Button>
              </div>
            </form>
          </div>
      </div>
    )
  )
}

export default ToDoModal