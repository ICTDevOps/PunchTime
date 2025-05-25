import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Plus } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { RegistrationModal } from '../components/RegistrationModal';
import { useStore } from '../store/useStore';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, isLoading, loadCourses, registerForCourse } = useStore();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleRegister = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationSubmit = (name: string) => {
    if (selectedCourseId) {
      registerForCourse(selectedCourseId, name);
    }
    setIsRegistrationModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleViewDetails = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const selectedCourse = selectedCourseId 
    ? courses.find(course => course.id === selectedCourseId)
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-boxing-red mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Dumbbell className="w-8 h-8 text-boxing-red mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PunchTime</h1>
                <p className="text-sm text-gray-600">Réservation de cours de boxe</p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/admin')}
              className="btn-secondary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Cours de boxe disponibles
          </h2>
          <p className="text-gray-600">
            Inscrivez-vous aux cours et partagez les coûts avec les autres participants
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Aucun cours disponible
            </h3>
            <p className="text-gray-600 mb-6">
              Les cours seront bientôt disponibles. Revenez plus tard !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onRegister={handleRegister}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          setIsRegistrationModalOpen(false);
          setSelectedCourseId(null);
        }}
        onSubmit={handleRegistrationSubmit}
        courseTitle={selectedCourse?.title || ''}
      />
    </div>
  );
};
