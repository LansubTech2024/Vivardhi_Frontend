export let livePowerUsage = 220; // Initial live power usage in kW

export function updateLivePowerUsage() {
  // Simulate fluctuations in live power usage
  const fluctuation = Math.floor(Math.random() * 10 - 5); // Random change between -5 and +5 kW
  livePowerUsage += fluctuation;

  // To keep the value realistic, ensure it doesn’t go below 200 kW or above 300 kW
  if (livePowerUsage < 200) {
    livePowerUsage = 200;
  }
  if (livePowerUsage > 300) {
    livePowerUsage = 300;
  }

  return livePowerUsage;
}
