import { useEffect, useState } from 'react';


export default function List(props) {

  
  const [categoryList, setCategoryList] = useState([])
  const [categoryCount, setCategoryCount] = useState(10)

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
    
    if (categoryList.includes(newCategory)) {
      return randomCategory()
    }
    return newCategory
  }

  return (
    <div id='list-container'>
      <div className='incrementers'>
        <button disabled={props.playing} onClick={() => setCategoryCount(categoryCount > 5 ? categoryCount - 1 : 5)}>-</button>
        <button disabled={props.playing} onClick={() => setCategoryCount(categoryCount < 20 ? categoryCount + 1 : 20)}>+</button>
      </div>
      <div id='list'>
        {categoryList.map((category) => 
          <p>{category}</p>
        )}
      </div>
      <button onClick={() => setCategoryList([])} />
    </div>
  )
}