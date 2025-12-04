import { GbaButton } from './gba-button/GbaButton';

interface MobileButtonsProps {
    onButtonPress: (key: string) => void;
    onButtonRelease: (key: string) => void;
    disabled: boolean;
    isLandscape?: boolean;
    opacity?: number;
}

export const MobileButtons = ({ onButtonPress, onButtonRelease, disabled, isLandscape = false, opacity = 0.7 }: MobileButtonsProps) => {
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

    // Landscape mode: overlaid controls with transparency
    if (isLandscape) {
        return (
            <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full flex items-end justify-between px-8 pointer-events-auto">
                    {/* Left controls (D-Pad) */}
                    <div 
                        className="transition-opacity hover:opacity-100" 
                        style={{ opacity }}
                    >
                        <div className="relative h-44 w-44 flex items-center justify-center mb-4">
                            {/* Up */}
                            <GbaButton
                                onPress={() => onButtonPress(buttons.UP)}
                                onRelease={() => onButtonRelease(buttons.UP)}
                                disabled={disabled}
                                className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-16 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-t-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-y-0.5"
                            >
                                ▲
                            </GbaButton>
                            
                            {/* Down */}
                            <GbaButton
                                onPress={() => onButtonPress(buttons.DOWN)}
                                onRelease={() => onButtonRelease(buttons.DOWN)}
                                disabled={disabled}
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-16 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-b-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-y-0.5"
                            >
                                ▼
                            </GbaButton>
                            
                            {/* Left */}
                            <GbaButton
                                onPress={() => onButtonPress(buttons.LEFT)}
                                onRelease={() => onButtonRelease(buttons.LEFT)}
                                disabled={disabled}
                                className="absolute -left-2 top-1/2 -translate-y-1/2 w-16 h-14 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-l-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-x-0.5"
                            >
                                ◀
                            </GbaButton>
                            
                            {/* Right */}
                            <GbaButton
                                onPress={() => onButtonPress(buttons.RIGHT)}
                                onRelease={() => onButtonRelease(buttons.RIGHT)}
                                disabled={disabled}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 w-16 h-14 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-r-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-x-0.5"
                            >
                                ▶
                            </GbaButton>
                        </div>
                    </div>

                    {/* Right controls (A/B) */}
                    <div 
                        className="transition-opacity hover:opacity-100" 
                        style={{ opacity }}
                    >
                        <div className="relative h-44 w-44 flex items-center justify-center">
                            <GbaButton
                                onPress={() => onButtonPress(buttons.B)}
                                onRelease={() => onButtonRelease(buttons.B)}
                                disabled={disabled}
                                className="absolute bottom-8 left-2 w-16 h-16 bg-linear-to-br from-green-400 via-green-500 to-green-600 text-white rounded-full font-black text-xl shadow-xl border-4 border-green-700 active:shadow-inner active:translate-y-1"
                            >
                                B
                            </GbaButton>
                            
                            <GbaButton
                                onPress={() => onButtonPress(buttons.A)}
                                onRelease={() => onButtonRelease(buttons.A)}
                                disabled={disabled}
                                className="absolute top-6 right-2 w-16 h-16 bg-linear-to-br from-red-500 via-red-600 to-red-700 text-white rounded-full font-black text-xl shadow-xl border-4 border-red-800 active:shadow-inner active:translate-y-1"
                            >
                                A
                            </GbaButton>
                        </div>
                    </div>
                </div>

                {/* Start/Select/L/R buttons at the top */}
                <div 
                    className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto transition-opacity hover:opacity-100" 
                    style={{ opacity }}
                >
                    <GbaButton
                        onPress={() => onButtonPress(buttons.L)}
                        onRelease={() => onButtonRelease(buttons.L)}
                        disabled={disabled}
                        className="w-16 h-8 bg-linear-to-b from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg font-bold text-xs shadow-lg border-2 border-blue-700 active:shadow-inner active:translate-y-0.5"
                    >
                        L
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.SELECT)}
                        onRelease={() => onButtonRelease(buttons.SELECT)}
                        disabled={disabled}
                        className="w-16 h-7 bg-linear-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-gray-800 text-[10px] font-bold rounded-full shadow-md border-2 border-yellow-700 active:shadow-inner active:translate-y-0.5"
                    >
                        SELECT
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.START)}
                        onRelease={() => onButtonRelease(buttons.START)}
                        disabled={disabled}
                        className="w-16 h-7 bg-linear-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-gray-800 text-[10px] font-bold rounded-full shadow-md border-2 border-yellow-700 active:shadow-inner active:translate-y-0.5"
                    >
                        START
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.R)}
                        onRelease={() => onButtonRelease(buttons.R)}
                        disabled={disabled}
                        className="w-16 h-8 bg-linear-to-b from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg font-bold text-xs shadow-lg border-2 border-blue-700 active:shadow-inner active:translate-y-0.5"
                    >
                        R
                    </GbaButton>
                </div>
            </div>
        );
    }

    // Normal vertical mode
    return (
        <div className="w-full max-w-md">
            {/* L/R buttons */}
            <div className="flex justify-between mb-6">
                <GbaButton
                    onPress={() => onButtonPress(buttons.L)}
                    onRelease={() => onButtonRelease(buttons.L)}
                    disabled={disabled}
                    className="w-20 h-10 bg-linear-to-b from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg font-bold text-sm shadow-lg border-2 border-blue-700 active:shadow-inner active:translate-y-0.5"
                >
                    L
                </GbaButton>
                {/* Center buttons (Start/Select) */}
                <div className="flex flex-col items-center justify-center gap-3">
                    <GbaButton
                        onPress={() => onButtonPress(buttons.SELECT)}
                        onRelease={() => onButtonRelease(buttons.SELECT)}
                        disabled={disabled}
                        className="w-20 h-7 bg-linear-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-gray-800 text-[10px] font-bold rounded-full shadow-md border-2 border-yellow-700 active:shadow-inner active:translate-y-0.5"
                    >
                        SELECT
                    </GbaButton>
                    <GbaButton
                        onPress={() => onButtonPress(buttons.START)}
                        onRelease={() => onButtonRelease(buttons.START)}
                        disabled={disabled}
                        className="w-20 h-7 bg-linear-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-gray-800 text-[10px] font-bold rounded-full shadow-md border-2 border-yellow-700 active:shadow-inner active:translate-y-0.5"
                    >
                        START
                    </GbaButton>
                </div>
                <GbaButton
                    onPress={() => onButtonPress(buttons.R)}
                    onRelease={() => onButtonRelease(buttons.R)}
                    disabled={disabled}
                    className="w-20 h-10 bg-linear-to-b from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg font-bold text-sm shadow-lg border-2 border-blue-700 active:shadow-inner active:translate-y-0.5"
                >
                    R
                </GbaButton>
            </div>
            <div className="grid grid-cols-2 gap-6">
                
                {/* D-Pad */}
                <div className="col-span-1 relative h-44 flex items-center justify-center">
                    
                    {/* Up */}
                    <GbaButton
                        onPress={() => onButtonPress(buttons.UP)}
                        onRelease={() => onButtonRelease(buttons.UP)}
                        disabled={disabled}
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-14 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-t-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-y-0.5"
                    >
                        ▲
                    </GbaButton>
                    
                    {/* Down */}
                    <GbaButton
                        onPress={() => onButtonPress(buttons.DOWN)}
                        onRelease={() => onButtonRelease(buttons.DOWN)}
                        disabled={disabled}
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-12 h-14 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-b-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-y-0.5"
                    >
                        ▼
                    </GbaButton>
                    
                    {/* Left */}
                    <GbaButton
                        onPress={() => onButtonPress(buttons.LEFT)}
                        onRelease={() => onButtonRelease(buttons.LEFT)}
                        disabled={disabled}
                        className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-14 h-12 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-l-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-x-0.5"
                    >
                        ◀
                    </GbaButton>
                    
                    {/* Right */}
                    <GbaButton
                        onPress={() => onButtonPress(buttons.RIGHT)}
                        onRelease={() => onButtonRelease(buttons.RIGHT)}
                        disabled={disabled}
                        className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-14 h-12 bg-linear-to-b from-blue-500 via-blue-600 to-blue-700 text-white text-2xl rounded-r-lg shadow-lg border-2 border-blue-800 active:shadow-inner active:translate-x-0.5"
                    >
                        ▶
                    </GbaButton>
                </div>

                {/* A/B buttons */}
                <div className="col-span-1 relative h-44 flex items-center justify-center">
                    <GbaButton
                        onPress={() => onButtonPress(buttons.B)}
                        onRelease={() => onButtonRelease(buttons.B)}
                        disabled={disabled}
                        className="absolute bottom-8 left-2 w-16 h-16 bg-linear-to-br from-green-400 via-green-500 to-green-600 text-white rounded-full font-black text-xl shadow-xl border-4 border-green-700 active:shadow-inner active:translate-y-1"
                    >
                        B
                    </GbaButton>
                    
                    <GbaButton
                        onPress={() => onButtonPress(buttons.A)}
                        onRelease={() => onButtonRelease(buttons.A)}
                        disabled={disabled}
                        className="absolute top-6 right-2 w-16 h-16 bg-linear-to-br from-red-500 via-red-600 to-red-700 text-white rounded-full font-black text-xl shadow-xl border-4 border-red-800 active:shadow-inner active:translate-y-1"
                    >
                        A
                    </GbaButton>
                </div>
            </div>
        </div>
    );
};