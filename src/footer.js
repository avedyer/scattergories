import { useState, useEffect } from "react"

export default function Footer() {

  const [index, setIndex] = useState(0)
  const [newIndex, setNewIndex] = useState(0)
  const [inverted, setInverted] = useState(false)
  const [palette, setPalette] = useState()

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
    {p: '#f33bee', s: '#3b82f3'}
  ]

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
    }
  }, [palette])

  return (
    <footer>
      <div id='color-switcher'>
        <button onClick={() => setNewIndex(index - 1)}>/</button>
        <button onClick={() => setNewIndex(index + 1)}>\</button>
        <button onClick={() => setInverted(!inverted)} style={{color: palette ? palette.p : 'black'}}>invert</button>
      </div>
    </footer>
  )
}