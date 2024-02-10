/* eslint-disable react/prop-types */
export const NewTodo = ({
  onItemAdded, 
  inputValue,
  handleInputChange,
  handleKeyDown 
}) => {
  return (
    <div className="newTodo">
      <div className="form-container">
        <form onSubmit={onItemAdded}>
          <div className="add-container">
            <input 
              type="text" 
              name='item' 
              id='add-input' 
              placeholder='Adicionar Item'
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}/>
            <button type='submit' className='addBtn'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}