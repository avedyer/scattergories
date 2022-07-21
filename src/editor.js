import { useState } from "react"

export default function Editor(props) {

  const [newCategory, setNewCategory] = useState()

  return (
    <div id='editing-container'>
      <div id='category-form'>
        <input type='text' onChange={(e) => setNewCategory(e.target.value)}/>
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