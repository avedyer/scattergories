import { useState } from "react"

export default function Editor(props) {

  const [newCategory, setNewCategory] = useState()

  function checkSubmit(e) {
    if (e.key === 'Enter') {
      props.passNewCategory(e.target.value)
      e.target.value = ''
    }
  }

  return (
    <div id='editing-container'>
      <div id='category-form'>
        <input type='text' onKeyUp={(e) => checkSubmit(e)} onChange={(e) => setNewCategory(e.target.value)}/>
        <button onClick={() => props.passNewCategory(newCategory)}>Add</button>
      </div>
      <button onClick={() => props.passEditing(false)}>Save</button>
      {
        props.fullList.map((category) => 
          <div className='category-container'>
            <p>{category}</p>
            <button onClick={() => props.passRemovedCategory(category)}>-</button>
          </div>
        )
      }
    </div>
  )
}