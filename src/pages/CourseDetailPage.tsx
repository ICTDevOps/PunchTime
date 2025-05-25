import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Euro, MapPin } from 'lucide-react';
import { ParticipantsList } from '../components/ParticipantsList';
import { RegistrationModal } from '../components/RegistrationModal';
import { useStore } from '../store/useStore';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, loadCourses, registerForCourse, unregisterFromCourse } = useStore();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses();
    }
  }, [courses.length, loadCourses]);

  const course = courses.find(c => c.id === courseId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRegister = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationSubmit = (name: string) => {
    if (courseId) {
      registerForCourse(courseId, name);
    }
    setIsRegistrationModalOpen(false);
  };

  const handleUnregister = (participantId: string) => {
    if (courseId) {
      unregisterFromCourse(courseId, participantId);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cours non trouvé</h2>
          <p className="text-gray-600 mb-4">Le cours que vous recherchez n'existe pas.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const isFullyBooked = course.maxParticipants && course.participants.length >= course.maxParticipants;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-sm text-gray-600">Détails du cours</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{course.title}</h2>
                <div className="text-right">
                  <div className="text-3xl font-bold text-boxing-red">
                    {course.costPerPerson.toFixed(2)}€
                  </div>
                  <div className="text-sm text-gray-600">par personne</div>
                </div>
              </div>

              {course.description && (
                <p className="text-gray-700 mb-6 text-lg">{course.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-boxing-red" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm">{formatDate(course.date)}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-boxing-red" />
                  <div>
                    <div className="font-medium">Heure</div>
                    <div className="text-sm">{course.time}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Euro className="w-5 h-5 mr-3 text-boxing-red" />
                  <div>
                    <div className="font-medium">Prix total</div>
                    <div className="text-sm">{course.price}€</div>
                  </div>
                </div>

                {course.maxParticipants && (
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-boxing-red" />
                    <div>
                      <div className="font-medium">Places disponibles</div>
                      <div className="text-sm">
                        {course.availableSpots} / {course.maxParticipants}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Comment ça marche ?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Inscrivez-vous avec votre nom ou surnom</li>
                  <li>• Le coût est partagé équitablement entre tous les participants</li>
                  <li>• Plus il y a de participants, moins vous payez !</li>
                  <li>• Vous pouvez voir qui d'autre participe au cours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Registration Button */}
              <div className="card mb-6">
                <button
                  onClick={handleRegister}
                  disabled={!!isFullyBooked}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-lg ${
                    isFullyBooked
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isFullyBooked ? 'Cours complet' : "S'inscrire au cours"}
                </button>

                {course.participants.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-boxing-red">
                        {course.costPerPerson.toFixed(2)}€
                      </div>
                      <div className="text-sm text-gray-600">
                        Coût actuel par personne
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {course.price}€ ÷ {course.participants.length} participant{course.participants.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Participants List */}
              <ParticipantsList
                participants={course.participants}
                costPerPerson={course.costPerPerson}
                onRemoveParticipant={handleUnregister}
                showRemoveButton={true}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={handleRegistrationSubmit}
        courseTitle={course.title}
      />
    </div>
  );
};
