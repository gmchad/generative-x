import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (isoString: string) => {
  // Placeholder for date formatting function
  return new Date(isoString).toLocaleDateString("en-US", {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};