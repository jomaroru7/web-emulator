interface RomUploaderProps {
    onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

export const RomUploader = ({ onFileSelect, disabled }: RomUploaderProps) => {
    return (
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
                onChange={onFileSelect}
                disabled={disabled}
                className="hidden"
            />
        </div>
    );
};