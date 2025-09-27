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
  {
    id: 1,
    name: 'Paddy',
    plantingDate: '2025-06-05',
    status: 'Harvesting',
    // Correct path: only one level up
    imageUrl: require('../assets/CropImages/Paddy.png')
  },
  {
    id: 2,
    name: 'Rubber',
    plantingDate: '2018-06-20',
    status: 'Tapping',
    imageUrl: require('../assets/CropImages/Rubber.png')
  },
  {
    id: 3,
    name: 'Coconut',
    plantingDate: '2020-05-15',
    status: 'Flowering',
    imageUrl: require('../assets/CropImages/Coconut.png')
  },
];

export const calendarEvents = [
  { date: '2025-09-28', event: 'Complete Paddy Harvest (Virippu season)', type: 'harvest' },
  { date: '2025-10-15', event: 'Apply fertilizer for Coconut palms', type: 'maintenance' },
  { date: '2025-10-25', event: 'Prepare fields for second Paddy crop (Mundakan season)', type: 'preparation' },
  { date: '2025-11-05', event: 'Begin planting Mundakan Paddy', type: 'planting' },
  { date: '2025-11-20', event: 'Check for pests in Rubber plantation', type: 'maintenance' },
];

