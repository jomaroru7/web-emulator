import { useState } from 'react';
import { VolumeControl } from '../volume-control/VolumeControl';
import { ScaleControl } from '../scale-control/ScaleControl';
import { RomUploader } from '../rom-uploader/RomUploader';
import { GoogleDriveRomPicker } from '../google-drive-rom-picker/GoogleDriveRomPicker';

interface HeaderProps {
    scale: number;
    onScaleChange: (scale: number) => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
    onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRomLoad: (fileName: string, romData: Uint8Array) => Promise<void>;
    emulatorReady: boolean;
    isLoading: boolean;
}

export const Header = ({
    scale,
    onScaleChange,
    volume,
    onVolumeChange,
    onFileSelect,
    onRomLoad,
    emulatorReady,
    isLoading
}: HeaderProps) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="bg-linear-to-r from-gray-900 via-blue-900 to-gray-900 border-b-2 border-blue-500 shadow-lg text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-white font-bold text-xl">GBA Emulator</h1>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="px-4 py-2 bg-linear-to-br from-gray-400 via-black to-gray-400 text-white rounded-lg font-bold hover:scale-105 transition-transform border border-yellow-700 flex items-center gap-2"
                >
                    <span>⚙️</span>
                    <span>Ajustes</span>
                </button>
            </div>
            
            {/* Dropdown menu */}
            {showMenu && (
                <div className="bg-gray-800 border-t border-blue-500">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex flex-row flex-wrap gap-4 w-full items-baseline justify-center">
                            <div className="col-span-2">
                                <ScaleControl scale={scale} onScaleChange={onScaleChange} />
                            </div>
                            <div className="col-span-2">
                                <VolumeControl
                                    volume={volume}
                                    onVolumeChange={onVolumeChange}
                                    disabled={!emulatorReady}
                                />
                            </div>
                            <RomUploader
                                onFileSelect={onFileSelect}
                                disabled={!emulatorReady || isLoading}
                            />
                            <GoogleDriveRomPicker
                                onRomSelect={onRomLoad}
                                disabled={!emulatorReady || isLoading}
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
