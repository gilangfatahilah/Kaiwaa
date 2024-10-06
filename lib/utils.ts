import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkNullWords(input: string): string {
  return input.replace(/\bnull\b/g, '').trim().replace(/\s+/g, ' ');
}
