import { useEffect, useState } from 'react';


export default function List(props) {
  
  const [categoryList, setCategoryList] = useState([])
  const [categoryCount, setCategoryCount] = useState()
  const [visible, setVisible] = useState(false)
  const [listLoaded, setListLoaded] = useState(false)
  const [timeoutArray, setTimeoutArray] = useState([])

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

  useEffect(() => {
    setListLoaded(document.querySelectorAll('.category-cover').length === categoryCount)
  }, [document.querySelectorAll('.category-cover')])

  useEffect(() => {
    if (props.palette && listLoaded) {
      document.querySelectorAll('.category-cover').forEach(category => {
        category.style.backgroundColor = props.palette.p
        changeBackground(category)
      })
    }
  }, [props.palette, listLoaded])

  useEffect(() => {
    timeoutArray.forEach(timeout => clearTimeout(timeout))
    setTimeoutArray([])
  }, [props.palette, visible])

  useEffect(() => {
    let categoryNodeList = document.querySelectorAll('.category-cover')

    if (listLoaded) {

      setTimeoutArray([])

      let newArr = []

      if (visible) {
        for (let i=0; i<categoryNodeList.length; ++i) {
          const newTimeout = setTimeout(() => changeBackground(categoryNodeList[i]), i*50)
          newArr.push(newTimeout)
        }
      }
      else {
        for (let i=0; i<categoryNodeList.length; ++i) {
          const newTimeout = setTimeout(() => changeBackground(categoryNodeList[i]), i*50)
          newArr.push(newTimeout)
        }
      }

      setTimeoutArray([...newArr])
    }

  }, [visible])


  function randomCategory() {

    let newCategory = props.fullList[Math.floor(Math.random() * props.fullList.length)]
    
    if (categoryList.includes(newCategory) || props.exclusions.includes(newCategory)) {
      return randomCategory()
    }
    return newCategory
  }

  function changeBackground(node) {
    node.style.width = visible ? `0px` : `100%`
  }

  return (
    <div id='list-container'>
      <div id='play-list'>
      {
        categoryList.length === 0 ?
        <p id='list-error'>No categories to be found. Add some <button onClick={() => props.passEditing(true)}>here</button>.</p>
        :
        categoryList.map((category, index) => (
          <div className='category-container'>
            <div className='category-cover' style = {listLoaded ? {} : {backgroundColor: 'black'}}/>
            <p className='category'>{`${index + 1}: ${listLoaded ? category : ''}`}</p>
          </div>
          )
        )
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
        <button disabled={props.playing} className='reroll' onClick={() => {setCategoryList([]); setVisible(false)}}>↻
        </button>
      </div>
    </div>
  )
}