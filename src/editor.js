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
      <button onClick={() => props.clearList()}>Clear</button>
      <button onClick={() => props.passReset()}>Reset</button>
      <div id='full-list'>
      {
        props.fullList.map((category) => 
          <div className='category-container'>
            <span className={props.exclusions.includes(category) ? 'excluded' : ''}>{category}</span>
            <button onClick={() => props.passExcludedCategory(category)}>{
              props.exclusions.includes(category) ? 'Enable' : 'Disable'
            }</button>
          </div>
        )
      }
      </div>
    </div>
  )
}