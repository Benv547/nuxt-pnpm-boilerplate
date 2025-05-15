// import User from '#models/example'
import type { HttpContext } from '@adonisjs/core/http'
// import Example from '#models/example'

export default class UsersController {
  // GET: /examples
  async me({ response, params }: HttpContext) {
    response.status(200).json({
      message: 'Hello from AdonisJS',
      id: params.id,
    })
  }
}
