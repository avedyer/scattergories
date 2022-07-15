import { useEffect, useState } from "react"

export default function Timer() {

  const [defaultTime, setDefaultTime] = useState(180)
  const [time, setTime] = useState(defaultTime)
  const [newTime,setNewTime] = useState(time)
  const [playing, setPlaying] = useState(false)
  const [editing, setEditing] = useState(true)

  useEffect(() => {
    if (playing && newTime > 0) {
      //Set timer to queue new time
      setTimeout(() => {
        setNewTime(time - 1)
      }, 1000);
    }
  }, [playing, time])

  useEffect(() => {
    //Set displayed time to queued time if game has not been paused
    if (playing) {
      setTime(newTime)
    }
    if (!playing) {
      setNewTime(time)
    }
  }, [newTime])

  useEffect(() => {
    if (time === 0) {
      setPlaying(false)
    }
  }, [time])

  useEffect(() => {
    setTime(defaultTime)
  }, [defaultTime])

  useEffect(() => {
    if (editing) {
      window.addEventListener('click', closeInput)
    }
    else {
      window.removeEventListener('click', closeInput)
    }
  }, [editing])

  function updateTime(e) {
    console.log(e)
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setTime(e.target.value)
    }
  }

  function handleInput(e) {
    if (e.key === 'Enter') {
      setEditing(false)
    }
  }

  function closeInput(e) {
    if (document.getElementById('time-input')) {
      if (!document.getElementById('time-input').contains(e.target)){
        setEditing(false)
      } 
    } 
  }

  return (
    <div id='timer'>
      {editing ? 
      <input type='text' id='time-input' onKeyUp={(e) => handleInput(e)} onChange={(e) => updateTime(e)} onSubmit={() => setEditing(false)} value={time}></input>
      :
      <span className='display' onClick={(e) => {
        if (!playing) {
          setEditing(true); 
          e.stopPropagation();
        }}}>
          {time}
      </span>
      }
      <button className='incrementer' disabled={playing} onClick={() => {setDefaultTime(time - 1)}}>-</button>
      <button className='incrementer' disabled={playing} onClick={() => {setDefaultTime(time + 1)}}>+</button>
      <button className='play' disabled={editing} onClick={() => setPlaying(!playing)}>{playing ? 'pause' : 'play'}</button>
    </div>
  )
}