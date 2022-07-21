import { useState } from "react"

export default function Editor(props) {

  const [newCategory, setNewCategory] = useState()

  return (
    <div id='editor'>
      <input type='text' onChange={(e) => setNewCategory(e.target.value)}/>
      <button onClick={() => props.passNewCategory(newCategory)}>Add</button>
      {
        props.fullList.map((category) => 
          <p>{category}</p>
        )
      }
    </div>
  )
}