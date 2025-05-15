import type { HttpContext } from '@adonisjs/core/http'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import env from '#start/env'

console.log(env.get('KEYCLOAK_JWKS_URI'))
const JWKS = createRemoteJWKSet(new URL(env.get('KEYCLOAK_JWKS_URI') || ''))

export default class KeycloakAuth {
  public async handle({ request, response, params }: HttpContext, next: () => Promise<void>) {
    const authHeader = request.header('authorization') || ''
    if (!authHeader.startsWith('Bearer ')) {
      return response.unauthorized('Token manquant')
    }

    const token = authHeader.slice(7)
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: env.get('KEYCLOAK_ISSUER'),
        audience: env.get('KEYCLOAK_AUDIENCE'),
      })
      // on expose le payload JWT sur ctx.state.user
      params.payload = payload
      await next()
    } catch (error) {
      console.error('JWT verification error:', error)
      return response.unauthorized('Token invalide')
    }
  }
}
