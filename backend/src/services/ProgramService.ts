// services/programService.ts
import { Program, IProgram } from '../models/Program';

export class ProgramService {
    static async getAll(userId: string) {
        return await Program.find({ userId }).sort({ createdAt: -1 });
    }

    static async create(programData: any, userId: string) {
        try {
            const program = new Program({
                userId,
                days: programData
            });
            return await program.save();
        } catch (error) {
            throw error;
        }
    }

    static async update(id: string, programData: any, userId: string) {
        try {
            return await Program.findOneAndUpdate(
                { _id: id, userId },
                { days: programData },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: string, userId: string) {
        return await Program.findOneAndDelete({ _id: id, userId });
    }
}