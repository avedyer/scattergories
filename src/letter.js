import { useState, useEffect } from "react"

export default function Letter() {

  const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((i) => String.fromCharCode(i));

  const [exclusions, setExclusions] = useState([])
  const [firstLetter, setFirstLetter] = useState()

  useEffect(() => {
    if (exclusions.length === 0 && JSON.parse(localStorage.getItem('exclusions')).length > 0) {
      setExclusions(JSON.parse(localStorage.getItem('exclusions')))
    }
  }, [exclusions])

  useEffect(() => {
    if (!firstLetter) {
      setFirstLetter(randomLetter())
    }
  }, [])

  function randomLetter() {
    if (exclusions.length >= 25) {
      return firstLetter
    }

    let newLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
    
    if (exclusions.includes(newLetter) || newLetter === firstLetter) {
      return randomLetter()
    }
    return newLetter
  }

  function toggleExclusion(e) {

    if (exclusions.length >= 25) {
      return
    }

    const letter = e.target.innerHTML
    if (exclusions.includes(letter)) {
      const newArr = exclusions.filter(char => char!==letter)
      setExclusions([...newArr])
      localStorage.setItem('exclusions', JSON.stringify(newArr))
    }
    else {
      const newArr = [...exclusions]
      newArr.push(letter)
      setExclusions([...newArr])
      localStorage.setItem('exclusions', JSON.stringify(newArr))
    }
  }

  return (
    <div id='letter'>
      <span className='display'>{firstLetter}</span>
      <button id='reroll' onClick={() => setFirstLetter(randomLetter())}>↻</button>
      <div id='exclusions'>
        {alphabet.map((letter) => {
          const classes = `letter ${exclusions.includes(letter) ? 'excluded' : ''}`
          return <div className={classes}  onClick={(e) => toggleExclusion(e)}>{letter}</div>
        }
        )}
      </div>
    </div>
  )
}