import { AppError } from '../utils/asyncUtils.js';

// Example service that might handle business logic
const exampleService = {
  processData: async (data) => {
    try {
      // Business logic processing
      const processedData = { ...data, processed: true };
      return processedData;
    } catch (error) {
      throw new AppError(`Error processing data: ${error.message}`, 500);
    }
  }
};

export default exampleService;
