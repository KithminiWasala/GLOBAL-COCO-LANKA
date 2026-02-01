import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This function helps us combine CSS classes easily
// It handles conditional classes and Tailwind conflicts
export function cn(...inputs: ClassValue[]) {
  // 1. Combine all logic-based classes (like "is-active")
  const combinedClasses = clsx(inputs);

  // 2. Merge them intelligently to avoid conflicts
  // (Example: if you have 'bg-red-500' and 'bg-blue-500', this keeps the last one)
  return twMerge(combinedClasses);
}
