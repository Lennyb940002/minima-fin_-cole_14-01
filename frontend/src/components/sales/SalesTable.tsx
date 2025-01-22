import React, { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { Sale } from './types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ProductModal } from './ProductModal';

interface SalesTableProps {
    sales: Sale[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, sale: Partial<Sale>) => void;
}

export function SalesTable({ sales, onDelete, onUpdate }: SalesTableProps) {
    const [confirmationId, setConfirmationId] = useState<string | null>(null);
    const [editSale, setEditSale] = useState<Sale | null>(null);

    const handleEdit = (sale: Sale) => {
        setEditSale(sale);
    };

    const handleUpdateSale = (updatedSale: Omit<Sale, '_id'>) => {
        if (editSale) {
            onUpdate(editSale._id, updatedSale);
            setEditSale(null);
        }
    };

    return (
        <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Produit</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Quantité</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Prix Unitaire</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Total</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Marge</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">État</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                                <td className="px-4 py-3 text-sm text-white">{sale.product}</td>
                                <td className="px-4 py-3 text-sm text-white text-right">{sale.quantity}</td>
                                <td className="px-4 py-3 text-sm text-white text-right">
                                    {formatCurrency(sale.salePrice)}
                                </td>
                                <td className="px-4 py-3 text-sm text-white text-right font-medium">
                                    {formatCurrency(sale.salePrice * sale.quantity)}
                                </td>
                                <td className="px-4 py-3 text-sm text-white text-right">
                                    {formatCurrency(sale.margin)}
                                </td>
                                <td className="px-4 py-3 text-sm text-white">{formatDate(sale.date)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs`}>
                                        {sale.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm flex space-x-2">
                                    <button
                                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-150"
                                        onClick={() => handleEdit(sale)}
                                    >
                                        <Edit2 className="w-4 h-4 text-yellow-500" />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-150"
                                        onClick={() => setConfirmationId(sale._id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {confirmationId && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-sm w-full mx-4 backdrop-blur-xl">
                        <p className="text-base text-zinc-200 mb-8">
                            Êtes-vous sûr de vouloir supprimer cet élément ?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-6 py-2.5 text-sm font-medium bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors duration-150"
                                onClick={() => setConfirmationId(null)}
                            >
                                Annuler
                            </button>
                            <button
                                className="px-6 py-2.5 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-150"
                                onClick={() => {
                                    onDelete(confirmationId);
                                    setConfirmationId(null);
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editSale && (
                <ProductModal
                    isOpen={!!editSale}
                    onClose={() => setEditSale(null)}
                    onSubmit={handleUpdateSale}
                    initialData={editSale}
                />
            )}
        </div>
    );
}