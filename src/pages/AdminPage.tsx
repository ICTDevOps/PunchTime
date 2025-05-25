import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Calendar, Clock, Euro, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CourseForm } from '../types';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, loadCourses, createCourse, updateCourse, deleteCourse } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [formData, setFormData] = useState<CourseForm>({
    title: '',
    date: '',
    time: '',
    price: 0,
    maxParticipants: undefined,
    description: ''
  });

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses();
    }
  }, [courses.length, loadCourses]);

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      price: 0,
      maxParticipants: undefined,
      description: ''
    });
    setEditingCourse(null);
    setIsFormOpen(false);
  };

  const handleCreateCourse = () => {
    setIsFormOpen(true);
    resetForm();
  };

  const handleEditCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setFormData({
        title: course.title,
        date: course.date,
        time: course.time,
        price: course.price,
        maxParticipants: course.maxParticipants,
        description: course.description || ''
      });
      setEditingCourse(courseId);
      setIsFormOpen(true);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      deleteCourse(courseId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse) {
      updateCourse(editingCourse, formData);
    } else {
      createCourse(formData);
    }
    
    resetForm();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
                <p className="text-sm text-gray-600">Gestion des cours de boxe</p>
              </div>
            </div>
            
            <button
              onClick={handleCreateCourse}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau cours
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingCourse ? 'Modifier le cours' : 'Nouveau cours'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="label">
                      Titre du cours
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="label">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="label">
                        Heure
                      </label>
                      <input
                        type="time"
                        id="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="label">
                        Prix (€)
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="input-field"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="maxParticipants" className="label">
                        Places max (optionnel)
                      </label>
                      <input
                        type="number"
                        id="maxParticipants"
                        value={formData.maxParticipants || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          maxParticipants: e.target.value ? Number(e.target.value) : undefined 
                        })}
                        className="input-field"
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="label">
                      Description (optionnel)
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-field"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary flex-1"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    {editingCourse ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Courses List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cours existants ({courses.length})
          </h2>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Aucun cours créé
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre premier cours de boxe
              </p>
              <button
                onClick={handleCreateCourse}
                className="btn-primary"
              >
                Créer un cours
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {course.description && (
                    <p className="text-gray-600 mb-4">{course.description}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-boxing-red" />
                      <span className="text-sm">{formatDate(course.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-boxing-red" />
                      <span className="text-sm">{course.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Euro className="w-4 h-4 mr-2 text-boxing-red" />
                      <span className="text-sm">{course.price}€</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-boxing-red" />
                      <span className="text-sm">
                        {course.participants.length}
                        {course.maxParticipants && ` / ${course.maxParticipants}`}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">Coût par personne</div>
                        <div className="text-lg font-bold text-boxing-red">
                          {course.costPerPerson.toFixed(2)}€
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Participants</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {course.participants.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  {course.participants.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">Participants inscrits:</div>
                      <div className="flex flex-wrap gap-1">
                        {course.participants.map((participant) => (
                          <span
                            key={participant.id}
                            className="inline-block bg-boxing-red text-white text-xs px-2 py-1 rounded-full"
                          >
                            {participant.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
