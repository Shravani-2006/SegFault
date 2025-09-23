// Contains all the mock data for the application.
export const initialTasks = [
  { id: 1, text: 'Check soil moisture in Field A', completed: false },
  { id: 2, text: 'Apply fertilizer to corn crops', completed: true },
  { id: 3, text: 'Inspect irrigation system for leaks', completed: false },
];

export const initialAlerts = [
  { id: 1, text: 'Low soil moisture in Field B', level: 'High' },
  { id: 2, text: 'Pest infestation detected on tomato plants', level: 'Medium' },
];

export const initialCrops = [
  { id: 1, name: 'Corn', plantingDate: '2025-03-15', status: 'Growing' },
  { id: 2, name: 'Soybeans', plantingDate: '2025-04-20', status: 'Flowering' },
  { id: 3, name: 'Wheat', plantingDate: '2025-10-01', status: 'Harvesting' },
];

export const calendarEvents = [
  { date: '2025-09-25', event: 'Harvest Corn', type: 'harvest' },
  { date: '2025-10-01', event: 'Plant Wheat', type: 'planting' },
  { date: '2025-10-10', event: 'Soil testing', type: 'maintenance' },
];
