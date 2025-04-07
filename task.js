// task.js
export const tasks = [];

export function addTask(task) {
  try {
    // Validate fields
    if (!task.title || typeof task.dueTime !== "number" || !task.priority) {
      throw new Error("Task must include title, dueTime (in minutes), and priority.");
    }
    if (!["High", "Medium", "Low"].includes(task.priority)) {
      throw new Error("Priority must be 'High', 'Medium', or 'Low'.");
    }
    if (task.dueTime <= 0) {
      throw new Error("dueTime must be a positive number.");
    }

    task.createdAt = Date.now();
    tasks.push(task);
    return true;
  } catch (error) {
    console.error("❌ Error adding task:", error.message);
    return false;
  }
}

export function sortTasksByPriority() {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

export function getTasksDueWithin(minutes) {
  const now = Date.now();
  return tasks.filter((task) => {
    const dueAt = task.createdAt + task.dueTime * 60000;
    return dueAt - now <= minutes * 60000;
  });
}

export function scheduleReminders() {
  const reminderMap = new Map();

  tasks.forEach((task) => {
    const delay = task.dueTime * 60000; // convert minutes to ms

    const timer = setTimeout(() => {
      console.log(`🔔 Reminder: "${task.title}" (${task.priority} priority) is due now!`);
      reminderMap.delete(task.title);
    }, delay);

    reminderMap.set(task.title, timer);
  });

  return reminderMap;
}