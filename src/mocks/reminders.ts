import { Reminder } from '../types';

export const MOCK_REMINDERS: Reminder[] = [
  {
    id: '1',
    title: 'Vacina de Raiva (Max)',
    date: '2025-10-21T09:00:00.000Z',
    category: 'vacina',
    done: false,
    notes: 'Levar carteira de vacinação'
  },
  {
    id: '2',
    title: 'Passeio no parque',
    date: '2025-10-22T08:30:00.000Z',
    category: 'passeio',
    done: true,
    notes: ''
  },
  {
    id: '3',
    title: 'Banho e tosa',
    date: '2025-10-25T14:30:00.000Z',
    category: 'higiene',
    done: false,
    notes: ''
  }
];
