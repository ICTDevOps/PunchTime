import { create } from 'zustand';
import { CourseWithParticipants, Participant, CourseForm } from '../types';
import { getCoursesWithParticipants, getCourseById } from '../data/mockData';

interface AppState {
  courses: CourseWithParticipants[];
  selectedCourse: CourseWithParticipants | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadCourses: () => void;
  selectCourse: (courseId: string) => void;
  registerForCourse: (courseId: string, participantName: string) => void;
  unregisterFromCourse: (courseId: string, participantId: string) => void;
  createCourse: (courseData: CourseForm) => void;
  updateCourse: (courseId: string, courseData: CourseForm) => void;
  deleteCourse: (courseId: string) => void;
  clearError: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,

  loadCourses: () => {
    set({ isLoading: true });
    // Simulate API call delay
    setTimeout(() => {
      const courses = getCoursesWithParticipants();
      set({ courses, isLoading: false });
    }, 500);
  },

  selectCourse: (courseId: string) => {
    const course = getCourseById(courseId);
    set({ selectedCourse: course || null });
  },

  registerForCourse: (courseId: string, participantName: string) => {
    const { courses } = get();
    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: participantName,
      courseId,
      registeredAt: new Date().toISOString()
    };

    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedParticipants = [...course.participants, newParticipant];
        const participantCount = updatedParticipants.length;
        const costPerPerson = course.price / participantCount;
        const availableSpots = course.maxParticipants ? course.maxParticipants - participantCount : Infinity;

        return {
          ...course,
          participants: updatedParticipants,
          costPerPerson: Math.round(costPerPerson * 100) / 100,
          availableSpots: Math.max(0, availableSpots)
        };
      }
      return course;
    });

    set({ courses: updatedCourses });
    
    // Update selected course if it's the one being modified
    const { selectedCourse } = get();
    if (selectedCourse && selectedCourse.id === courseId) {
      const updatedSelectedCourse = updatedCourses.find(c => c.id === courseId);
      set({ selectedCourse: updatedSelectedCourse || null });
    }
  },

  unregisterFromCourse: (courseId: string, participantId: string) => {
    const { courses } = get();
    
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedParticipants = course.participants.filter(p => p.id !== participantId);
        const participantCount = updatedParticipants.length;
        const costPerPerson = participantCount > 0 ? course.price / participantCount : course.price;
        const availableSpots = course.maxParticipants ? course.maxParticipants - participantCount : Infinity;

        return {
          ...course,
          participants: updatedParticipants,
          costPerPerson: Math.round(costPerPerson * 100) / 100,
          availableSpots: Math.max(0, availableSpots)
        };
      }
      return course;
    });

    set({ courses: updatedCourses });
    
    // Update selected course if it's the one being modified
    const { selectedCourse } = get();
    if (selectedCourse && selectedCourse.id === courseId) {
      const updatedSelectedCourse = updatedCourses.find(c => c.id === courseId);
      set({ selectedCourse: updatedSelectedCourse || null });
    }
  },

  createCourse: (courseData: CourseForm) => {
    const { courses } = get();
    const newCourse: CourseWithParticipants = {
      id: Date.now().toString(),
      ...courseData,
      createdAt: new Date().toISOString(),
      participants: [],
      costPerPerson: courseData.price,
      availableSpots: courseData.maxParticipants || Infinity
    };

    set({ courses: [...courses, newCourse] });
  },

  updateCourse: (courseId: string, courseData: CourseForm) => {
    const { courses } = get();
    
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const participantCount = course.participants.length;
        const costPerPerson = participantCount > 0 ? courseData.price / participantCount : courseData.price;
        const availableSpots = courseData.maxParticipants ? courseData.maxParticipants - participantCount : Infinity;

        return {
          ...course,
          ...courseData,
          costPerPerson: Math.round(costPerPerson * 100) / 100,
          availableSpots: Math.max(0, availableSpots)
        };
      }
      return course;
    });

    set({ courses: updatedCourses });
  },

  deleteCourse: (courseId: string) => {
    const { courses } = get();
    const updatedCourses = courses.filter(course => course.id !== courseId);
    set({ courses: updatedCourses });
  },

  clearError: () => {
    set({ error: null });
  }
}));
