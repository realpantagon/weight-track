import type { WeightEntry, NewWeightEntry } from './types';

// Mock data for development
const mockWeightEntries: WeightEntry[] = [
  {
    id: '1',
    Date: '2025-08-15T08:00:00Z',
    Weight: 87.5,
    Details: 'Starting my weight tracking journey',
    Exercise: false
  },
  {
    id: '2',
    Date: '2025-08-18T08:15:00Z',
    Weight: 87.2,
    Details: 'First workout of the week',
    Exercise: true
  },
  {
    id: '3',
    Date: '2025-08-20T08:30:00Z',
    Weight: 86.8,
    Details: 'Making good progress',
    Exercise: true
  },
  {
    id: '4',
    Date: '2025-08-22T08:00:00Z',
    Weight: 86.9,
    Details: 'Small fluctuation',
    Exercise: false
  },
  {
    id: '5',
    Date: '2025-08-25T08:20:00Z',
    Weight: 86.4,
    Details: 'Consistent workouts paying off',
    Exercise: true
  },
  {
    id: '6',
    Date: '2025-08-27T08:10:00Z',
    Weight: 86.1,
    Details: 'Feeling stronger',
    Exercise: true
  },
  {
    id: '7',
    Date: '2025-08-29T08:25:00Z',
    Weight: 85.8,
    Details: 'Great week of training',
    Exercise: true
  },
  {
    id: '8',
    Date: '2025-09-01T08:00:00Z',
    Weight: 85.6,
    Details: 'New month, new goals',
    Exercise: true
  },
  {
    id: '9',
    Date: '2025-09-03T08:15:00Z',
    Weight: 85.2,
    Details: 'Feeling good today',
    Exercise: false
  },
  {
    id: '10',
    Date: '2025-09-05T08:30:00Z',
    Weight: 84.9,
    Details: 'After a good night sleep',
    Exercise: true
  },
  {
    id: '11',
    Date: '2025-09-07T08:00:00Z',
    Weight: 85.1,
    Details: 'Weekend indulgence',
    Exercise: false
  },
  {
    id: '12',
    Date: '2025-09-10T08:20:00Z',
    Weight: 84.7,
    Details: 'Back on track',
    Exercise: true
  },
  {
    id: '13',
    Date: '2025-09-12T08:10:00Z',
    Weight: 84.4,
    Details: 'New low!',
    Exercise: true
  },
  {
    id: '14',
    Date: '2025-09-15T08:25:00Z',
    Weight: 84.1,
    Details: 'Consistent progress',
    Exercise: true
  },
  {
    id: '15',
    Date: '2025-09-17T08:15:00Z',
    Weight: 83.8,
    Details: 'Feeling amazing!',
    Exercise: true
  },{
    id: '9',
    Date: '2025-09-03T08:15:00Z',
    Weight: 85.2,
    Details: 'Feeling good today',
    Exercise: false
  },
  {
    id: '10',
    Date: '2025-09-05T08:30:00Z',
    Weight: 84.9,
    Details: 'After a good night sleep',
    Exercise: true
  },
  {
    id: '11',
    Date: '2025-09-07T08:00:00Z',
    Weight: 85.1,
    Details: 'Weekend indulgence',
    Exercise: false
  },
  {
    id: '12',
    Date: '2025-09-10T08:20:00Z',
    Weight: 84.7,
    Details: 'Back on track',
    Exercise: true
  },
  {
    id: '13',
    Date: '2025-09-12T08:10:00Z',
    Weight: 84.4,
    Details: 'New low!',
    Exercise: true
  },
  {
    id: '14',
    Date: '2025-09-15T08:25:00Z',
    Weight: 84.1,
    Details: 'Consistent progress',
    Exercise: true
  },
  {
    id: '15',
    Date: '2025-09-17T08:15:00Z',
    Weight: 83.8,
    Details: 'Feeling amazing!',
    Exercise: true
  },{
    id: '9',
    Date: '2025-09-03T08:15:00Z',
    Weight: 85.2,
    Details: 'Feeling good today',
    Exercise: false
  },
  {
    id: '10',
    Date: '2025-09-05T08:30:00Z',
    Weight: 84.9,
    Details: 'After a good night sleep',
    Exercise: true
  },
  {
    id: '11',
    Date: '2025-09-07T08:00:00Z',
    Weight: 85.1,
    Details: 'Weekend indulgence',
    Exercise: false
  },
  {
    id: '12',
    Date: '2025-09-10T08:20:00Z',
    Weight: 84.7,
    Details: 'Back on track',
    Exercise: true
  },
  {
    id: '13',
    Date: '2025-09-12T08:10:00Z',
    Weight: 84.4,
    Details: 'New low!',
    Exercise: true
  },
  {
    id: '14',
    Date: '2025-09-15T08:25:00Z',
    Weight: 84.1,
    Details: 'Consistent progress',
    Exercise: true
  },
  {
    id: '15',
    Date: '2025-09-17T08:15:00Z',
    Weight: 83.8,
    Details: 'Feeling amazing!',
    Exercise: true
  },{
    id: '9',
    Date: '2025-09-03T08:15:00Z',
    Weight: 85.2,
    Details: 'Feeling good today',
    Exercise: false
  },
  {
    id: '10',
    Date: '2025-09-05T08:30:00Z',
    Weight: 84.9,
    Details: 'After a good night sleep',
    Exercise: true
  },
  {
    id: '11',
    Date: '2025-09-07T08:00:00Z',
    Weight: 85.1,
    Details: 'Weekend indulgence',
    Exercise: false
  },
  {
    id: '12',
    Date: '2025-09-10T08:20:00Z',
    Weight: 84.7,
    Details: 'Back on track',
    Exercise: true
  },
  {
    id: '13',
    Date: '2025-09-12T08:10:00Z',
    Weight: 84.4,
    Details: 'New low!',
    Exercise: true
  },
  {
    id: '14',
    Date: '2025-09-15T08:25:00Z',
    Weight: 84.1,
    Details: 'Consistent progress',
    Exercise: true
  },
  {
    id: '15',
    Date: '2025-09-17T08:15:00Z',
    Weight: 83.8,
    Details: 'Feeling amazing!',
    Exercise: true
  },{
    id: '9',
    Date: '2025-09-03T08:15:00Z',
    Weight: 85.2,
    Details: 'Feeling good today',
    Exercise: false
  },
  {
    id: '10',
    Date: '2025-09-05T08:30:00Z',
    Weight: 84.9,
    Details: 'After a good night sleep',
    Exercise: true
  },
  {
    id: '11',
    Date: '2025-09-07T08:00:00Z',
    Weight: 85.1,
    Details: 'Weekend indulgence',
    Exercise: false
  },
  {
    id: '12',
    Date: '2025-09-10T08:20:00Z',
    Weight: 84.7,
    Details: 'Back on track',
    Exercise: true
  },
  {
    id: '13',
    Date: '2025-09-12T08:10:00Z',
    Weight: 84.4,
    Details: 'New low!',
    Exercise: true
  },
  {
    id: '14',
    Date: '2025-09-15T08:25:00Z',
    Weight: 84.1,
    Details: 'Consistent progress',
    Exercise: true
  },
  {
    id: '15',
    Date: '2025-09-17T08:15:00Z',
    Weight: 83.8,
    Details: 'Feeling amazing!',
    Exercise: true
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID for new entries
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

/**
 * Fetches all weight entries (mock implementation)
 */
export const fetchWeights = async (): Promise<WeightEntry[]> => {
  await delay(300); // Simulate network delay
  
  // Return a copy of the mock data sorted by date
  return [...mockWeightEntries].sort((a, b) => 
    new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );
};

/**
 * Adds a new weight entry (mock implementation)
 */
export const addWeightEntry = async (entry: NewWeightEntry): Promise<WeightEntry> => {
  await delay(500); // Simulate network delay
  
  const newEntry: WeightEntry = {
    id: generateId(),
    Date: entry.date,
    Weight: entry.weight,
    Details: entry.note || undefined,
    Exercise: entry.exercise || false
  };
  
  // In a real app, this would be persisted to a backend
  mockWeightEntries.push(newEntry);
  
  return newEntry;
};

/**
 * Deletes a weight entry (mock implementation)
 */
export const deleteWeightEntry = async (id: string): Promise<void> => {
  await delay(200); // Simulate network delay
  
  const index = mockWeightEntries.findIndex(entry => entry.id === id);
  if (index > -1) {
    mockWeightEntries.splice(index, 1);
  }
};

/**
 * Updates a weight entry (mock implementation)
 */
export const updateWeightEntry = async (id: string, updates: Partial<NewWeightEntry>): Promise<WeightEntry> => {
  await delay(400); // Simulate network delay
  
  const entryIndex = mockWeightEntries.findIndex(entry => entry.id === id);
  if (entryIndex === -1) {
    throw new Error('Weight entry not found');
  }
  
  const existingEntry = mockWeightEntries[entryIndex];
  const updatedEntry: WeightEntry = {
    ...existingEntry,
    ...(updates.date && { Date: updates.date }),
    ...(updates.weight && { Weight: updates.weight }),
    ...(updates.note !== undefined && { Details: updates.note || undefined }),
    ...(updates.exercise !== undefined && { Exercise: updates.exercise })
  };
  
  mockWeightEntries[entryIndex] = updatedEntry;
  return updatedEntry;
};
