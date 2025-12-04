import { useEffect } from 'react';
import { type mGBAEmulator } from '@thenick775/mgba-wasm';

// bindKey(teclaFisica, botonGBA)
const KEY_BINDINGS_PACK1 = {
    'up': 'up',
    'down': 'down',
    'left': 'left',
    'right': 'right',
    'x': 'a',
    'z': 'b',
    'a': 'l',
    's': 'r',
    'Enter': 'start',
    'Backspace': 'select'
};

const KEY_BINDINGS_PACK2 = {
    'w': 'up',
    's': 'down',
    'a': 'left',
    'd': 'right',
    'm': 'a',
    'n': 'b',
    'j': 'l',
    'k': 'r',
    'Enter': 'start',
    'Backspace': 'select'
};

export const useKeyboardControls = (emulator: mGBAEmulator | null, activeControlPack: 1 | 2) => {
    useEffect(() => {
        if (!emulator) {
            return;
        }

        const activeBindings = activeControlPack === 1 ? KEY_BINDINGS_PACK1 : KEY_BINDINGS_PACK2;

        // bindKey(bindingName, inputName) donde:
        // - bindingName: tecla física (ej: 'KeyX', 'ArrowUp')
        // - inputName: botón del GBA en minúsculas (ej: 'a', 'up', 'start')
        Object.entries(activeBindings).forEach(([keyCode, gbaButton]) => {
            try {
                emulator.bindKey(keyCode, gbaButton);
            } catch (e) {
                console.error(`✗ Failed to bind ${keyCode} → ${gbaButton}:`, e);
            }
        });

        return () => {
            // bindKey establece la configuración permanentemente,
            // no necesitamos limpiar en el unmount
        };
    }, [emulator, activeControlPack]);
};