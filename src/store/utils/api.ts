// Optimized function to generate unique 8-digit IDs
export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${timestamp}${random}`;
};

// Helper function to create application ID with DGE prefix
export const createApplicationId = (): string => `DGE-${generateUniqueId()}`;

// Helper function for API delay simulation
export const simulateDelay = async (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
