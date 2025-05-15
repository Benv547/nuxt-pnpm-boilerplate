import {CallbackAndContext} from "./helper";
import {httpService} from '@/controllers/helper';
import type User from "@bam-web-app/backend/app/models/user_model.ts";
import {storage} from "@/utils";

class UserController extends CallbackAndContext {
    public async getUser(id: string): Promise<User> {
        return await httpService({
            method: 'get',
            url: '/users/' + id,
        })
            .then((response) => {
                return response.data as User;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserControllerSingleton {
    private static instance: UserController | null = null;
    public static getInstance(): UserController {
        if (!UserControllerSingleton.instance) {
            UserControllerSingleton.instance = new UserController();
        }
        return UserControllerSingleton.instance;
    }
}
export const userController = UserControllerSingleton.getInstance();
