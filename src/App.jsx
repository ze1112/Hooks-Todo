import React, { useState } from 'react';
import Item from './item'
import Footer from './footer'

const useTodoValue = () => {
  let [todoDatas, setTodoDatas] = useState([]);
  let [todoNum, setTodoNum] = useState(0);
  let [view, setView] = useState("all");
  let [flag, setFlag] = useState(false);
  return {
    tododatas: todoDatas,
    todonum: todoNum,
    view,
    onkeydown: e => {
      if (e.keyCode !== 13) return;
      if (e.target.value === "") return;
      let todo = {};
      todo.id = new Date().getTime();
      todo.value = e.target.value;
      todo.hasCompleted = false;
      todoNum++;
      setTodoNum(todoNum)
      setTodoDatas([todo, ...todoDatas]);
      e.target.value = ""
    },
    deltodo: todo => {
      todoDatas = todoDatas.filter(value => {
        if (value.id === todo.id) {
          if (!todo.hasCompleted) {
            todoNum--;
          }
          return false;
        }
        return true
      })
      setTodoNum(todoNum)
      setTodoDatas([...todoDatas]);

    },
    changehascompleted: todo => {
      todoDatas = todoDatas.map(value => {
        if (todo.id === value.id) {
          value.hasCompleted = !todo.hasCompleted;
          if (value.hasCompleted) {
            todoNum--;
          } else {
            todoNum++;
          }
        }
        return value;
      })
      setTodoNum(todoNum)
      setTodoDatas([...todoDatas]);
    },
    edittodo: todo => {
      todoDatas = todoDatas.map(value => {
        if (value.id === todo.id) {
          value.value = todo.value
        }
        return value
      })
      setTodoDatas([...todoDatas]);
      return true
    },
    viewtodo: (view) => {
      setView(view)
    },
    clearcompleted: () => {
      todoDatas = todoDatas.filter(value => {
        if (value.hasCompleted) {
          return false;
        } else {
          return true;
        }
      });
      setTodoDatas([...todoDatas])
    },
    selectall: () => {
      flag = !flag
      if (flag) {
        todoDatas = todoDatas.map(value => {
          value.hasCompleted = true;
          return value;
        });
        todoNum = 0;
      } else {
        todoDatas = todoDatas.map(value => {
          value.hasCompleted = false;
          return value;
        });
        todoNum = todoDatas.length;
      }
      setTodoDatas([...todoDatas]);
      setTodoNum(todoNum);
      setFlag(flag)
    }

  }
}


const App = () => {

  let { tododatas, todonum, view, onkeydown, deltodo, changehascompleted, edittodo, viewtodo, clearcompleted,selectall } = useTodoValue();
  let filterTodos = tododatas.filter(todo => {
    switch (view) {
      case 'all':
        return true;
      case 'active':
        return !todo.hasCompleted;
      case 'completed':
        return todo.hasCompleted;
      default: return view
    }
  })
  let items = filterTodos.map((todo, index) => {
    return (
      <Item todo={todo} key={todo.id} deltodo={deltodo} changehascompleted={changehascompleted} edittodo={edittodo} />
    )
  })
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todo</h1>
        <input type="text" className="new-todo" onKeyDown={onkeydown} />
        <section className="main">
          <input type="checkbox" className="toggle-all" id="toggle-all" onClick={selectall}/>
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list">
            {
              items
            }
          </ul>
        </section>
      </header>
      <Footer todonum={todonum} viewtodo={viewtodo} clearcompleted={clearcompleted} />
    </section>
  )
}

export default App;