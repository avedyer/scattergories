import { useEffect, useState } from 'react';


export default function List(props) {
  
  const [categoryList, setCategoryList] = useState([])
  const [categoryCount, setCategoryCount] = useState()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (props.playing || props.completed) {
      setVisible(true)
    }
    else {
      setVisible(false)
    }
  }, [props.playing, props.completed])

  useEffect(() => {
    setCategoryCount(props.fullList.length - props.exclusions.length > 9 ? 10 : props.fullList.length - props.exclusions.length)
  }, [props.fullList])

  useEffect(() => {
    if (categoryList.length < categoryCount && props.fullList.length > 0) {
      let newArr = [...categoryList]
      newArr.push(randomCategory())
      setCategoryList([...newArr])
    }
  }, [props.fullList , categoryList])

  useEffect(() => {
    let newArr = [...categoryList]

    while (newArr.length > categoryCount) {
      newArr.pop()
    }

    setCategoryList([...newArr])
    
  }, [categoryCount])

  function randomCategory() {

    let newCategory = props.fullList[Math.floor(Math.random() * props.fullList.length)]
    
    if (categoryList.includes(newCategory) || props.exclusions.includes(newCategory)) {
      return randomCategory()
    }
    return newCategory
  }

  return (
    <div id='list-container'>
      <div id='list'>
      {
        categoryList.length === 0 ?
        <p id='list-error'>No categories to be found. Add some <button onClick={() => props.passEditing(true)}>here</button>.</p>
        :
        categoryList.map((category, index) => <p className={visible ? '' : 'hidden'}>{`${index + 1}: ${category}`}</p>)
      }
      </div>
      <div id='list-controls'>
        <div id='quantity-display'>
          <span id='quantity'>{categoryCount}</span>
          <div className='incrementers'>
            <button disabled={props.playing || categoryCount < 6} onClick={() => setCategoryCount(categoryCount - 1)}>-</button>
            <button disabled={props.playing || categoryCount > 15 || categoryCount >= props.fullList.length} onClick={() => setCategoryCount(categoryCount + 1)}>+</button>
          </div>
        </div>
        <button disabled={props.playing} className='reroll' onClick={() => {setCategoryList([]); setVisible(false)}}>???
        </button>
      </div>
    </div>
  )
}