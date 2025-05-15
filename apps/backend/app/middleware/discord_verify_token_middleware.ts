import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import axios from 'axios';

export default class DiscordVerifyToken {
  async handle({ request, response, params }: HttpContext, next: NextFn) {
    const authHeader = request.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const accessToken = authHeader.split(' ')[1];

    try {
      // Vérifiez le jeton en appelant l'API Discord
      const userData = await this.verifyToken(accessToken);
      console.log('Access token verified');

      // Ajoutez l'ID de l'utilisateur à l'objet params
      params.discordUserId = userData.id;

      // Si le jeton est valide, passez à la suite
      await next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return response.status(401).json({ error: 'Unauthorized' });
    }
  }

  private async verifyToken(accessToken: string) {
    try {
      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Si la requête réussit, le jeton est valide
      return userResponse.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid or expired token');
      }
      throw new Error('Failed to verify token');
    }
  }
}
