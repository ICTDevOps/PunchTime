import React from 'react';
import { Calendar, Clock, Users, Euro } from 'lucide-react';
import { CourseWithParticipants } from '../types';

interface CourseCardProps {
  course: CourseWithParticipants;
  onRegister: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onRegister, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isFullyBooked = course.maxParticipants && course.participants.length >= course.maxParticipants;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
        <div className="flex items-center text-boxing-red font-bold text-lg">
          <Euro className="w-4 h-4 mr-1" />
          {course.costPerPerson.toFixed(2)}
        </div>
      </div>

      {course.description && (
        <p className="text-gray-600 mb-4">{course.description}</p>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(course.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Clock className="w-4 h-4 mr-2" />
          <span>{course.time}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Users className="w-4 h-4 mr-2" />
          <span>
            {course.participants.length} participant{course.participants.length !== 1 ? 's' : ''}
            {course.maxParticipants && ` / ${course.maxParticipants} max`}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-sm text-gray-600 mb-1">Coût par personne</div>
        <div className="text-2xl font-bold text-boxing-red">
          {course.costPerPerson.toFixed(2)}€
        </div>
        <div className="text-xs text-gray-500">
          Prix total: {course.price}€ ÷ {course.participants.length || 1} participant{course.participants.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(course.id)}
          className="btn-secondary flex-1"
        >
          Voir détails
        </button>
        
        <button
          onClick={() => onRegister(course.id)}
          disabled={!!isFullyBooked}
          className={`flex-1 ${
            isFullyBooked 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'btn-primary'
          }`}
        >
          {isFullyBooked ? 'Complet' : "S'inscrire"}
        </button>
      </div>

      {course.participants.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Participants inscrits:</div>
          <div className="flex flex-wrap gap-1">
            {course.participants.slice(0, 3).map((participant) => (
              <span
                key={participant.id}
                className="inline-block bg-boxing-red text-white text-xs px-2 py-1 rounded-full"
              >
                {participant.name}
              </span>
            ))}
            {course.participants.length > 3 && (
              <span className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{course.participants.length - 3} autres
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
