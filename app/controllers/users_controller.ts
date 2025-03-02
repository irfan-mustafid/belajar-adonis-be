import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request }: HttpContext) {
    const users = await User.query().paginate(request.input('page', 1), 10)
    return users
  }
  async show({ request }: HttpContext) {
    const user = await User.findOrFail(request.param('id'))
    return user
  }
}
