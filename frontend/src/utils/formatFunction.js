// utils/formatFunctions.js

function formatDate(checkInDate) {
  const date = new Date(checkInDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are 0-indexed, so we add 1
  const year = date.getUTCFullYear();

  return `${day}|${month}|${year}`;
}

function formatTime(dateString) {
  const date = new Date(dateString);

  // Convert to a 12-hour format with AM/PM
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock
  };

  return date.toLocaleTimeString("en-US", options);
}

// Export both functions
export { formatDate, formatTime };
