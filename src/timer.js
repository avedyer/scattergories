import { useEffect, useState } from "react"

export default function Timer(props) {

  const [defaultTime, setDefaultTime] = useState(180)
  const [time, setTime] = useState(defaultTime)
  const [timeInput, setTimeInput] = useState()
  const [newTime,setNewTime] = useState(time)
  const [playing, setPlaying] = useState(false)
  const [editing, setEditing] = useState(false)
  const [automaticIncrement, setautomaticIncrement] = useState(0)
  const [incrementSpeed, setIncrementSpeed] = useState(1000)

  useEffect(() => {
    if (playing && newTime > 0) {
      //Set timer to queue new time
      setTimeout(() => {
        setNewTime(time - 1)
      }, 1000);
    }
  }, [playing, time])

  useEffect(() => {
    if (playing && time === 0) {
      setNewTime(defaultTime)
    }
  }, [playing])

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
    setTimeInput(defaultTime)
  }, [defaultTime])

  useEffect(() => {
    if (editing) {
      window.addEventListener('click', closeInput)
    }
    else {
      window.removeEventListener('click', closeInput)
      if (timeInput) {
        setDefaultTime(timeInput)
      }
      else {
        setTimeInput(defaultTime)
      }
    }
  }, [editing])

  useEffect(() => {
    if (defaultTime > 1 && defaultTime < 999 && automaticIncrement !== 0) {
      setTimeout(() => {
        setDefaultTime(defaultTime + automaticIncrement)
      }, incrementSpeed);
    }
  }, [automaticIncrement, defaultTime])

  useEffect(() => {
    if (automaticIncrement !== 0) {
      setTimeout(() => {
        setIncrementSpeed(100)
      }, 700)
      setTimeout(() => {
        setIncrementSpeed(80)
      }, 1400)
      setTimeout(() => {
        setIncrementSpeed(50)
      }, 2100)
      setTimeout(() => {
        setIncrementSpeed(30)
      }, 2800)
    }
    else {
      setIncrementSpeed(1000)
    }
  }, [automaticIncrement])

  useEffect(() => {
    if (automaticIncrement === 0) {
      setIncrementSpeed(1000)
    }
  }, [incrementSpeed])

  useEffect(() => {
    props.passPlaying(playing)
    if (time === 0 && playing) {
      setTime(defaultTime)
    }
  }, [playing])

  function updateTime(e) {
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value) && e.target.value.length < 4 || !e.target.value) {
      setTimeInput(e.target.value)
    }
  }

  function handleInput(e) {
    if (e.key === 'Enter') {
      setEditing(false)
      updateTime(e)
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
      <input type='text' id='time-input' onKeyUp={(e) => handleInput(e)} onChange={(e) => updateTime(e)} value={timeInput} />
      :
      <span className='display' onClick={(e) => {
        if (!playing) {
          setEditing(true); 
          e.stopPropagation();
        }}}>
        {time}
      </span>
      }
      <div className='incrementers'>
        <button disabled={playing || time === 1} 
          onMouseDown={() => setautomaticIncrement(-1)}
          onMouseUp={() => setautomaticIncrement(0)} 
          onClick={() => {
            setautomaticIncrement(0)
            setDefaultTime(time - 1)
          }}>
            -
        </button>
        <button disabled={playing || time > 998} 
          onMouseDown={() => setautomaticIncrement(1)}
          onMouseUp={() => setautomaticIncrement(0)} 
          onClick={() => {
            setautomaticIncrement(0)
            setDefaultTime(time + 1)
          }}>
            +
        </button>
      </div>
      <button className='play' disabled={editing || props.listEditing} onClick={() => setPlaying(!playing)}>{playing ? 'pause' : 'play'}</button>
    </div>
  )
}