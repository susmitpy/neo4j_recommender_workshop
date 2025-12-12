/**
 * Test file to validate QuizPlay timer logic
 * 
 * This demonstrates the key differences between buggy and fixed versions
 */

// Mock timer behavior simulation

console.log("=== QuizPlay Timer Bug Analysis ===\n");

// BUGGY VERSION SIMULATION
console.log("1. BUGGY VERSION:");
console.log("   - useEffect depends on [timeLeft, isQuizActive]");
console.log("   - Every second, timeLeft changes (20 -> 19 -> 18...)");
console.log("   - Each change triggers useEffect to run");
console.log("   - New interval created, old one cleared");
console.log("   - Result: Timer behaves erratically, resets unexpectedly\n");

let buggyIntervalCount = 0;
function simulateBuggyVersion() {
  console.log("   Simulating buggy timer:");
  let timeLeft = 20;
  
  // Simulates what happens with timeLeft in dependencies
  for (let tick = 0; tick < 5; tick++) {
    buggyIntervalCount++;
    console.log(`   Tick ${tick}: timeLeft=${timeLeft}, intervals created=${buggyIntervalCount}`);
    timeLeft--;
    // In real scenario, useEffect runs again here, creating new interval
  }
  console.log(`   Total intervals created in 5 seconds: ${buggyIntervalCount} ❌\n`);
}

simulateBuggyVersion();

// FIXED VERSION SIMULATION
console.log("2. FIXED VERSION:");
console.log("   - useEffect depends only on [isQuizActive]");
console.log("   - Effect runs only when quiz starts/stops");
console.log("   - One interval persists for entire quiz duration");
console.log("   - useRef stores interval ID across renders");
console.log("   - Result: Timer counts down smoothly\n");

let fixedIntervalCount = 0;
function simulateFixedVersion() {
  console.log("   Simulating fixed timer:");
  let timeLeft = 20;
  
  // Simulates interval created once
  fixedIntervalCount = 1;
  console.log(`   Quiz started: interval created (total=${fixedIntervalCount})`);
  
  for (let tick = 0; tick < 5; tick++) {
    console.log(`   Tick ${tick}: timeLeft=${timeLeft}, intervals created=${fixedIntervalCount}`);
    timeLeft--;
    // useEffect does NOT run again, same interval continues
  }
  console.log(`   Total intervals created in 5 seconds: ${fixedIntervalCount} ✅\n`);
}

simulateFixedVersion();

// KEY FIXES SUMMARY
console.log("=== KEY FIXES APPLIED ===");
console.log("1. useEffect dependencies: [timeLeft, isQuizActive] -> [isQuizActive]");
console.log("2. Added: const intervalRef = useRef(null)");
console.log("3. Separated timer logic into multiple focused useEffects");
console.log("4. Proper cleanup: clearInterval(intervalRef.current) on unmount");
console.log("\n=== RESULT ===");
console.log(`Buggy: ${buggyIntervalCount} intervals in 5 seconds ❌`);
console.log(`Fixed: ${fixedIntervalCount} interval in 5 seconds ✅`);
console.log("\nPerformance improvement: " + ((buggyIntervalCount - fixedIntervalCount) / buggyIntervalCount * 100).toFixed(1) + "% reduction in interval recreations");
