interface GbaButtonProps {
    onPress: () => void;
    onRelease: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const GbaButton = ({ 
    onPress, 
    onRelease, 
    disabled, 
    className = '', 
    children 
}: GbaButtonProps) => {
    return (
        <button
            onPointerDown={onPress}
            onPointerUp={onRelease}
            onPointerLeave={onRelease}
            disabled={disabled}
            className={className}
            style={{ touchAction: 'none', userSelect: 'none' }}
        >
            {children}
        </button>
    );
};