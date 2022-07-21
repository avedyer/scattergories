import { useState, useEffect } from "react"

import List from "./list"
import Editor from './editor'

import prompts from './prompts.txt'

export default function Categories(props) {

  const [editing, setEditing] = useState(false)
  const [fullList, setfullList] = useState([])

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
        setfullList([...newArr])
      });
    }
  }, [])

  if (!editing) {
    return (
      <div id='categories'>
        <List fullList={fullList}/>  
      </div>
    )
  }
  else {
    <div id='categories'>
      <Editor fullList={fullList}/>
    </div>
  }
}