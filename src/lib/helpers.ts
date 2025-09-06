import { formatValue } from 'react-currency-input-field';

// Utility function to filter unique values in an array
export function onlyUnique<T>(value: T, index: number, array: T[]): boolean {
  return array.indexOf(value) === index;
}

// Alternative using Set for better performance
export function getUniqueValues<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// Generic array sorting with proper typing
export const sortArray = <T extends { index: number }>(array: T[]): T[] => {
  return [...array].sort((a, b) => a.index - b.index);
};

// Date formatting utility
export const convertToDateTime = (param?: string | null): string => {
  if (!param) return '';
  
  try {
    const date = new Date(param);
    
    // Validate date is valid
    if (isNaN(date.getTime())) return param;
    
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    return formatter.format(date);
  } catch {
    return param;
  }
};

// Alternative using template literals for more control
export const formatDateTime = (dateString?: string | null): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return `${date.getMonth() + 1}`.padStart(2, '0') + '/' +
         `${date.getDate()}`.padStart(2, '0') + '/' +
         `${date.getFullYear()} ` +
         `${date.getHours()}`.padStart(2, '0') + ':' +
         `${date.getMinutes()}`.padStart(2, '0') + ':' +
         `${date.getSeconds()}`.padStart(2, '0');
};

// Array prototype extension with proper typing
declare global {
  interface Array<T> {
    addIndex(): Array<T & { index: number }>;
  }
}

Array.prototype.addIndex = function<T>(this: T[]): Array<T & { index: number }> {
  return this.map((item, index) => ({ ...item, index: index + 1 }));
};

// String utilities
export const persianNumberToEnglishNumber = (text: string): string => {
  if (!text) return text;
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return text.replace(/[۰-۹]/g, (d) => {
    const index = persianNumbers.indexOf(d);
    return index !== -1 ? index.toString() : d;
  });
};

export const truncateText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + ellipsis;
};

export const formatCurrency = (value: string | number): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) return value.toString();
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numericValue);
};

// Alternative using react-currency-input-field if needed
export const currencySeparator = (currency: string): string => {
  try {
    const formattedValue = formatValue({
      value: currency,
      groupSeparator: ',',
      decimalSeparator: '.',
      decimalScale: 2
    });
    return formattedValue;
  } catch {
    return currency;
  }
};

// Export all utilities
export {};
