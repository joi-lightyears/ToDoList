import {React, useState, useEffect} from 'react'
import styles from "../styles/modules/modal.module.scss"
import { MdOutlineClose } from "react-icons/md"
import Button from './Button'
import { useDispatch } from 'react-redux';
import { addToDo, updateTodo } from '../slices/toDoSlice';
import toast from 'react-hot-toast';
import {v4 as uuid} from "uuid"
import { AnimatePresence, motion } from 'framer-motion';
const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};
function ToDoModal({type, modalOpen, setModalOpen, todo}) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete')
  const dispatch = useDispatch()

  useEffect(() => {
    if(type==='update' && todo){
      setTitle(todo.title)
      setStatus(todo.status)
    }else{
      setTitle('')
      setStatus('incomplete')
    }
  }, [type, todo, modalOpen]);
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(title ===''){
      toast.error("Enter title for your task")
      return
    }
    if (title && status){
      if(type==='add'){
        dispatch(addToDo({
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        }))
        toast.success('Task Added Succesfully')
        setModalOpen(false)
        setTitle('')
      }
      else if(type==='update'){
        if(todo.title !==title || todo.status !== status){
          dispatch(updateTodo({
            ...todo,
            title,
            status
          }))
          toast.success('Task Updated Succesfully')
          setModalOpen(false)
          setTitle('')
        }else{
          toast.error('No changes made')
          return
        }
      }
      setModalOpen(false)
    }
  }


  return (
    <AnimatePresence>
    {modalOpen && (
      <motion.div className={styles.wrapper} 
      initial={{opacity: 0}}
      animate={{opacity: 1}} 
      exit={{opacity: 0}}>
          <motion.div className={styles.container} variants={dropIn} initial='hidden' animate='visible' exit='exit'>
            <motion.div className={styles.closeButton} 
            onClick={()=>setModalOpen(false)}
            onKeyDown={()=>setModalOpen(false)}
            tabIndex={0}
            role="button"
            initial={{top:40, opacity:0}}
            animate={{top:-10, opacity:1}}
            exit={{top:40, opacity:0}}>
              <MdOutlineClose/>
            </motion.div>
            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
              <h1 className={styles.formTitle}>{type==='update'?'Update':'Add'} Task</h1>
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
                <Button type="submit" variant="primary">{type==='update'?'Update':'Add'} Task</Button>
                <Button 
                onClick={()=>setModalOpen(false)}
                onKeyDown={()=>setModalOpen(false)}
                type="button" variant="secondary">Cancel</Button>
              </div>
            </form>
          </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  )
}

export default ToDoModal