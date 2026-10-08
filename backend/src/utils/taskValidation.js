function validateTask({ title, priority, dueDate, completed }) {
  if (!title || title.trim().length < 3) {
    return "Title must be at least 3 characters";
  }

  if (priority && !["LOW", "MEDIUM", "HIGH"].includes(priority)) {
    return "Priority must be LOW, MEDIUM, or HIGH";
  }

  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    return "Invalid due date";
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return "Completed must be true or false";
  }

  return null;
}

module.exports = validateTask;
