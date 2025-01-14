import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
    product: Product;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    // Utiliser _id si id n'est pas défini
    const productId = product.id ? product.id.toString() : product._id?.toString();

    if (!productId) {
        console.error("Product ID is undefined", product);
        return null;
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{product.name}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(productId)}
                        className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(productId)}
                        className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p className="text-white/60 text-sm mb-0">{product.description}</p>
            <a href={product.link} className="text-blue-400 text-sm mb-0" target="_blank" rel="noopener noreferrer">
                Lien🔗
            </a>
            <div className="flex justify-between items-center mt-3">
                <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'validated'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {product.status === 'validated' ? 'Validated' : 'In Progress'}
                </span>
                <span className="text-white/60 text-sm">{product.category}</span>
            </div>
        </div>
    );
};