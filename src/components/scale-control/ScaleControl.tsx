interface ScaleControlProps {
    scale: number;
    onScaleChange: (scale: number) => void;
}

export const ScaleControl = ({ scale, onScaleChange }: ScaleControlProps) => {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="scale-select" className="font-semibold">
                Tamaño:
            </label>
            <select
                id="scale-select"
                value={scale}
                onChange={(e) => onScaleChange(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value={1}>1x (240x160)</option>
                <option value={1.5}>1.5x (360x240)</option>
                <option value={2}>2x (480x320)</option>
                <option value={2.5}>2.5x (600x400)</option>
                <option value={3}>3x (720x480)</option>
                <option value={3.5}>3.5x (840x560)</option>
                <option value={4}>4x (960x640)</option>
                <option value={4.5}>4.5x (1080x720)</option>
                <option value={5}>5x (1200x800)</option>
            </select>
        </div>
    );
};