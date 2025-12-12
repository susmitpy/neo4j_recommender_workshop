import React, { useState } from 'react';
import QuizPlay from './QuizPlay';
import QuizPlayBuggy from './QuizPlay.buggy';
import './App.css';

function App() {
  const [showBuggy, setShowBuggy] = useState(false);

  return (
    <div className="App">
      <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
        <h1>QuizPlay Timer Bug Fix Demonstration</h1>
        <p>Toggle between buggy and fixed versions to see the difference</p>
        <button 
          onClick={() => setShowBuggy(!showBuggy)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: showBuggy ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showBuggy ? '🐛 Showing Buggy Version - Click to see Fixed' : '✅ Showing Fixed Version - Click to see Buggy'}
        </button>
      </div>
      
      {showBuggy ? <QuizPlayBuggy /> : <QuizPlay />}
      
      <footer style={{ padding: '20px', textAlign: 'center', background: '#f8f9fa', marginTop: '40px' }}>
        <p>Neo4j Recommender Workshop - QuizPlay Component</p>
      </footer>
    </div>
  );
}

export default App;
