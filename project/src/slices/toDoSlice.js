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
    filterStatus: 'all',
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
        },

        deleteTodo: (state, action)=>{
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                if (todo.id === action.payload) {
                    todoListArr.splice(index, 1);
                }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
              const todoListArr = JSON.parse(todoList);
              todoListArr.forEach((todo) => {
                if (todo.id === action.payload.id) {
                  todo.status = action.payload.status;
                  todo.title = action.payload.title;
                }
              });
              window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
              state.todoList = [...todoListArr];
            }
        },
        
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
        
    }
})
export const {addToDo, deleteTodo, updateTodo, updateFilterStatus}=toDoSlice.actions
export default toDoSlice.reducer