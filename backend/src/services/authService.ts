//services/authService.ts
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export class AuthService {
    static async register(email: string, password: string) {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });

        return { user, token };
    }

    static async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Mot de passe incorrect');
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });

        return { user, token };
    }

    static verifyToken(token: string) {
        return jwt.verify(token, config.jwtSecret);
    }
}