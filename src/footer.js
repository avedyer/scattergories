import { useState, useEffect } from "react"

import { ReactComponent as Sun } from "./imgs/sun.svg"
import { ReactComponent as Moon } from "./imgs/moon.svg"

export default function Footer(props) {

  const palettes = [
    {p: '#000000', s: '#ffffff'}, 
    {p: '#E0BAD7', s: '#61D095'}, 
    {p: '#E3D26F', s: '#A15E49'}, 
    {p: '#E69597', s: '#9CF6F6'}, 
    {p: '#C97B84', s: '#251351'}, 
    {p: '#725752', s: '#D4DFC7'},
    {p: '#EF767A', s: '#456990'}, 
    {p: '#49DCB1', s: '#EEB868'}, 
    {p: '#114B5F', s: '#F45B69'}, 
    {p: '#E9B872', s: '#6494AA'},
    {p: '#f33b33', s: '#3b82f3'}
  ]

  const [index, setIndex] = useState(0)
  const [newIndex, setNewIndex] = useState(0)
  const [inverted, setInverted] = useState(false)
  const [palette, setPalette] = useState(palettes[0])

  useEffect(() => {
    if (newIndex < 0) {
      setIndex(palettes.length - 1)
    }
    else if (newIndex >= palettes.length) {
      setIndex(0)
    }
    else {
      setIndex(newIndex)
    }
  }, [newIndex])

  useEffect(() => {
    if (!inverted) {
      setPalette({p: palettes[index].p, s: palettes[index].s})
    }
    else {
      setPalette({p: palettes[index].s, s: palettes[index].p})
    }
    setNewIndex(index)
  }, [index, inverted])

  useEffect(() => {
    if (palette) {
      const node = document.getElementById('root');
      node.style.color = palette.p;
      node.style.borderColor = palette.p
      node.style.backgroundColor = palette.s

      props.passPalette(palette)
    }
  }, [palette])

  return (
    <footer>
      <div id='color-switcher'>
        <button onClick={() => setNewIndex(index - 1)}>
          <svg fill={palette.p} className='arrow'>
            <polygon points="0,12  24,0 24,24" class="triangle" />
          </svg>
        </button>
        <button onClick={() => setInverted(!inverted)} style={{color: palette ? palette.p : 'black'}}>
          {inverted ?
           <Moon fill={palette.p} id='day-night-icon'/>
           :
           <Sun fill={palette.p} id='day-night-icon'/>
          }
        </button>
        <button onClick={() => setNewIndex(index + 1)}>
          <svg fill={palette.p} className='arrow'>
            <polygon points="0,0  0,24 24,12" class="triangle" />
          </svg>
        </button>
      </div>
    </footer>
  )
}