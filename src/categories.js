import { useState, useEffect } from "react"

import List from "./list"
import Editor from './editor'

import categories from './categories.txt'

export default function Categories(props) {

  const [editing, setEditing] = useState(false)
  const [fullList, setFullList] = useState([])
  const [exclusions, setExclusions] = useState([])

  useEffect(() => {
    if (fullList.length === 0) {
      fetch(categories)
      .then(r => r.text())
      .then(text => {
        let newArr = []
        let queuedCategory = ''
        for (let i=0; i<text.length; ++i) {
          if (text[i] !== ',') {
            queuedCategory += text[i]
          }
          else {
            newArr.push(queuedCategory)
            queuedCategory = ''
          }
        }
        newArr.push(queuedCategory)
        setFullList([...newArr])
      });
    }
  }, [])

  function addCategory(category) {
    if (!fullList.includes(category)) {
      let newArr = [...fullList]
      newArr.push(category)
      setFullList([...newArr])
    }
  }

  return (
    <div id='categories'>
      <div className='tabs'>
        <button onClick={() => setEditing(false)}>Categories</button>
        <button onClick={() => setEditing(true)}>Edit List</button>
      </div>
      {
        editing ?
        <Editor exclusions={exclusions} fullList={fullList} passNewCategory={addCategory}/>
        :
        <List exclusions={exclusions} fullList={fullList} />
      }
    </div>
  )
}