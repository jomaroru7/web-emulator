import { useEffect, useState } from 'react';
import { GOOGLE_CONFIG } from '../config/google';

interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    size: string;
}

export const useGoogleDrive = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isSignedIn = !!accessToken;

    useEffect(() => {
        // Verificar si hay un token en localStorage (persistencia)
        const savedToken = localStorage.getItem('google_access_token');
        if (savedToken) {
            setAccessToken(savedToken);
        }

        // Capturar el token del hash después del redirect de Google
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            
            if (token) {
                setAccessToken(token);
                localStorage.setItem('google_access_token', token);
                
                // Limpiar el hash de la URL
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
    }, []);

    const signIn = () => {
        const redirectUri = window.location.origin;
        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        authUrl.searchParams.append('client_id', GOOGLE_CONFIG.CLIENT_ID);
        authUrl.searchParams.append('redirect_uri', redirectUri);
        authUrl.searchParams.append('response_type', 'token');
        authUrl.searchParams.append('scope', GOOGLE_CONFIG.SCOPES);
        
        window.location.href = authUrl.toString();
    };

    const signOut = () => {
        setAccessToken(null);
        localStorage.removeItem('google_access_token');
    };

    const listRomFiles = async (): Promise<DriveFile[]> => {
        if (!accessToken) return [];
        
        setIsLoading(true);
        try {
            const response = await fetch(
                'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
                    pageSize: '100',
                    fields: 'files(id, name, mimeType, size)',
                    q: "name contains '.gba' or name contains '.zip' or name contains '.gb'"
                }),
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            
            if (!response.ok) {
                if (response.status === 401) {
                    // Token expirado
                    signOut();
                    throw new Error('Token expirado, por favor vuelve a conectar');
                }
                throw new Error('Error al listar archivos');
            }
            
            const data = await response.json();
            return data.files || [];
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const downloadFile = async (fileId: string): Promise<Uint8Array> => {
        if (!accessToken) throw new Error('Not authenticated');
        
        try {
            const response = await fetch(
                `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to download file');
            }
            
            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        } catch (error) {
            console.error('Error downloading file:', error);
            throw error;
        }
    };

    return {
        isSignedIn,
        isLoading,
        signIn,
        signOut,
        listRomFiles,
        downloadFile
    };
};