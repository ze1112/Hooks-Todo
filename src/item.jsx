import React, { useState, useRef } from 'react';



const useEdit = () => {
   let [inEdit, setEdit] = useState(false);
   let [flag, setFlag] = useState(true);
   return {
      inedit: inEdit,
      flag,
      haddle: (todo, myInput) => {
         myInput.current.value = todo.value
         setTimeout(() => {
            myInput.current.focus()
         }, 10);
         setEdit([inEdit])
      },
      onblur: (myInput, todo, edittodo) => {
         if (flag) {
            todo.value = myInput.current.value.trim()
            if (edittodo(todo)) {
               setEdit(inEdit = false)
               setFlag(flag)
            }
         }
      },
      onkeydown: (myInput, todo, edittodo) => {
         if (window.event.keyCode !== 13 && window.event.keyCode !== 27) return;
         if (window.event.keyCode === 13) {
            todo.value = myInput.current.value.trim();
            if (edittodo(todo)) {
               setEdit(inEdit = false)
            }
         }
         if (window.event.keyCode === 27) {
            if (edittodo(todo)) {
               setEdit(inEdit = false)
               setFlag(flag=false)
               setTimeout(() => {
                  setFlag(flag=true)
               }, 10);
            }
         }
      },
   }
}

const Item = ({ todo, deltodo, changehascompleted, edittodo }) => {
   let { inedit, haddle, onblur, onkeydown, } = useEdit();
   const myInput = useRef();
   let completed = todo.hasCompleted ? "completed" : "";
   let className = inedit ? completed + " editing" : completed;
   return (
      <li className={className}>
         <div className="view">
            <input type="checkbox" className="toggle" onChange={() => changehascompleted(todo)} checked={todo.hasCompleted}/>
            <label onDoubleClick={() => haddle(todo, myInput)}>{todo.value}</label>
            <button className="destroy" onClick={() => deltodo(todo)}></button>
         </div>
         <input
            type="text"
            ref={myInput}
            className="edit"
            onBlur={() => onblur(myInput, todo, edittodo)}
            onKeyDown={() => onkeydown(myInput, todo, edittodo)}
         />
      </li>
   );
}

export default Item;