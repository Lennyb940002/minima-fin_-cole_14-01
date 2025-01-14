import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import AddActivityForm from './AddActivityForm';

type Activity = {
    id: string;
    title: string;
    start: string;
    end: string;
    category: string;
};

interface PlanningSectionProps {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
}

const PlanningSection: React.FC<PlanningSectionProps> = ({ activities, addActivity }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                    Planning Hebdomadaire
                </h2>
                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setIsFormOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-8 gap-px bg-gray-200">
                    <div className="bg-gray-50 p-3"></div>
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                        <div key={day} className="bg-gray-50 p-3 text-center font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                    <div key={hour} className="grid grid-cols-8 gap-px bg-gray-200">
                        <div className="bg-white p-3 text-sm text-gray-500">
                            {`${hour}:00`}
                        </div>
                        {Array.from({ length: 7 }, (_, i) => (
                            <div key={i} className="bg-white p-3 min-h-[4rem] relative">
                                {activities.some(activity =>
                                    parseInt(activity.start) === hour
                                ) && (
                                        <div className="absolute inset-x-1 top-1 p-2 rounded bg-indigo-100 text-sm text-indigo-700">
                                            {activities.find(activity =>
                                                parseInt(activity.start) === hour
                                            )?.title}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {isFormOpen && <AddActivityForm onClose={() => setIsFormOpen(false)} onSave={addActivity} />}
        </section>
    );
};

export default PlanningSection;