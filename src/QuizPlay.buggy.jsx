import React, { useState, useEffect } from 'react';

/**
 * BUGGY VERSION - This component demonstrates the timer rerendering issue
 * 
 * Root Causes of the Bug:
 * 1. useEffect has 'timeLeft' in dependencies, causing it to run on every timer tick
 * 2. Each time useEffect runs, it clears and creates a NEW interval
 * 3. This causes the timer to reset because multiple intervals conflict
 * 4. Component rerenders excessively due to improper dependency management
 */
function QuizPlayBuggy() {
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  
  const questions = [
    { id: 1, text: "What is Neo4j?", options: ["Graph DB", "SQL DB", "NoSQL DB", "Cache"] },
    { id: 2, text: "What language does Neo4j use?", options: ["Cypher", "SQL", "MongoDB Query", "GraphQL"] },
    { id: 3, text: "What is a node in Neo4j?", options: ["Entity", "Relationship", "Property", "Index"] }
  ];

  // BUG #1: useEffect depends on timeLeft, causing it to recreate interval on every tick
  useEffect(() => {
    if (isQuizActive && timeLeft > 0) {
      // BUG #2: New interval is created every time timeLeft changes (every second!)
      const interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // Move to next question when time runs out
            handleNextQuestion();
            return 20; // Reset timer
          }
          return prevTime - 1;
        });
      }, 1000);

      // BUG #3: Interval gets cleared and recreated constantly
      return () => clearInterval(interval);
    }
  }, [timeLeft, isQuizActive]); // BUG: timeLeft in dependencies causes infinite recreations

  const startQuiz = () => {
    setIsQuizActive(true);
    setTimeLeft(20);
    setCurrentQuestion(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(20); // Reset timer for next question
    } else {
      setIsQuizActive(false);
      alert('Quiz completed!');
    }
  };

  const handleAnswer = (option) => {
    console.log(`Answered: ${option}`);
    handleNextQuestion();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Quiz Play (Buggy Version)</h1>
      
      {!isQuizActive ? (
        <div>
          <h2>Welcome to the Quiz!</h2>
          <p>Each question has a 20-second timer.</p>
          <button onClick={startQuiz} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
            <h3>Question {currentQuestion + 1} of {questions.length}</h3>
            {/* BUG SYMPTOM: This timer display keeps resetting to 20s */}
            <div style={{ fontSize: '24px', color: timeLeft <= 5 ? 'red' : 'green', fontWeight: 'bold' }}>
              Time Left: {timeLeft}s
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h2>{questions[currentQuestion].text}</h2>
          </div>
          
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  fontSize: '16px',
                  cursor: 'pointer',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  background: 'white'
                }}
              >
                {option}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleNextQuestion}
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '14px' }}
          >
            Skip Question
          </button>
        </div>
      )}
      
      <div style={{ marginTop: '40px', padding: '15px', background: '#ffe0e0', borderRadius: '5px' }}>
        <strong>🐛 Bug Symptoms:</strong>
        <ul>
          <li>Timer resets to 20s unexpectedly</li>
          <li>Component rerenders excessively (check console)</li>
          <li>Multiple intervals running simultaneously</li>
        </ul>
      </div>
    </div>
  );
}

export default QuizPlayBuggy;
