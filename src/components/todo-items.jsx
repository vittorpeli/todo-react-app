/* eslint-disable react/prop-types */
export const TodoItems = ({ items, deleteClick }) => {

  return (
    <div className={`listContainer ${items.length === 0 ? 'emptyList' : ''}`}>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input 
              type="checkbox" 
              id="deleteBtn"
              checked={item.checked || false}
              onChange={() => deleteClick(item.id)}
            />
            <span>{item.text}</span>
          </li>
          )
        )}
      </ul>
    </div>
  )
}