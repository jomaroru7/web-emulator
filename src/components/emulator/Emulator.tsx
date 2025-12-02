import { useEffect, useRef, useState } from 'react';
import { useEmulator } from '../../hooks/useEmulator';
import { VolumeControl } from '../volume-control/VolumeControl';
import { ScaleControl } from '../scale-control/ScaleControl';
import { RomUploader } from '../rom-uploader/RomUploader';
import { ControlsInfo } from '../controls-info/ControlsInfo';

export const Emulator = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [scale, setScale] = useState(3);
    const [volume, setVolume] = useState(0.5);
    const { emulator, isLoading, error } = useEmulator(canvas);

    useEffect(() => {
        if (canvasRef.current) {
            setCanvas(canvasRef.current);
        }
    }, []);

    useEffect(() => {
        if (emulator) {
            emulator.setVolume(volume);
        }
    }, [emulator, volume]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !emulator) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            emulator.FS.writeFile(file.name, uint8Array);
            emulator.loadGame(file.name);
        } catch (err) {
            console.error('Failed to load ROM:', err);
            alert('Error al cargar el ROM: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-3xl font-bold">GBA Emulator</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            {isLoading && (
                <div className="text-lg">Cargando emulador...</div>
            )}

            <div className="border-4 border-gray-800 rounded-lg overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={240}
                    height={160}
                    style={{
                        imageRendering: 'pixelated',
                        width: `${240 * scale}px`,
                        height: `${160 * scale}px`
                    }}
                />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-md">
                <ScaleControl scale={scale} onScaleChange={setScale} />
                <VolumeControl 
                    volume={volume} 
                    onVolumeChange={setVolume} 
                    disabled={!emulator} 
                />
            </div>

            <RomUploader 
                onFileSelect={handleFileUpload} 
                disabled={!emulator || isLoading} 
            />

            <ControlsInfo />
        </div>
    );
};