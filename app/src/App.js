import React from 'react';
import './App.css';

// Components
import SignIn from './SignIn';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
      {/* <SignIn /> */}
    </div>
  );
}

export default App;
