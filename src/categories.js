import { useState, useEffect } from "react"

import List from "./list"
import Editor from './editor'

import categories from './categories.txt'

export default function Categories(props) {

  const [editing, setEditing] = useState(false)
  const [fullList, setFullList] = useState([])
  const [exclusions, setExclusions] = useState([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (fullList.length === 0) {
      if (JSON.parse(localStorage.getItem('categories'))){
        if (JSON.parse(localStorage.getItem('categories')). length === 0) {
          return
        }
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
  }, [fullList])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('excludedCategories', JSON.stringify(exclusions))
    }
  }, [exclusions])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('categories', JSON.stringify(fullList))
      if (localStorage.getItem('excludedCategories') && localStorage.getItem('excludedCategories').length > 0)  {
        setExclusions(JSON.parse(localStorage.getItem('excludedCategories')))
      }
    } 
    else if (fullList.length > 0) {
      setInitialized(true)
    }
  }, [fullList, initialized])

  useEffect(() => {
    props.passEditing(editing)
  }, [editing])

  function addCategory(category) {
    if (!fullList.includes(category)) {
      let newArr = [...fullList]
      newArr.unshift(category)
      setFullList([...newArr])
    }
  }

  function toggleExclusion(category) {
    if (exclusions.includes(category)) {
      let newArr = exclusions.filter((value) => value !== category);
      setExclusions([...newArr])
    }
    else {
      let newArr = [...exclusions]
      newArr.push(category)
      setExclusions([...newArr])
    }
  }

  function resetList() {
    setInitialized(false)
    setFullList([])
    setExclusions([])
    localStorage.removeItem('categories')
    localStorage.removeItem('excludedCategories')
  }

  function clearList() {
    setFullList([])
    setExclusions([])
    localStorage.setItem('categories', JSON.stringify([]))
    localStorage.setItem('excludedCategories', JSON.stringify([]))
  }
 
  return (
    <div id='categories'>
      <div className='tabs'>
        <button disabled={props.playing} onClick={() => setEditing(false)}>Categories</button>
        <button disabled={props.playing} onClick={() => setEditing(true)}>Edit List</button>
      </div>
      {
        editing ?
        <Editor fullList={fullList} exclusions={exclusions} passEditing={setEditing} passExcludedCategory={toggleExclusion} passNewCategory={addCategory} clearList={clearList} passReset={resetList}/>
        :
        <List completed={props.completed} playing={props.playing} fullList={fullList} exclusions={exclusions} passEditing={setEditing}/>
      }
    </div>
  )
}