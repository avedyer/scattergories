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
        <input type='text' placeholder="Add a category" onKeyUp={(e) => checkSubmit(e)} onChange={(e) => setNewCategory(e.target.value)}/>
        <button onClick={() => props.passNewCategory(newCategory)}>Add</button>
      </div>
      <button onClick={() => props.passEditing(false)} className='save'>Save</button>
      <div id='full-list'>
      {
        props.fullList.map((category) => 
          <div className='category-container'>
            <span>{category}</span>
            <button onClick={() => props.passRemovedCategory(category)}>Remove</button>
          </div>
        )
      }
      </div>
    </div>
  )
}