import { GbaButton } from './gba-button/GbaButton';

interface MobileButtonsProps {
    onButtonPress: (key: string) => void;
    onButtonRelease: (key: string) => void;
    disabled: boolean;
}

export const MobileButtons = ({ onButtonPress, onButtonRelease, disabled }: MobileButtonsProps) => {
    const buttons = {
        A: 'A',
        B: 'B',
        SELECT: 'SELECT',
        START: 'START',
        RIGHT: 'RIGHT',
        LEFT: 'LEFT',
        UP: 'UP',
        DOWN: 'DOWN',
        R: 'R',
        L: 'L'
    };

    return (
        <div className="w-full max-w-md">
            {/* Botones L/R */}
            <div className="flex justify-between mb-4">
                <GbaButton
                    onPress={() => onButtonPress(buttons.L)}
                    onRelease={() => onButtonRelease(buttons.L)}
                    disabled={disabled}
                    className="w-20 h-10 bg-gray-500 text-white rounded font-bold"
                >
                    L
                </GbaButton>
                {/* Botones centrales (Start/Select) */}
                <div className="col-span-1 flex flex-col items-center justify-center gap-2">
                    
                    <GbaButton
                        onPress={() => onButtonPress(buttons.START)}
                        onRelease={() => onButtonRelease(buttons.START)}
                        disabled={disabled}
                        className="w-16 h-8 bg-gray-600 text-white text-xs rounded"
                    >
                        START
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.SELECT)}
                        onRelease={() => onButtonRelease(buttons.SELECT)}
                        disabled={disabled}
                        className="w-16 h-8 bg-gray-600 text-white text-xs rounded"
                    >
                        SELECT
                    </GbaButton>
                </div>
                <GbaButton
                    onPress={() => onButtonPress(buttons.R)}
                    onRelease={() => onButtonRelease(buttons.R)}
                    disabled={disabled}
                    className="w-20 h-10 bg-gray-500 text-white rounded font-bold"
                >
                    R
                </GbaButton>
            </div>
            <div className="grid grid-cols-2 gap-4">
                
                {/* D-Pad */}
                <div className="col-span-1 relative h-40">
                    <GbaButton
                        onPress={() => onButtonPress(buttons.UP)}
                        onRelease={() => onButtonRelease(buttons.UP)}
                        disabled={disabled}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-700 text-white rounded"
                    >
                        ↑
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.DOWN)}
                        onRelease={() => onButtonRelease(buttons.DOWN)}
                        disabled={disabled}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-700 text-white rounded"
                    >
                        ↓
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.LEFT)}
                        onRelease={() => onButtonRelease(buttons.LEFT)}
                        disabled={disabled}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-700 text-white rounded"
                    >
                        ←
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.RIGHT)}
                        onRelease={() => onButtonRelease(buttons.RIGHT)}
                        disabled={disabled}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-700 text-white rounded"
                    >
                        →
                    </GbaButton>
                </div>

                

                {/* Botones A/B */}
                <div className="col-span-1 relative h-40">
                    <GbaButton
                        onPress={() => onButtonPress(buttons.B)}
                        onRelease={() => onButtonRelease(buttons.B)}
                        disabled={disabled}
                        className="absolute bottom-4 left-4 w-14 h-14 bg-green-600 text-white rounded-full font-bold"
                    >
                        B
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.A)}
                        onRelease={() => onButtonRelease(buttons.A)}
                        disabled={disabled}
                        className="absolute top-8 right-4 w-14 h-14 bg-red-600 text-white rounded-full font-bold"
                    >
                        A
                    </GbaButton>
                </div>
            </div>
        </div>
    );
};