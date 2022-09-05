import Timer from "./timer"
import Letter from "./letter"
import Categories from "./categories"

import { useState } from "react"

export default function Game(props) {

  const [playing, setPlaying] = useState(false)
  const [listEditing, setListEditing] = useState(false)
  const [completed, setCompleted] = useState(false)

  return (
    <main>
      <Letter playing={playing}/>
      <Timer listEditing={listEditing} passCompleted={setCompleted} passPlaying={setPlaying}/> 
      <Categories completed={completed} playing={playing} passEditing={setListEditing} palette={props.palette}/>   
    </main>
  )
}