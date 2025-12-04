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
import { useOrientation } from '../hooks/useOrientation';
import { OpacityControl } from './opacity-control/OpacityControl';

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
    const [controlsOpacity, setControlsOpacity] = useState(0.7);
    const { emulator, isLoading, error } = useEmulator(canvas);
    const isMobile = useIsMobile();
    const isLandscape = useOrientation();
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

    const [showLandscapeMenu, setShowLandscapeMenu] = useState(false);

    // Modo horizontal para móviles
    if (isMobile && isLandscape) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black">
                {error && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm z-50">
                        {error}
                    </div>
                )}

                {isLoading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-white z-50">
                        Cargando emulador...
                    </div>
                )}

                {/* Canvas pantalla completa en altura */}
                <div className="h-full flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        width={240}
                        height={160}
                        style={{
                            imageRendering: 'pixelated',
                            height: '100vh',
                            width: 'auto',
                            display: 'block'
                        }}
                    />
                </div>

                {/* Controles superpuestos con transparencia */}
                <MobileButtons
                    onButtonPress={(key) => emulator?.buttonPress(key)}
                    onButtonRelease={(key) => emulator?.buttonUnpress(key)}
                    disabled={!emulator}
                    isLandscape={true}
                    opacity={controlsOpacity}
                />

                {/* Botón de menú flotante */}
                <button
                    onClick={() => setShowLandscapeMenu(!showLandscapeMenu)}
                    className="absolute top-2 right-2 z-50 w-10 h-10 bg-linear-to-br from-gray-400 via-black to-gray-400 rounded-full shadow-lg border-2 border-yellow-700 flex items-center justify-center text-gray-900 font-bold hover:scale-110 transition-transform"
                >
                    ⚙️
                </button>

                {/* Menú desplegable */}
                {showLandscapeMenu && (
                    <>
                        {/* Overlay para cerrar el menú */}
                        <div 
                            className="absolute inset-0 bg-black/50 z-40"
                            onClick={() => setShowLandscapeMenu(false)}
                        />
                        
                        {/* Panel del menú */}
                        <div className="absolute  right-14 z-50 bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 rounded-xl p-4 shadow-2xl border-2 border-blue-500 max-w-xs w-80 text-white">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-white font-bold text-lg mb-2 border-b border-blue-500 pb-2">⚙️ Opciones</h3>
                                
                                <VolumeControl
                                    volume={volume}
                                    onVolumeChange={setVolume}
                                    disabled={!emulator}
                                />
                                
                                <OpacityControl
                                    opacity={controlsOpacity}
                                    onOpacityChange={setControlsOpacity}
                                />
                                
                                <RomUploader
                                    onFileSelect={handleFileUpload}
                                    disabled={!emulator || isLoading}
                                />
                                
                                <GoogleDriveRomPicker
                                    onRomSelect={handleRomLoad}
                                    disabled={!emulator || isLoading}
                                />
                                
                                <button
                                    onClick={() => setShowLandscapeMenu(false)}
                                    className="mt-2 w-full bg-linear-to-b from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Modo vertical normal
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
                    isLandscape={false}
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