import Timer from "./timer"
import Letter from "./letter"
import Categories from "./categories"

import { useState } from "react"

export default function Game() {

  const [playing, setPlaying] = useState(false)
  const [listEditing, setListEditing] = useState(false)
  const [completed, setCompleted] = useState(false)

  return (
    <main>
      <Letter />
      <Timer listEditing={listEditing} passCompleted={setCompleted} passPlaying={setPlaying}/> 
      <Categories completed={completed} playing={playing} passEditing={setListEditing}/>
    </main>
  )
}