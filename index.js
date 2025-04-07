// index.js
import {
    addTask,
    sortTasksByPriority,
    getTasksDueWithin,
    scheduleReminders,
  } from './task.js';
  
  try {
    // Add tasks
    addTask({ title: "Complete Report", dueTime: 5, priority: "High" });
    addTask({ title: "Team Meeting", dueTime: 15, priority: "Medium" });
    addTask({ title: "Code Review", dueTime: 10, priority: "High" });
  
    // Sort and display tasks by priority
    console.log("📋 Sorted Tasks by Priority:");
    console.log(sortTasksByPriority());
  
    // Display tasks due in the next 10 minutes
    console.log("\n⏳ Tasks Due Within 10 Minutes:");
    console.log(getTasksDueWithin(10));
  
    // Schedule reminders using setTimeout
    console.log("\n🔔 Scheduling Reminders...");
    const reminderTimers = scheduleReminders();
  
    // Gracefully handle termination (e.g., Ctrl+C)
    process.on("SIGINT", () => {
      for (let timer of reminderTimers.values()) {
        clearTimeout(timer);
      }
      console.log("\n🛑 Reminders cleared. Exiting...");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
  }  