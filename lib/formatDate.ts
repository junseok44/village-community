export function formatDate(timestamp: Date) {
  const now = Date.now();
  const date = new Date(timestamp);
  const isToday = date.toDateString() === new Date(now).toDateString();

  if (isToday) {
    // Display time if it's today
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // Display date if it's not today
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${month}/${day}`;
  }
}
