import { CallbackAndContext, httpDiscordService } from "./helper";
import { storage } from "@/utils";

class DiscordController extends CallbackAndContext {
    public async getDiscordMe(): Promise<object> {
        const accessToken = storage.getItem('appSession')?.accessToken;
        return await httpDiscordService({
            method: 'get',
            url: '/users/@me',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class DiscordControllerSingleton {
    private static instance: DiscordController | null = null;
    public static getInstance(): DiscordController {
        if (!DiscordControllerSingleton.instance) {
            DiscordControllerSingleton.instance = new DiscordController();
        }
        return DiscordControllerSingleton.instance;
    }
}
export const discordController = DiscordControllerSingleton.getInstance();
