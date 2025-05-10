// This module provides utility functions for handling asynchronous operations, error handling, and response formatting in a Node.js application.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Generates pagination metadata for API responses
 * @param {Object} options - Pagination options
 * @param {number} options.total - Total number of items
 * @param {number} options.page - Current page number (1-indexed)
 * @param {number} options.limit - Items per page
 * @param {string} [options.baseUrl] - Base URL for next/prev links
 * @returns {Object} - Pagination metadata
 */
export const createPaginationMeta = ({ total, page = 1, limit = 10, baseUrl = '' }) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  const meta = {
    currentPage: page,
    itemsPerPage: limit,
    totalItems: total,
    totalPages,
    hasNextPage,
    hasPrevPage
  };
  
  // Add navigation links if baseUrl is provided
  if (baseUrl) {
    meta.links = {};
    if (hasNextPage) {
      meta.links.next = `${baseUrl}?page=${page + 1}&limit=${limit}`;
    }
    if (hasPrevPage) {
      meta.links.prev = `${baseUrl}?page=${page - 1}&limit=${limit}`;
    }
    meta.links.first = `${baseUrl}?page=1&limit=${limit}`;
    meta.links.last = `${baseUrl}?page=${totalPages}&limit=${limit}`;
  }
  
  return meta;
};

/**
 * Creates a standardized API response object
 * @param {Object} options - Response options
 * @param {boolean} [options.success=true] - Whether the operation was successful
 * @param {string} [options.message=''] - Response message
 * @param {any} [options.data=null] - Response data
 * @param {number} [options.statusCode=200] - HTTP status code
 * @param {Object} [options.meta={}] - Additional metadata (pagination, etc.)
 * @param {Array} [options.errors=[]] - Validation or processing errors
 * @returns {Object} - Formatted response object
 */
export const createResponse = ({
  success = true,
  message = '',
  data = null,
  statusCode = 200,
  meta = {},
  errors = []
} = {}) => {
  // Basic response structure
  const response = {
    success,
    message,
    timestamp: new Date().toISOString()
  };

  // Only include data if it exists
  if (data !== null && data !== undefined) {
    response.data = data;
  }

  // Include metadata if provided
  if (Object.keys(meta).length > 0) {
    response.meta = meta;
  }

  // Include errors array if it has entries
  if (errors.length > 0) {
    response.errors = errors;
  }

  return response;
};

/**
 * Validates request data against a schema
 * @param {Object} data - The data to validate
 * @param {Object} schema - The validation schema with field name keys and validation rules
 * @returns {Array} - Array of validation errors (empty if valid)
 * 
 * Example schema:
 * {
 *   email: { required: true, isEmail: true },
 *   password: { required: true, minLength: 8 },
 *   age: { type: 'number', min: 18 }
 * }
 */
export const validateRequest = (data, schema) => {
  const errors = [];
  
  Object.keys(schema).forEach(field => {
    const rules = schema[field];
    const value = data[field];
    
    // Check required fields
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push({ field, message: `${field} is required` });
      return; // Skip other validations if the field is missing
    }
    
    // If field is not provided but not required, skip other validations
    if (value === undefined || value === null) return;
    
    // Check type
    if (rules.type && typeof value !== rules.type) {
      errors.push({ field, message: `${field} must be a ${rules.type}` });
    }
    
    // Check string length
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push({ field, message: `${field} must be at least ${rules.minLength} characters` });
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push({ field, message: `${field} must be no more than ${rules.maxLength} characters` });
      }
    }
    
    // Check numeric range
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push({ field, message: `${field} must be at least ${rules.min}` });
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push({ field, message: `${field} must be no more than ${rules.max}` });
      }
    }
    
    // Check email format
    if (rules.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push({ field, message: `${field} must be a valid email address` });
    }
    
    // Custom validation function
    if (rules.validate && typeof rules.validate === 'function') {
      const customValidation = rules.validate(value, data);
      if (customValidation !== true) {
        errors.push({ field, message: customValidation || `${field} is invalid` });
      }
    }
  });
  
  return errors;
};
