import { useState, useEffect } from "react"

import List from "./list"
import Editor from './editor'

import categories from './categories.txt'

export default function Categories(props) {

  const [editing, setEditing] = useState(false)
  const [fullList, setFullList] = useState([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (fullList.length === 0) {
      if (JSON.parse(localStorage.getItem('categories'))){
        setFullList(JSON.parse(localStorage.getItem('categories')))
      }
      else {
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
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('categories', JSON.stringify(fullList))
    } 
    else if (fullList.length > 0) {
      setInitialized(true)
    }
  }, [fullList])

  useEffect(() => {
    props.passEditing(editing)
  }, [editing])

  function addCategory(category) {
    if (!fullList.includes(category)) {
      let newArr = [...fullList]
      newArr.push(category)
      setFullList([...newArr])
    }
  }

  function removeCategory(category) {
    let newArr = fullList.filter((value) => value !== category);
    setFullList([...newArr])
  }

  return (
    <div id='categories'>
      <div className='tabs'>
        <button disabled={props.playing} onClick={() => setEditing(false)}>Categories</button>
        <button disabled={props.playing} onClick={() => setEditing(true)}>Edit List</button>
      </div>
      {
        editing ?
        <Editor fullList={fullList} passEditing={setEditing} passRemovedCategory={removeCategory} passNewCategory={addCategory}/>
        :
        <List completed={props.completed} playing={props.playing} fullList={fullList} />
      }
    </div>
  )
}