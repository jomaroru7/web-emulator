import { useEffect, useRef, useState } from 'react';
import { useEmulator } from '../hooks/useEmulator';
import { VolumeControl } from './volume-control/VolumeControl';
import { ScaleControl } from './scale-control/ScaleControl';
import { RomUploader } from './rom-uploader/RomUploader';
import { ControlsInfo } from './controls-info/ControlsInfo';
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileButtons } from './mobile-buttons/MobileButtons';
import { GoogleDriveRomPicker } from './google-drive-rom-picker/GoogleDriveRomPicker';
import { MobileMenu } from './mobile-menu/MobileMenu';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

export const Emulator = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [scale, setScale] = useState(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 769) {
            return 2; // Valor por defecto para móvil
        }
        return 3; // Valor por defecto para desktop
    });
    const [volume, setVolume] = useState(0.5);
    const { emulator, isLoading, error } = useEmulator(canvas);
    const isMobile = useIsMobile();
    const [activeControlPack, setActiveControlPack] = useState<1 | 2>(1);

    useEffect(() => {
        if (canvasRef.current) {
            setCanvas(canvasRef.current);
        }
    }, []);

    useEffect(() => {
        if (emulator && isFinite(volume) && volume >= 0 && volume <= 1) {
            emulator.setVolume(volume);
        }
    }, [emulator, volume]);

    useEffect(() => {
        if (isMobile) {
            const maxWidth = window.innerWidth - 32;
            const calculatedScale = maxWidth / 240;

            // Validación estricta
            if (isFinite(calculatedScale) && calculatedScale > 0 && calculatedScale <= 5) {
                setScale(calculatedScale);
            } else {
                setScale(2); // Valor por defecto seguro para móvil
            }
        } else {
            setScale(3);
        }
    }, [isMobile]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await handleRomLoad(file.name, uint8Array);
    };

    const handleRomLoad = async (fileName: string, romData: Uint8Array) => {
        if (!emulator) return;

        try {
            emulator.FS.writeFile(fileName, romData);
            emulator.loadGame(fileName);
        } catch (err) {
            console.error('Failed to load ROM:', err);
            alert('Error al cargar el ROM: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    useKeyboardControls(emulator, activeControlPack);

    return (
        <div className={`flex flex-col items-center gap-4 ${isMobile ? 'p-2' : 'p-8'}`}>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {isLoading && (
                <div className="text-lg">Cargando emulador...</div>
            )}

            <div className={`border-4 border-gray-800 rounded-lg overflow-hidden ${isMobile ? 'w-full' : ''}`}>
                <canvas
                    ref={canvasRef}
                    width={240}
                    height={160}
                    style={{
                        imageRendering: 'pixelated',
                        width: isMobile ? '100%' : `${isFinite(scale) ? 240 * scale : 720}px`,
                        height: 'auto',
                        display: 'block'
                    }}
                />
            </div>
            {isMobile ? (
                <MobileMenu>
                    <VolumeControl
                        volume={volume}
                        onVolumeChange={setVolume}
                        disabled={!emulator}
                    />
                    <RomUploader
                        onFileSelect={handleFileUpload}
                        disabled={!emulator || isLoading}
                    />
                    <GoogleDriveRomPicker
                        onRomSelect={handleRomLoad}
                        disabled={!emulator || isLoading}
                    />
                </MobileMenu>
            ) : (
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <div className="flex flex-col gap-4 w-full max-w-md">
                        <ScaleControl scale={scale} onScaleChange={setScale} />
                        <VolumeControl
                            volume={volume}
                            onVolumeChange={setVolume}
                            disabled={!emulator}
                        />
                    </div>
                    <div className="flex flex-row gap-4 w-full max-w-md">
                        <RomUploader
                            onFileSelect={handleFileUpload}
                            disabled={!emulator || isLoading}
                        />
                        <GoogleDriveRomPicker
                            onRomSelect={handleRomLoad}
                            disabled={!emulator || isLoading}
                        />
                    </div>
                </div>
            )}

            {isMobile ? (
                <MobileButtons
                    onButtonPress={(key) => {
                        emulator?.buttonPress(key);
                    }}
                    onButtonRelease={(key) => {
                        emulator?.buttonUnpress(key);
                    }}
                    disabled={!emulator}
                />
            ) : (
                <ControlsInfo 
                    activeControlPack={activeControlPack}
                    onControlPackChange={setActiveControlPack}
                />
            )}
        </div>
    );
};