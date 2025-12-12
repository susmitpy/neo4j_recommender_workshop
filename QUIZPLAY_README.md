# QuizPlay - Timer Bug Fix Implementation

## Overview
This is a React-based quiz application that demonstrates the identification and resolution of a timer rerendering bug. The application includes both buggy and fixed versions to showcase the problem and solution.

## The Problem
During quiz play with a 20-second timer, the component experienced:
- Repeated re-rendering causing performance degradation
- Timer display resetting to 20s unexpectedly
- Multiple intervals running simultaneously

## The Solution
The bug was fixed by:
1. **Removing `timeLeft` from useEffect dependencies** - Prevents interval recreation on every tick
2. **Using `useRef` to persist interval ID** - Maintains interval reference across renders
3. **Separating concerns into multiple useEffect hooks** - Each effect has a single responsibility
4. **Proper cleanup of intervals** - Ensures no memory leaks or duplicate intervals

## Project Structure
```
src/
├── QuizPlay.jsx          # Fixed version with proper timer management
├── QuizPlay.buggy.jsx    # Original buggy version for comparison
├── App.js                # Main app with toggle between versions
├── App.css               # Styling
└── index.js              # Entry point
```

## Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open in your browser at `http://localhost:3000`

## Features
- Toggle between buggy and fixed versions
- 20-second timer per question
- 3 sample quiz questions about Neo4j
- Visual feedback (timer turns red when ≤5 seconds remain)
- Automatic progression when time runs out
- Manual skip option

## Key Implementation Details

### Fixed Version (QuizPlay.jsx)
```javascript
// Uses useRef to persist interval
const intervalRef = useRef(null);

// Effect only depends on isQuizActive, NOT timeLeft
useEffect(() => {
  if (isQuizActive) {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
  }
  return () => clearInterval(intervalRef.current);
}, [isQuizActive]); // ✅ No timeLeft dependency
```

### Buggy Version (QuizPlay.buggy.jsx)
```javascript
// Recreates interval on every tick
useEffect(() => {
  if (isQuizActive && timeLeft > 0) {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }
}, [timeLeft, isQuizActive]); // ❌ timeLeft causes recreation
```

## Documentation
See [BUGFIX_DOCUMENTATION.md](../BUGFIX_DOCUMENTATION.md) for detailed root cause analysis and fix explanation.

## Testing the Fix
1. Run the application
2. Toggle to "Buggy Version" and start a quiz - observe timer behavior
3. Toggle to "Fixed Version" and start a quiz - observe smooth countdown
4. Open browser console to see the difference in rendering behavior

## Technologies Used
- React 18.2.0
- React Hooks (useState, useEffect, useRef)
- Create React App

## License
MIT License - Part of the Neo4j Recommender Workshop project
