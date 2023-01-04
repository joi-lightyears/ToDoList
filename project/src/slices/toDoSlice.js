import {createSlice} from "@reduxjs/toolkit"

const getInitialToDo=()=>{
    const localTodoList = window.localStorage.getItem('toDoList')
    if(localTodoList){
        return JSON.parse(localTodoList)
    }
    window.localStorage.setItem('todoList', []);
    return [];
}
const initialValue ={
    todoList: getInitialToDo()
}
export const toDoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
    addToDo: (state, action)=>{
        state.todoList.push(action.payload);
        const todoList = window.localStorage.getItem('todoList')
        if(todoList){
            const todoListArr= JSON.parse(todoList)
            todoListArr.push({
                ...action.payload,
            })
            window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        }else{
            window.localStorage.setItem('todoList', JSON.stringify([
                {
                ...action.payload,
                },
            ])
            );
        }
    }
    }
})
export const {addToDo}=toDoSlice.actions
export default toDoSlice.reducer