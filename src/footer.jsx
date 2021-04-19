import React from 'react';

const Footer = ({todonum,viewtodo,clearcompleted}) => {
   return ( 
      <footer className="footer">
         <span className="todo-count"> 
            <span>{todonum}</span>
            {
               todonum<=1?<span>item Left</span>:<span>items Left</span>
            }
            
         </span>
         <ul className="filters">
            <li>
               <a href="#/all" onClick={()=>{viewtodo("all")}}>All</a>
            </li>
            <li>
               <a href="#/active" onClick={()=>{viewtodo("active")}}>Active</a>
            </li>
            <li>
               <a href="#/completed" onClick={()=>{viewtodo("completed")}}>Completed</a>
            </li>
         </ul>
         <button className="clear-completed" onClick={()=>clearcompleted()}>Clear Completed</button>
      </footer>

    );
}
 
export default Footer;