import { useState } from 'react';
import { useGoogleDrive } from '../../hooks/useGoogleDrive';

interface GoogleDriveRomPickerProps {
    onRomSelect: (fileName: string, romData: Uint8Array) => void;
    disabled: boolean;
}

export const GoogleDriveRomPicker = ({ onRomSelect, disabled }: GoogleDriveRomPickerProps) => {
    const { isSignedIn, isLoading, signIn, signOut, listRomFiles, downloadFile } = useGoogleDrive();
    const [files, setFiles] = useState<any[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);

   

    const handleShowFiles = async () => {
        setError(null);
        try {
            const romFiles = await listRomFiles();
            setFiles(romFiles);
            setShowPicker(true);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar archivos';
            setError(errorMsg);
            
        }
    };

    const handleSelectFile = async (file: any) => {
        setDownloading(true);
        try {
            const romData = await downloadFile(file.id);
            onRomSelect(file.name, romData);
            setShowPicker(false);
        } catch (error) {
            console.error('Download error:', error);
            alert('Error al descargar el ROM: ' + error);
        } finally {
            setDownloading(false);
        }
    };

    if (!isSignedIn) {
        return (
            <div className="flex flex-col gap-2">
                <button
                    onClick={signIn}
                    disabled={disabled}
                    className="bg-linear-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-all border border-blue-400 w-full"
                >
                    📁 Conectar con Google Drive
                </button>
                {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
            <div className="flex gap-2">
                <button
                    onClick={handleShowFiles}
                    disabled={disabled || isLoading}
                    className="flex-1 bg-linear-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-all border border-blue-400"
                >
                    {isLoading ? 'Cargando...' : '📁 Buscar en Drive'}
                </button>
                <button
                    onClick={signOut}
                    className="bg-linear-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded-lg transition-all border border-gray-500"
                    title="Desconectar Google Drive"
                >
                    🔓
                </button>
            </div>

            {showPicker && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto border-2 border-blue-500 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-white border-b border-blue-500 pb-2">📁 Selecciona un ROM</h3>
                        {files.length === 0 ? (
                            <p className="text-gray-300">No se encontraron archivos .gba en tu Drive</p>
                        ) : (
                            <ul className="space-y-2">
                                {files.map(file => (
                                    <li key={file.id}>
                                        <button
                                            onClick={() => handleSelectFile(file)}
                                            disabled={downloading}
                                            className="w-full text-left p-3 bg-gray-800 hover:bg-linear-to-r hover:from-blue-800 hover:to-blue-900 rounded-lg border border-blue-600 hover:border-blue-400 text-white transition-all"
                                        >
                                            <div className="font-medium">{file.name}</div>
                                            {file.size && (
                                                <div className="text-sm text-blue-300">
                                                    {(parseInt(file.size) / 1024 / 1024).toFixed(2)} MB
                                                </div>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={() => setShowPicker(false)}
                            disabled={downloading}
                            className="mt-4 w-full bg-linear-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all"
                        >
                            {downloading ? 'Descargando...' : 'Cerrar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};