// Function to generate live power usage data
export const generateLivePowerUsage = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format time as HH:MM:SS
  const usage = Math.floor(Math.random() * 50) + 150; // Random power usage between 150 and 200 kW

  return { time, usage };
};

// Function to generate an array of dates for the last 30 days
const getLast30Days = () => {
  const dates = [];
  const today = new Date(); // Get the current date

  for (let i = 0; i < 30; i++) {
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - i); // Subtract 'i' days from today
    dates.push(pastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })); // Format date as "Month Day"
  }

  return dates.reverse(); // Reverse the array to start from the oldest date
};

// Power usage data for the last 30 days
export const historicalPowerData = getLast30Days().map((date, index) => ({
  date: date, // The formatted date (e.g., "Oct 1")
  usage: Math.floor(Math.random() * 100) + 150, // Random power usage between 150 and 250 kW
}));
