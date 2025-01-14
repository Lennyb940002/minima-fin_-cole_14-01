import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Sale } from './types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface SalesTableProps {
    sales: Sale[];
    onDelete: (id: string) => void;
}

export function SalesTable({ sales, onDelete }: SalesTableProps) {
    const [confirmationId, setConfirmationId] = useState<string | null>(null);

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-500/20 text-green-400';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    const handleDelete = (id: string) => {
        setConfirmationId(id);
    };

    const confirmDelete = () => {
        if (confirmationId) {
            onDelete(confirmationId);
            setConfirmationId(null);
        }
    };

    const cancelDelete = () => {
        setConfirmationId(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-zinc-800">
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Produit</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Quantité</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Prix Unitaire</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Marge</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">État</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales && sales.map((sale) => (
                        <tr key={sale._id} className="border-b border-zinc-800">
                            <td className="px-4 py-3 text-sm">{sale.product}</td>
                            <td className="px-4 py-3 text-sm">{sale.quantity}</td>
                            <td className="px-4 py-3 text-sm">{formatCurrency(sale.salePrice)}</td>
                            <td className="px-4 py-3 text-sm">{formatCurrency(sale.salePrice * sale.quantity)}</td>
                            <td className="px-4 py-3 text-sm">{formatCurrency(sale.margin)}</td>
                            <td className="px-4 py-3 text-sm">{formatDate(sale.date)}</td>
                            <td className="px-4 py-3 text-sm">
                                <span className={`px-3 py-1 rounded-full ${getStatusStyle(sale.paymentStatus)}`}>
                                    {sale.paymentStatus}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <button
                                    className="p-1 hover:bg-zinc-800 rounded"
                                    onClick={() => handleDelete(sale._id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {confirmationId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-black border border-white/20 p-6 rounded-xl shadow-lg">
                        <p className="text-sm text-zinc-200 mb-4">Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                        <div className="flex justify-end space-x-4 flex justify-center items-center mt-12">
                            <button
                                className="px-4 py-2 bg-red-800 text-white rounded-xl hover:bg-red-600 border border-red-500"
                                onClick={confirmDelete}
                            >
                                Supprimer
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
                                onClick={cancelDelete}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
