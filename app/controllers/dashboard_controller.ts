import Permohonan from '#models/permohonan'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

    async proses({ request } : HttpContext) {
       const dataPermohonan = await Permohonan.query()
           .preload('toVendor')
           .preload('toBank')
           .where('status', 'SURETY_DONE')
           .whereRaw('created_at >= ?', [request.input('start_date', '2025-02-01')])
           .whereRaw('created_at <= ?', [request.input('end_date', '2025-02-10')])
           .orderBy('updated_at', 'desc')
           .paginate(request.input('page', 1), 25)
       return dataPermohonan
    }
}