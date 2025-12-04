# Web GBA Emulator

Web-based Game Boy Advance emulator with support for local ROMs and Google Drive.

## Features

- **Full GBA emulation** using [@thenick775/mgba-wasm](https://github.com/thenick775/mgba-wasm)
- **Load ROMs** from local files or Google Drive
- **Responsive design** optimized for mobile and desktop
- **Touch controls** styled after Game Boy Color Pikachu Edition
- **Dual keyboard control packs** (Arrow keys + WASD)
- **Landscape mode** with semi-transparent overlay controls
- **Volume control** and screen scaling
- **Google Drive integration** to access your ROMs from the cloud

## Installation

```bash
# Clone the repository
git clone https://github.com/jomaroru7/web-emulator.git
cd web-emulator

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit the .env file with your Google Client ID
```

## Configuration

### Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy the Client ID and paste it in the `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

## Usage

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Production preview
npm run preview
```

## Controls

### Keyboard (Pack 1 - Arrow Keys)
- **Direction**: Arrow keys ← ↑ → ↓
- **A**: Z
- **B**: X
- **Start**: Enter
- **Select**: Shift
- **L**: A
- **R**: S

### Keyboard (Pack 2 - WASD)
- **Direction**: W A S D
- **A**: J
- **B**: K
- **Start**: Enter
- **Select**: Shift
- **L**: U
- **R**: I

### Mobile
On-screen touch controls with GBC Pikachu Edition design

## Technologies

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **@thenick775/mgba-wasm** - GBA emulator
- **Google Identity Services** - OAuth authentication

## License

Personal project

## Contributing

This is a personal project, but feel free to fork and experiment

## ⚠️ Disclaimer

This emulator is designed to run legally obtained ROMs. It does not distribute or link to copyrighted ROMs.