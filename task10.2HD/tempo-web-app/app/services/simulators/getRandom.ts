/**
 * Get Random
 * @param min 
 * @param max 
 * @returns 
 */
export const getRandom = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min);