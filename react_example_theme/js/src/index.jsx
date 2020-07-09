import React from 'react'
import ReactDOM from 'react-dom'
import NodeReadWrite from "./components/NodeReadWrite";
import { hot } from 'react-hot-loader/root';

const Main = hot(() => (
  <NodeReadWrite />
));

ReactDOM.render(<Main />, document.getElementById('react-app'));
