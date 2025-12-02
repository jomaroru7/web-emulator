import { useState } from 'react';

interface MobileMenuProps {
    children: React.ReactNode;
}

export const MobileMenu = ({ children }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Botón hamburguesa */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded flex items-center justify-between transition-colors"
            >
                <span>Opciones</span>
                <div className={`flex flex-col gap-1 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                    <div className="w-6 h-0.5 bg-white transition-all"></div>
                    <div className="w-6 h-0.5 bg-white transition-all"></div>
                    <div className="w-6 h-0.5 bg-white transition-all"></div>
                </div>
            </button>

            {/* Contenido colapsable con animación */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-gray-100 rounded-lg p-4 space-y-4 border border-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
};