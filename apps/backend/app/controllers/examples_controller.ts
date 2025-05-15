// import User from '#models/example'
import type { HttpContext } from '@adonisjs/core/http'
import Example from '#models/example'

export default class UsersController {
  // GET: /examples/:id
  async me({ response, params }: HttpContext) {
    if (params.id !== params.id) {
      response.status(401).json({ error: 'Unauthorized' })
      return
    }

    const exampleRecord = await Example.findBy('id', params.id)
    response.status(200).json(exampleRecord)
  }
}
