import './App.css';

import Game from './game.js';
import Footer from './footer';
import { useState } from 'react';

export default function App() {

  const [palette, setPalette] = useState()

  return (
    <div className="App">
      <Game palette={palette}/>
      <Footer passPalette={setPalette}/>
    </div>
  );
}