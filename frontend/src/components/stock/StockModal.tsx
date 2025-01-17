import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StockItem } from './types';

interface AddStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (stock: Omit<StockItem, 'id' | 'lastUpdated' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const initialFormState = {
    name: '',
    reference: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    price: 0,
    description: '',
    product: '',
    unitPrice: 0,
    salePrice: 0,
    threshold: 0,
    autoGenerateReference: true
};

export function StockModal({ isOpen, onClose, onSubmit }: AddStockModalProps) {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        console.log(`handleChange - ${name}: ${value}`);
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const reference = formData.autoGenerateReference
            ? `REF-${Date.now().toString().slice(-6)}` // Génère une référence unique
            : formData.reference;

        try {
            const stockData = {
                name: formData.name,
                reference: reference,
                category: formData.category,
                quantity: Number(formData.quantity),
                minQuantity: Number(formData.minQuantity),
                price: Number(formData.price),
                description: formData.description,
                product: formData.product,
                unitPrice: Number(formData.unitPrice),
                salePrice: Number(formData.salePrice),
                threshold: Number(formData.threshold),
            };

            console.log('handleSubmit - stockData:', stockData);
            await onSubmit(stockData);
            setFormData(initialFormState);
            setError(null);
            onClose(); // Fermeture de la modal après succès
        } catch (error) {
            console.error('handleSubmit - Error submitting stock:', error);
            setError('Erreur lors de la soumission du stock. Veuillez vérifier vos informations et réessayer.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Ajouter un Produit</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition"
                        aria-label="Fermer"
                    >
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Nom du Produit
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nom du produit"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">
                                Quantité
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">
                                Prix Unitaire
                            </label>
                            <input
                                type="number"
                                name="unitPrice"
                                value={formData.unitPrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">
                                Prix de Vente
                            </label>
                            <input
                                type="number"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">
                                Seuil d'Alerte
                            </label>
                            <input
                                type="number"
                                name="threshold"
                                value={formData.threshold}
                                onChange={handleChange}
                                min="0"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Catégorie
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Catégorie"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Référence du Produit
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                                disabled={formData.autoGenerateReference}
                                className={`w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.autoGenerateReference ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                placeholder="Référence personnalisée"
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="autoGenerateReference"
                                    checked={formData.autoGenerateReference}
                                    onChange={handleChange}
                                    className="form-checkbox text-blue-600 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-white text-sm">Générer automatiquement</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Nom du Produit
                        </label>
                        <input
                            type="text"
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nom du produit"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Ajouter au Stock
                    </button>
                </form>
            </div>
        </div>
    );
}