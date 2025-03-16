import { HttpContext } from '@adonisjs/core/http'
import Media from '#models/media'

export default class MediaController {
  public async store({ request, response }: HttpContext) {
    const { user_id, file_path, title } = request.only(['user_id', 'file_path', 'title'])
    try {
      const media = await Media.create({ user_id, file_path, title })
      // dd(media)
      return response.status(201).json(media)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to create media' })
    }
  }
}
