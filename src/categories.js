import { useState, useEffect } from "react"

import List from "./list"
import Editor from './editor'

import prompts from './prompts.txt'

export default function Categories(props) {

  const [editing, setEditing] = useState(false)
  const [fullList, setFullList] = useState([])
  const [exclusions, setExclusions] = useState([])

  useEffect(() => {
    if (fullList.length === 0) {
      fetch(prompts)
      .then(r => r.text())
      .then(text => {
        let newArr = []
        let queuedPrompt = ''
        for (let i=0; i<text.length; ++i) {
          if (text[i] !== ',') {
            queuedPrompt += text[i]
          }
          else {
            newArr.push(queuedPrompt)
            queuedPrompt = ''
          }
        }
        newArr.push(queuedPrompt)
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