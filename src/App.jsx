import React, { useEffect, useState } from 'react'
import './App.css'
import { NewTodo } from './components/new-todo'
import { TodoItems } from './components/todo-items'
import { Sun } from '@phosphor-icons/react'
import { Moon } from '@phosphor-icons/react/dist/ssr'

function App() {
  const [items, setItems] = useState(() => {
    const itemsOnStorage = localStorage.getItem('items')

    if (itemsOnStorage) {
      return JSON.parse(itemsOnStorage)
    }

    return []
  })

  const [isNight, setIsNight] = useState(() => {
    const themeOnStorage = localStorage.getItem('theme');
    return themeOnStorage ? JSON.parse(themeOnStorage) : false;
  })

  const [inputValue, setInputValue] = useState('')

  const idCounter = React.useRef(1)

  const onItemAdded = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') {
      return;
    }

    const newItem = {
      id: idCounter.current++,
      text: inputValue,
      checked: false,
    }

    const itemsArray = [newItem, ...items]

    setItems(itemsArray)
    localStorage.setItem('items', JSON.stringify(itemsArray))

    setInputValue('')
  }

  const deleteClick = (id) => {
    const deletedItem = items.filter(item => item.id !== id)

    setItems(deletedItem)

    localStorage.setItem('items', JSON.stringify(deletedItem))
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onItemAdded()
    }
  }

  const onNightToggle = () => {
    setIsNight(!isNight)
  }

  useEffect(() => {
    if (isNight) {
      document.body.classList.add('dark_mode')
    } else {
      document.body.classList.remove('dark_mode')
    }

    localStorage.setItem('theme', JSON.stringify(isNight))
  }, [isNight])

  return (
    <>
      <div className='container'>
        <button 
          className="nightToggle"
          onClick={onNightToggle}
        >
          { isNight ? <Moon size={32} /> : <Sun size={32} />}
        </button>
        <h1>Todo App</h1>
        <NewTodo 
          onItemAdded={onItemAdded}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleKeyDown={() => handleKeyDown()}
        />

        <TodoItems 
          items={items} 
          deleteClick={deleteClick} 
        />
      </div>
    </>
  )
}

export default App
