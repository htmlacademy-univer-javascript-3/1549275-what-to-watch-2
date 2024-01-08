export const TabTypes = {
  Overview : 'Overview',
  Details : 'Details',
  Reviews : 'Reviews',
} as const;

export type TTabs = keyof typeof TabTypes;
