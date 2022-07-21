import Timer from "./timer"
import Letter from "./letter"
import Categories from "./categories"

import { useState } from "react"

export default function Game() {

  const [playing, setPlaying] = useState(false)
  const [listEditing, setListEditing] = useState(false)

  return (
    <main>
      <Letter />
      <Timer listEditing={listEditing} passPlaying={setPlaying}/> 
      <Categories playing={playing} passEditing={setListEditing}/>
    </main>
  )
}