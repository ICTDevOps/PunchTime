export interface Course {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  maxParticipants?: number;
  description?: string;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
  courseId: string;
  registeredAt: string;
}

export interface CourseWithParticipants extends Course {
  participants: Participant[];
  costPerPerson: number;
  availableSpots: number;
}

export interface RegistrationForm {
  name: string;
  courseId: string;
}

export interface CourseForm {
  title: string;
  date: string;
  time: string;
  price: number;
  maxParticipants?: number;
  description?: string;
}
