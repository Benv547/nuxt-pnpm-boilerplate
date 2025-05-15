export default defineNuxtRouteMiddleware(async (to, from) => {
    // if (!cachedUser) {
    //     try {
    //         const idUser = storage.getItem('appSession')?.idUser;
    //         cachedUser = await userController.getUser(idUser as string) as User;
    //     } catch {
    //         // Redirige vers /login si l'utilisateur n'est pas connecté
    //         if (to.path !== '/login/') {
    //             // Stocke le chemin actuel pour redirection après connexion
    //             if (from.path !== '/login/') {
    //                 localStorage.setItem('redirect', from.path);
    //             }
    //             return navigateTo('/login/');
    //         }
    //     }
    // }
    //
    // if (to.path === '/login/') {
    //     if (cachedUser) {
    //         // Si l'utilisateur est déjà connecté, redirige vers la page précédente ou par défaut
    //         const redirect = localStorage.getItem('redirect');
    //         localStorage.removeItem('redirect');
    //         return navigateTo(redirect ? redirect : '/');
    //     }
    // }
});