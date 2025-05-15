import { CallbackAndContext, httpService } from "./helper";
import { loadStripe } from "@stripe/stripe-js";
import { storage } from "@/utils";

class StripeController extends CallbackAndContext {
    public async redirectToCheckout(priceId: string): Promise<void> {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        const response = await httpService({
            method: 'POST',
            url: '/stripe/create-checkout-session',
            data: {
                priceId: priceId,
                userId: storage.getItem('appSession')?.idUser,
            }
        });
        if (response.status !== 200) {
            console.error('Erreur lors de la création de la session de paiement', response);
            return;
        }
        const sessionId = response.data.sessionId;
        const { error } = await stripe?.redirectToCheckout({
            sessionId: sessionId,
        });
        if (error) {
            console.error('Erreur lors de la redirection vers le paiement', error);
            return;
        }
        console.log('Redirection vers le paiement réussie');
    }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class StripeControllerSingleton {
    private static instance: StripeController | null = null;
    public static getInstance(): StripeController {
        if (!StripeControllerSingleton.instance) {
            StripeControllerSingleton.instance = new StripeController();
        }
        return StripeControllerSingleton.instance;
    }
}
export const stripeController = StripeControllerSingleton.getInstance();
