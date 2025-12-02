import mGBA, { type mGBAEmulator } from '@thenick775/mgba-wasm';
import { useEffect, useState } from 'react';

export const useEmulator = (canvas: HTMLCanvasElement | null) => {
  const [emulator, setEmulator] = useState<mGBAEmulator | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      if (canvas) {
        try {
          setIsLoading(true);
          setError(null);

          const Module = await mGBA({ canvas });

          const mGBAVersion =
            Module.version.projectName + ' ' + Module.version.projectVersion;
          console.log('mGBA initialized:', mGBAVersion);

          await Module.FSInit();

          setEmulator(Module);
        } catch (err) {
          console.error('Failed to initialize emulator:', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize emulator');
        } finally {
          setIsLoading(false);
        }
      }
    };

    initialize();
  }, [canvas]);

  return { emulator, isLoading, error };
};
