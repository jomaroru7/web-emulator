interface OpacityControlProps {
    opacity: number;
    onOpacityChange: (opacity: number) => void;
}

export const OpacityControl = ({ opacity, onOpacityChange }: OpacityControlProps) => {
    return (
        <div className="flex items-center gap-3">
            <label htmlFor="opacity-control" className="font-semibold ">
                Opacidad:
            </label>
            <input
                id="opacity-control"
                type="range"
                min="0.3"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => onOpacityChange(Number(e.target.value))}
                className="flex-1"
            />
            <span className="text-sm font-medium w-12 text-right ">
                {Math.round(opacity * 100)}%
            </span>
        </div>
    );
};
