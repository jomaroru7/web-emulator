
interface ControlsInfoProps {
    activeControlPack: 1 | 2;
    onControlPackChange: (pack: 1 | 2) => void;
}

export const ControlsInfo = ({ activeControlPack, onControlPackChange }: ControlsInfoProps) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Selector de pack de controles */}
            <div className="flex gap-2 max-w-md">
                <button
                    onClick={() => onControlPackChange(1)}
                    className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${activeControlPack === 1
                            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                >
                    Pack 1
                </button>
                <button
                    onClick={() => onControlPackChange(2)}
                    className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${activeControlPack === 2
                            ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                >
                    Pack 2
                </button>
            </div>

            {/* Pack de controles 1 */}
            {activeControlPack === 1 && (
                <div className="relative bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 rounded-xl p-6 border-2 border-purple-500 shadow-lg shadow-purple-500/50 max-w-md">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-purple-500/20 rounded-tl-xl blur-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/20 rounded-br-xl blur-xl"></div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 mb-4 flex items-center gap-2">
                            <span className="text-2xl">🎮</span>
                            Controles - Flechas
                        </h3>

                        <div className="space-y-3">
                            <div className="bg-black/40 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/60 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="bg-linear-to-br from-purple-600 to-purple-800 rounded p-2 h-10 flex items-center justify-center font-bold text-white shadow-lg">
                                        ↑↓←→
                                    </div>
                                    <span className="text-gray-300 font-medium">D-Pad</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 rounded-lg p-2 border border-green-500/30 hover:border-green-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-green-500 to-green-700 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            Z
                                        </div>
                                        <span className="text-gray-300 text-sm">B</span>
                                    </div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-2 border border-red-500/30 hover:border-red-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-red-500 to-red-700 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            X
                                        </div>
                                        <span className="text-gray-300 text-sm">A</span>
                                    </div>
                                </div>


                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 rounded-lg p-2 border border-gray-500/30 hover:border-gray-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-gray-600 to-gray-800 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            A
                                        </div>
                                        <span className="text-gray-300 text-sm">L</span>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-lg p-2 border border-gray-500/30 hover:border-gray-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-gray-600 to-gray-800 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            S
                                        </div>
                                        <span className="text-gray-300 text-sm">R</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 rounded-lg p-2 border border-yellow-500/30 hover:border-yellow-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-yellow-600 to-yellow-800 rounded px-2 py-1 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                                            ↵
                                        </div>
                                        <span className="text-gray-300 text-sm">Start</span>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-lg p-2 border border-orange-500/30 hover:border-orange-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-orange-600 to-orange-800 rounded px-2 py-1 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                                            ⌫
                                        </div>
                                        <span className="text-gray-300 text-sm">Select</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
                    </div>
                </div>
            )}

            {/* Pack de controles 2 */}
            {activeControlPack === 2 && (
                <div className="relative bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 border-2 border-blue-500 shadow-lg shadow-blue-500/50 max-w-md">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/20 rounded-tl-xl blur-xl"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-br-xl blur-xl"></div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-4 flex items-center gap-2">
                            <span className="text-2xl">⌨️</span>
                            Controles - WASD
                        </h3>

                        <div className="space-y-3">
                            <div className="bg-black/40 rounded-lg p-3 border border-blue-500/30 hover:border-blue-500/60 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded p-2 w-10 h-10 flex items-center justify-center font-bold text-white shadow-lg text-xs">
                                        WASD
                                    </div>
                                    <span className="text-gray-300 font-medium">D-Pad</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 rounded-lg p-2 border border-green-500/30 hover:border-green-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-green-500 to-green-700 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            N
                                        </div>
                                        <span className="text-gray-300 text-sm">B</span>
                                    </div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-2 border border-red-500/30 hover:border-red-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-red-500 to-red-700 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            M
                                        </div>
                                        <span className="text-gray-300 text-sm">A</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 rounded-lg p-2 border border-teal-500/30 hover:border-teal-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-teal-600 to-teal-800 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            J
                                        </div>
                                        <span className="text-gray-300 text-sm">L</span>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-lg p-2 border border-teal-500/30 hover:border-teal-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-teal-600 to-teal-800 rounded w-8 h-8 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                            K
                                        </div>
                                        <span className="text-gray-300 text-sm">R</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 rounded-lg p-2 border border-yellow-500/30 hover:border-yellow-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-yellow-600 to-yellow-800 rounded px-2 py-1 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                                            ↵
                                        </div>
                                        <span className="text-gray-300 text-sm">Start</span>
                                    </div>
                                </div>

                                <div className="bg-black/40 rounded-lg p-2 border border-orange-500/30 hover:border-orange-500/60 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-linear-to-br from-orange-600 to-orange-800 rounded px-2 py-1 flex items-center justify-center font-bold text-white text-xs shadow-lg">
                                            ⌫
                                        </div>
                                        <span className="text-gray-300 text-sm">Select</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                    </div>
                </div>
            )}
        </div>
    );
};