export const STEPS = [
  'Upload File',
  'Map Columns',
  'Create Template',
  'Configure Email'
] as const;

export type Step = typeof STEPS[number];