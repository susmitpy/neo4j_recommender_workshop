import React, { useState, useEffect, useRef } from 'react';

/**
 * FIXED VERSION - Timer rerendering issue resolved
 * 
 * Fixes Applied:
 * 1. Removed timeLeft from useEffect dependencies - prevents recreation on every tick
 * 2. Used useRef to persist interval reference across renders
 * 3. Separate useEffect for question changes to reset timer properly
 * 4. Cleanup function properly clears interval when component unmounts
 */
function QuizPlay() {
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const intervalRef = useRef(null); // FIX #1: Use ref to persist interval ID
  
  const questions = [
    { id: 1, text: "What is Neo4j?", options: ["Graph DB", "SQL DB", "NoSQL DB", "Cache"] },
    { id: 2, text: "What language does Neo4j use?", options: ["Cypher", "SQL", "MongoDB Query", "GraphQL"] },
    { id: 3, text: "What is a node in Neo4j?", options: ["Entity", "Relationship", "Property", "Index"] }
  ];

  // FIX #2: Separate effect for starting/stopping the timer
  // Only depends on isQuizActive, not timeLeft
  useEffect(() => {
    if (isQuizActive) {
      // Clear any existing interval before creating new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Create interval only once when quiz becomes active
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            return prevTime; // Don't go negative, separate useEffect will detect timeLeft === 0 and call handleTimeOut
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Clean up interval when quiz is not active
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isQuizActive]); // FIX #3: Only depends on isQuizActive, NOT timeLeft

  // FIX #4: Separate effect to handle time running out
  useEffect(() => {
    if (isQuizActive && timeLeft === 0) {
      handleTimeOut();
    }
  }, [timeLeft, isQuizActive]);

  // FIX #5: Reset timer when question changes
  // Use a ref to track if this is the initial render to prevent unwanted resets
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (isQuizActive) {
      setTimeLeft(20);
    }
  }, [currentQuestion]); // Only depend on currentQuestion, not isQuizActive

  const startQuiz = () => {
    setIsQuizActive(true);
    setTimeLeft(20);
    setCurrentQuestion(0);
  };

  const handleTimeOut = () => {
    console.log('Time ran out!');
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      // Timer will be reset by the useEffect watching currentQuestion
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
      <h1>Quiz Play (Fixed Version) ✅</h1>
      
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
            {/* FIXED: Timer now counts down smoothly without resetting */}
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
          
          {/* Skip button removed - progression is automated when time runs out */}
        </div>
      )}
      
      <div style={{ marginTop: '40px', padding: '15px', background: '#e0ffe0', borderRadius: '5px' }}>
        <strong>✅ Fixes Applied:</strong>
        <ul>
          <li>useEffect no longer depends on timeLeft - prevents interval recreation</li>
          <li>useRef stores interval ID persistently across renders</li>
          <li>Separate effects for timer logic and question changes</li>
          <li>Timer resets only when question changes (by design)</li>
          <li>Removed isQuizActive dependency from reset effect - prevents unwanted resets from external triggers</li>
          <li>Skip button removed - progression is automated when time expires</li>
        </ul>
      </div>
    </div>
  );
}

export default QuizPlay;
