interface VolumeControlProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
    disabled?: boolean;
}

export const VolumeControl = ({ volume, onVolumeChange, disabled }: VolumeControlProps) => {
    return (
        <div className="flex items-center gap-3">
            <label htmlFor="volume-control" className="font-semibold">
                Volumen:
            </label>
            <input
                id="volume-control"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="flex-1"
                disabled={disabled}
            />
            <span className="text-sm font-medium w-12 text-right">
                {Math.round(volume * 100)}%
            </span>
        </div>
    );
};