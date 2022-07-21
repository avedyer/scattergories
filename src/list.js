import { useEffect, useState } from 'react';


export default function List(props) {

  
  const [promptList, setPromptList] = useState([])
  const [promptCount, setPromptCount] = useState(10)
  const [exclusions, setExclusions] = useState([])

  useEffect(() => {
    if (promptList.length < promptCount && props.fullList.length > 0) {
      let newArr = [...promptList]
      newArr.push(randomPrompt())
      setPromptList([...newArr])
    }
  }, [props.fullList , promptList])

  function randomPrompt() {

    let newPrompt = props.fullList[Math.floor(Math.random() * props.fullList.length)]
    
    if (exclusions.includes(newPrompt) || promptList.includes(newPrompt)) {
      return randomPrompt()
    }
    return newPrompt
  }

  return (
    <div id='list-container'>
      <div id='list'>
        {promptList.map((prompt) => 
          <p>{prompt}</p>
        )}
      </div>
      <button onClick={() => setPromptList([])} />
    </div>
  )
}