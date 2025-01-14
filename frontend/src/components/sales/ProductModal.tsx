import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Sale } from './types';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (sale: Omit<Sale, '_id'>) => void;
}

const initialFormState = {
    product: '',
    quantity: '',
    salePrice: '',
    unitCost: '',
    client: '',
    paymentMethod: 'cash' as const,
    paymentStatus: 'pending' as const,
    notes: ''
};

export function ProductModal({ isOpen, onClose, onSubmit }: ProductModalProps) {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'quantity' || name === 'salePrice' || name === 'unitCost') {
            if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const quantity = Number(formData.quantity);
            const salePrice = Number(formData.salePrice);
            const unitCost = Number(formData.unitCost);

            if (!quantity || !salePrice || !unitCost) {
                setError('Veuillez remplir tous les champs numériques');
                return;
            }

            const margin = (salePrice - unitCost) * quantity;

            const newSale = {
                product: formData.product,
                quantity,
                salePrice,
                unitCost,
                client: formData.client || "Client anonyme",
                paymentMethod: formData.paymentMethod,
                paymentStatus: formData.paymentStatus,
                notes: formData.notes,
                date: new Date().toISOString(),
                margin
            };

            console.log('Submitting sale:', newSale);
            await onSubmit(newSale);
            setFormData(initialFormState);
            onClose();
        } catch (error) {
            console.error('Error submitting sale:', error);
            setError('Erreur lors de la création de la vente');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Nouvelle Vente</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition"
                        aria-label="Fermer"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Produit
                        </label>
                        <input
                            type="text"
                            name="product"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.product}
                            onChange={handleChange}
                            placeholder="Nom du produit"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Quantité
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                required
                                min="1"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Prix de vente
                            </label>
                            <input
                                type="number"
                                name="salePrice"
                                required
                                min="0"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.salePrice}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Coût unitaire
                        </label>
                        <input
                            type="number"
                            name="unitCost"
                            required
                            min="0"
                            step="0.01"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.unitCost}
                            onChange={handleChange}
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Statut du paiement
                        </label>
                        <select
                            name="paymentStatus"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.paymentStatus}
                            onChange={handleChange}
                        >
                            <option className="text-black" value="pending">En attente</option>
                            <option className="text-black" value="completed">Effectué</option>
                            <option className="text-black" value="cancelled">Annulé</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Ajouter la vente
                    </button>
                </form>
            </div>
        </div>
    );
}