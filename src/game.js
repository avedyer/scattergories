import Timer from "./timer"
import Letter from "./letter"
import Categories from "./categories"

import { useState } from "react"

export default function Game(props) {

  const [playing, setPlaying] = useState(false) //toggles actions when game is running.
  const [listEditing, setListEditing] = useState(false) //toggles actions while list is being edited.
  const [completed, setCompleted] = useState(false) //toggles actions after game is completed.

  return (
    <main>
      <Letter playing={playing}/>
      <Timer listEditing={listEditing} passCompleted={setCompleted} passPlaying={setPlaying}/> 
      <Categories completed={completed} playing={playing} passEditing={setListEditing} palette={props.palette}/>   
    </main>
  )
}