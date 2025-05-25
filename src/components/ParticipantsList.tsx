import React from 'react';
import { Users, Trash2 } from 'lucide-react';
import { Participant } from '../types';

interface ParticipantsListProps {
  participants: Participant[];
  costPerPerson: number;
  onRemoveParticipant?: (participantId: string) => void;
  showRemoveButton?: boolean;
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  costPerPerson,
  onRemoveParticipant,
  showRemoveButton = false
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (participants.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Users className="w-8 h-8 mr-2" />
          <span>Aucun participant inscrit pour le moment</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 mr-2 text-boxing-red" />
        <h3 className="text-lg font-semibold text-gray-900">
          Participants inscrits ({participants.length})
        </h3>
      </div>

      <div className="bg-boxing-red bg-opacity-10 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-boxing-red">
            {costPerPerson.toFixed(2)}€
          </div>
          <div className="text-sm text-gray-600">
            Coût par personne
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-boxing-red text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {participant.name}
                </div>
                <div className="text-sm text-gray-500">
                  Inscrit le {formatDate(participant.registeredAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-right mr-3">
                <div className="font-semibold text-boxing-red">
                  {costPerPerson.toFixed(2)}€
                </div>
                <div className="text-xs text-gray-500">
                  à payer
                </div>
              </div>

              {showRemoveButton && onRemoveParticipant && (
                <button
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Désinscrire ce participant"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total des participants:</span>
          <span className="font-medium">{participants.length}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
          <span>Coût total du cours:</span>
          <span className="font-medium">{(costPerPerson * participants.length).toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};
