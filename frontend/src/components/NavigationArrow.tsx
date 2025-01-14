import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowProps {
    direction: 'left' | 'right';
}

const NavigationArrow: React.FC<NavigationArrowProps> = ({ direction }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Définir les liens de navigation en fonction de la page actuelle
    const getLink = () => {
        switch (location.pathname) {
            case '/components/sales/SalesView':
                return direction === 'left' ? '/components/marketing/MarketingView' : '/components/stock/StockView';
            case '/components/stock/StockView':
                return direction === 'left' ? '/components/sales/SalesView' : '/components/accounting/AccountingView';
            case '/components/accounting/AccountingView':
                return direction === 'left' ? '/components/stock/StockView' : '/components/declaration/DeclarationView';
            case '/components/declaration/DeclarationView':
                return direction === 'left' ? '/components/stock/StockView' : '/components/product/ProductView';
            case '/components/product/ProductView':
                return direction === 'left' ? '/components/declaration/DeclarationView' : '/components/marketing/MarketingView';
            case '/components/marketing/MarketingView':
                return direction === 'left' ? '/components/product/ProductView' : '/components/sales/SalesView';
            default:
                return '/';
        }
    };

    const handleClick = () => {
        navigate(getLink());
    };

    return (
        <div
            className={`fixed top-1/2 transform -translate-y-1/2 ${direction === 'left' ? 'left-0' : 'right-0'
                } cursor-pointer z-50`}
            onClick={handleClick}
        >
            {direction === 'left' ? (
                <ChevronLeft className="w-12 h-12 text-gray-200 hover:text-gray-900 transition-colors ml-24" />
            ) : (
                <ChevronRight className="w-12 h-12 text-gray-200 hover:text-gray-900 transition-colors mr-24" />
            )}
        </div>
    );
};

export default NavigationArrow;