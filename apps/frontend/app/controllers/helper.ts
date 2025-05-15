import axios from 'axios';
import { storage } from "@/utils";

function isTokenExpired (expiresDate: number) {
    if (!expiresDate) return true;

    const currentTime = Date.now();
    console.log(currentTime, expiresDate);
    return currentTime >= expiresDate; // Vérifie si le token est expiré
}
async function refreshAccessToken(): Promise<string | undefined> {
    const appSession = storage.getItem('appSession');
    const response = await axios.post('https://api.bouteille.io/discord/refresh', null, {
        params: { refresh_token: appSession?.refreshToken },
    });
    if (response.status !== 200) {
        console.error('Erreur lors de la mise à jour du token', response);
        return undefined;
    }
    storage.setItem("appSession", {
        idUser: appSession?.idUser as string,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresDate: Date.now() + response.data.expires_in,
    })
    return response.data.access_token;
}

export const httpService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
httpService.interceptors.request.use(
    config => {
        const accessToken = storage.getItem('appSession')?.accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
httpService.interceptors.request.use(
    async (config) => {
        console.log(config);
        const appSession = storage.getItem('appSession');
        const accessToken = appSession?.accessToken;
        const expiresDate = appSession?.expiresDate;

        if (accessToken && isTokenExpired(expiresDate as number)) {
            try {
                const newAccessToken = await refreshAccessToken();
                config.headers.Authorization = `Bearer ${newAccessToken}`;
            } catch (error) {
                // Gérer l'erreur, par exemple rediriger vers la page de connexion
                console.error('Erreur lors de la mise à jour du token', error);
                storage.removeItem("appSession");
            }
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const httpDiscordService = axios.create({
    baseURL: 'https://discord.com/api',
    headers: {
        'Authorization': 'Bearer ' + storage.getItem('appSession')?.accessToken,
    }
});

export interface ICallback {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    addCallback(key: string, callback: Function): void;
    callCallback(key: string, ...args: unknown[]): void;
    asyncCallback(key: string, ...args: unknown[]): Promise<void>;
    removeCallback(key: string): void;
}
export class Callback implements ICallback {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    mapCallback: Map<string, Function> = new Map();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    public addCallback(key: string, callback: Function) {
        this.mapCallback.set(key, callback);
    }

    public callCallback(key: string, ...args: unknown[]) {
        if (!this.mapCallback.has(key)) {
            console.error('Callback not found:', key);
            return;
        }

        const callback = this.mapCallback.get(key);
        if (!callback) {
            console.error('Callback not found:', key);
            return;
        }

        callback(...args);
    }

    public async asyncCallback(key: string, ...args: unknown[]) {
        const callback = this.mapCallback.get(key);
        if (callback) {
            await callback(...args);
        }
        else {
            console.error('Callback not found:', key);
        }
    }

    public removeCallback(key: string) {
        this.mapCallback.delete(key);
    }
}

export interface IContext {
    setContext<T>(key: string, value: T): void;
    getContext<T>(key: string): T | undefined;
    hasContext(key: string): boolean;
    removeContext(key: string): void;
    clearContext(): void;
}
export class Context implements IContext {
    mapContext: Map<string, unknown> = new Map();

    public setContext<T>(key: string, value: T) {
        this.mapContext.set(key, value);
    }

    public getContext<T>(key: string) {
        return this.mapContext.has(key) ? this.mapContext.get(key) as T : undefined;
    }

    public hasContext(key: string) {
        return this.mapContext.has(key);
    }

    public removeContext(key: string) {
        this.mapContext.delete(key);
    }

    public clearContext() {
        this.mapContext.clear();
    }
}

export class CallbackAndContext extends Callback implements IContext {
    mapContext: Map<string, unknown> = new Map();

    public setContext<T>(key: string, value: T) {
        this.mapContext.set(key, value);
    }

    public getContext<T>(key: string) {
        return this.mapContext.get(key) as T;
    }

    public hasContext(key: string) {
        return this.mapContext.has(key);
    }

    public removeContext(key: string) {
        this.mapContext.delete(key);
    }

    public clearContext() {
        this.mapContext.clear();
    }
}
