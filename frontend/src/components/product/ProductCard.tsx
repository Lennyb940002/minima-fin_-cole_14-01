import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Product } from './types';

// Ajouter la fonction getLogoUrl en haut du fichier
const getLogoUrl = (category: string): string => {
    switch (category) {
        case 'tech': return 'https://img.icons8.com/?size=100&id=1581&format=png&color=000000';
        case 'fashion': return 'https://img.icons8.com/?size=100&id=24272&format=png&color=000000';
        case 'home': return 'https://img.icons8.com/?size=100&id=bzlpaAK9FMS2&format=png&color=000000';
        case 'beauty': return 'https://img.icons8.com/?size=100&id=8242&format=png&color=000000';
        case 'food': return 'https://img.icons8.com/?size=100&id=37380&format=png&color=000000';
        case 'sports': return 'https://img.icons8.com/?size=100&id=oRBt2rHxvhPg&format=png&color=000000';
        case 'entertainment': return 'https://img.icons8.com/?size=100&id=48366&format=png&color=000000';
        case 'baby': return 'https://img.icons8.com/?size=100&id=6632&format=png&color=000000';
        case 'auto': return 'https://img.icons8.com/?size=100&id=Atb5mR0Y5hAu&format=png&color=000000';
        case 'pets': return 'https://img.icons8.com/?size=100&id=LzmGON4NYpW4&format=png&color=000000';
        case 'industry': return 'https://img.icons8.com/?size=100&id=EhK5kQGo9qdp&format=png&color=000000';
        default: return '';
    }
};

interface ProductCardProps {
    product: Product;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const productId = product.id ? product.id.toString() : product._id?.toString();

    if (!productId) {
        console.error("Product ID is undefined", product);
        return null;
    }

    const logoUrl = getLogoUrl(product.category);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'validated':
                return 'bg-green-100 text-green-700';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'validated':
                return 'Validé';
            case 'in-progress':
                return 'En cours';
            case 'rejected':
                return 'Rejeté';
            default:
                return 'Inconnu';
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-center mb-4">
                {logoUrl && (
                    <img src={logoUrl} alt={product.category} className="h-16 mt-8 mb-16" />
                )}
            </div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-black">{product.name}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(productId)}
                        className="p-1.5 text-black hover:text-gray-700 hover:bg-gray-100 rounded"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(productId)}
                        className="p-1.5 text-black hover:text-gray-700 hover:bg-gray-100 rounded"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p className="text-black text-sm mb-0">{product.description}</p>
            <a href={product.link} className="text-blue-500 text-sm mb-0" target="_blank" rel="noopener noreferrer">
                Lien🔗
            </a>
            <div className="flex justify-between items-center mt-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(product.status)}`}>
                    {getStatusText(product.status)}
                </span>
                <span className="text-black text-sm">{product.category}</span>
            </div>
        </div>
    );
};