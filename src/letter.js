import { useState } from "react"

export default function Letter() {
  const [letter, setLetter] = useState(randomLetter())

  function randomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return letters[Math.floor(Math.random() * letters.length)]
  }

  return (
    <div id='letter'>
      <button id='reroll' onClick={() => setLetter(randomLetter())}/>
      <span>{letter}</span>
    </div>
  )
}