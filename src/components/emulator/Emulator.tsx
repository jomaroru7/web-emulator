import { useEffect, useRef, useState } from 'react';
import { useEmulator } from '../../hooks/useEmulator';

export const Emulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const { emulator, isLoading, error } = useEmulator(canvas);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, []);

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
          className="w-full max-w-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="rom-upload" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center"
        >
          Cargar ROM (.gba)
        </label>
        <input
          id="rom-upload"
          type="file"
          accept=".gba,.zip"
          onChange={handleFileUpload}
          disabled={!emulator || isLoading}
          className="hidden"
        />
        
        
      </div>
      
      <div className="text-sm text-gray-600 mt-4">
        <p>Controles:</p>
        <ul className="list-disc list-inside">
          <li>Flechas: D-Pad</li>
          <li>Z: B</li>
          <li>X: A</li>
          <li>A: L</li>
          <li>S: R</li>
          <li>Enter: Start</li>
          <li>Backspace: Select</li>
        </ul>
      </div>
    </div>
  );
};