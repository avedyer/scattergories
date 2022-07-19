import { useEffect, useState } from 'react';
import prompts from './prompts.txt'

export default function List(props) {

  const [fullList, setfullList] = useState([])
  const [promptList, setPromptList] = useState([])
  const [promptCount, setPromptCount] = useState(10)
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
        setfullList([...newArr])
      });
    }
  }, [])

  useEffect(() => {
    if (promptList.length < promptCount && fullList.length > 0) {
      let newArr = [...promptList]
      newArr.push(randomPrompt())
      setPromptList([...newArr])
    }
  }, [fullList , promptList])

  function randomPrompt() {

    let newPrompt = fullList[Math.floor(Math.random() * fullList.length)]
    
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