interface LoadingScreenProps {
    message?: string;
    subMessage?: string;
}

export const LoadingScreen = ({ 
    message = "Cargando...", 
    subMessage = "Por favor espera" 
}: LoadingScreenProps) => {
    return (
        <div className="bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 rounded-xl p-8 border-2 border-blue-500 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-bold text-lg">{message}</p>
            <p className="text-blue-300 text-sm">{subMessage}</p>
        </div>
    );
};
