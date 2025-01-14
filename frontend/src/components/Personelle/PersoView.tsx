import React, { useState } from 'react';
import PlanningSection from './PlanningSection';
import GoalsSection from './GoalsSection';
import HabitsSection from './HabitsSection';
import KnowledgeBaseSection from './KnowledgeBaseSection';

type Activity = {
    id: string;
    title: string;
    start: string;
    end: string;
    category: string;
};

type Goal = {
    id: string;
    title: string;
    category: string;
    deadline: string;
    progress: number;
    subgoals: { id: string; title: string; completed: boolean; }[];
};

type Habit = {
    id: string;
    title: string;
    frequency: 'daily' | 'weekly';
    streak: number;
    completedDates: string[];
};

type KnowledgeItem = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    category: string;
    createdAt: string;
};

const PersoView: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([
        { id: '1', title: 'Réunion équipe', start: '09:00', end: '10:00', category: 'work' },
        { id: '2', title: 'Sport', start: '12:00', end: '13:00', category: 'health' },
        { id: '3', title: 'Projet personnel', start: '14:00', end: '16:00', category: 'personal' },
    ]);

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: '1',
            title: 'Apprendre React Native',
            category: 'professional',
            deadline: '2024-06-30',
            progress: 60,
            subgoals: [
                { id: 's1', title: 'Bases de React Native', completed: true },
                { id: 's2', title: 'Créer une première application', completed: true },
                { id: 's3', title: 'Publication sur les stores', completed: false },
            ],
        },
    ]);

    const [habits, setHabits] = useState<Habit[]>([
        { id: '1', title: 'Méditation', frequency: 'daily', streak: 5, completedDates: [] },
        { id: '2', title: 'Sport', frequency: 'weekly', streak: 3, completedDates: [] },
    ]);

    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([
        {
            id: '1',
            title: 'Architecture React',
            content: 'Notes sur les best practices...',
            tags: ['react', 'architecture'],
            category: 'development',
            createdAt: '2024-03-10',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSubgoalChange = (goalId: string, subgoalId: string, completed: boolean) => {
        setGoals(goals.map(goal => {
            if (goal.id === goalId) {
                return {
                    ...goal,
                    subgoals: goal.subgoals.map(subgoal =>
                        subgoal.id === subgoalId ? { ...subgoal, completed } : subgoal
                    ),
                };
            }
            return goal;
        }));
    };

    const handleHabitCompletion = (habitId: string, completed: boolean) => {
        setHabits(habits.map(habit => {
            if (habit.id === habitId) {
                const today = new Date().toISOString().split('T')[0];
                const completedDates = completed
                    ? [...habit.completedDates, today]
                    : habit.completedDates.filter(date => date !== today);

                return {
                    ...habit,
                    completedDates,
                    streak: completed ? habit.streak + 1 : Math.max(0, habit.streak - 1),
                };
            }
            return habit;
        }));
    };

    const addActivity = (activity: Activity) => {
        setActivities([...activities, activity]);
    };

    const addGoal = (goal: Goal) => {
        setGoals([...goals, goal]);
    };

    const addHabit = (habit: Habit) => {
        setHabits([...habits, habit]);
    };

    const addKnowledgeItem = (item: KnowledgeItem) => {
        setKnowledgeBase([...knowledgeBase, item]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
                <PlanningSection activities={activities} addActivity={addActivity} />
                <GoalsSection goals={goals} addGoal={addGoal} handleSubgoalChange={handleSubgoalChange} />
                <HabitsSection habits={habits} addHabit={addHabit} handleHabitCompletion={handleHabitCompletion} />
                <KnowledgeBaseSection knowledgeBase={knowledgeBase} searchQuery={searchQuery} setSearchQuery={setSearchQuery} addKnowledgeItem={addKnowledgeItem} />
            </main>
        </div>
    );
};

export default PersoView;