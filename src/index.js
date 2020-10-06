import React from 'react';
import ReactDOM from 'react-dom';

//components
import Canvas from './components/canvas'

const App = () =>{
  return (
    <div className = "newElement">
      <Canvas/>
    </div>
  )
}

ReactDOM.render(
    <App />, document.getElementById('root')
);
