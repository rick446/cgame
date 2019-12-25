import React from 'react';
import {useSelector} from 'react-redux';

function Game() {
  const message = useSelector(state => state.message);
  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
};

export default Game;
