import {React, useState, useEffect} from 'react'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import {format} from 'date-fns/esm'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/toDoSlice';
import toast from 'react-hot-toast';
import ToDoModal from './ToDoModal';
import CheckButton from './CheckButton';
function TodoItem({todo}) {
    const dispatch = useDispatch()
    const [updateModalOpen, setUpdateModalOpen]=useState(false)
    const [checked, setChecked]=useState(false)

    useEffect(() => {
        if(todo.status === 'completed'){
            setChecked(true)
        }else{
            setChecked(false)
        }
    }, [todo.status]);

    const handleDelete =()=>{
        dispatch(deleteTodo(todo.id))
        toast.success('Delete Successfully')
    }
    const handleUpdate =()=>{
        setUpdateModalOpen(true)
    }
  return (
    <>
        <div className={styles.item}>
            <div className={styles.todoDetails}>
                <CheckButton checked={checked} setChecked={setChecked}/>
                <div className={styles.texts}>
                    <p className={getClasses([styles.todoText, todo.status === 'completed' && styles['todoText--completed']])}>
                        {todo.title}
                    </p>
                    <p className={styles.time}>{format(new Date(todo.time), 'p, dd/MM/yyyy')}</p>
                </div>
            </div>
            <div className={styles.todoActions}>
                <div className={styles.icon} 
                onClick={handleDelete} 
                onKeyDown={handleDelete} 
                role="button" tabIndex={0}>
                    <MdDelete/>
                </div>
                <div className={styles.icon} 
                onClick={handleUpdate}
                onKeyDown={handleUpdate} 
                role="button" tabIndex={0}>
                    <MdEdit/>
                </div>
            </div>
        </div>
        <ToDoModal todo={todo} type='update' modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
    </>

  )
}

export default TodoItem