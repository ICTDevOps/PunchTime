import { Course, Participant, CourseWithParticipants } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Boxe Débutant',
    date: '2025-05-26',
    time: '18:00',
    price: 60,
    maxParticipants: 8,
    description: 'Cours de boxe pour débutants - Apprentissage des bases',
    createdAt: '2025-05-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Boxe Intermédiaire',
    date: '2025-05-27',
    time: '19:30',
    price: 75,
    maxParticipants: 6,
    description: 'Cours de boxe niveau intermédiaire - Perfectionnement technique',
    createdAt: '2025-05-20T11:00:00Z'
  },
  {
    id: '3',
    title: 'Sparring Session',
    date: '2025-05-28',
    time: '20:00',
    price: 90,
    maxParticipants: 4,
    description: 'Session de sparring pour boxeurs expérimentés',
    createdAt: '2025-05-20T12:00:00Z'
  },
  {
    id: '4',
    title: 'Boxe Fitness',
    date: '2025-05-29',
    time: '17:00',
    price: 45,
    maxParticipants: 12,
    description: 'Cours de fitness avec techniques de boxe',
    createdAt: '2025-05-20T13:00:00Z'
  }
];

export const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    courseId: '1',
    registeredAt: '2025-05-21T14:30:00Z'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    courseId: '1',
    registeredAt: '2025-05-21T15:45:00Z'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    courseId: '1',
    registeredAt: '2025-05-22T09:15:00Z'
  },
  {
    id: '4',
    name: 'Thomas Bernard',
    courseId: '2',
    registeredAt: '2025-05-21T16:20:00Z'
  },
  {
    id: '5',
    name: 'Julie Moreau',
    courseId: '2',
    registeredAt: '2025-05-22T10:30:00Z'
  },
  {
    id: '6',
    name: 'Alex Rodriguez',
    courseId: '3',
    registeredAt: '2025-05-22T11:45:00Z'
  },
  {
    id: '7',
    name: 'Emma Wilson',
    courseId: '4',
    registeredAt: '2025-05-21T17:00:00Z'
  },
  {
    id: '8',
    name: 'Lucas Petit',
    courseId: '4',
    registeredAt: '2025-05-22T08:30:00Z'
  },
  {
    id: '9',
    name: 'Camille Durand',
    courseId: '4',
    registeredAt: '2025-05-22T12:15:00Z'
  }
];

export const getCoursesWithParticipants = (): CourseWithParticipants[] => {
  return mockCourses.map(course => {
    const participants = mockParticipants.filter(p => p.courseId === course.id);
    const participantCount = participants.length;
    const costPerPerson = participantCount > 0 ? course.price / participantCount : course.price;
    const availableSpots = course.maxParticipants ? course.maxParticipants - participantCount : Infinity;

    return {
      ...course,
      participants,
      costPerPerson: Math.round(costPerPerson * 100) / 100, // Round to 2 decimal places
      availableSpots: Math.max(0, availableSpots)
    };
  });
};

export const getCourseById = (id: string): CourseWithParticipants | undefined => {
  return getCoursesWithParticipants().find(course => course.id === id);
};
