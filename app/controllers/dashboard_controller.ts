import Permohonan from '#models/permohonan'
import type { HttpContext } from '@adonisjs/core/http'

const statusPermohonan = [
    'QRCODE',
    'DITERIMA',
    'MENUNGGU_VERIFIKASI_ASURANSI',
    'MENUNGGU_VERIFIKASI_BANK',
    'KURANG_DOKUMEN',
    'KONTRA_GARANSI',
    'GENERATE_SURETY',
    'IJIN_PRINSIP_DITOLAK'
];
export default class DashboardController {

    async summary ({  } : HttpContext) {
        const countProses = await Permohonan.query()
            .where('status', '!=', 'DITOLAK')
            .whereRaw('DATE(created_at) >= ?', ['2025-02-01'])
            .whereRaw('DATE(created_at) <= ?', ['2025-02-28'])
            .count('* as total')

            const countProsesDitolak = await Permohonan.query()
            .where('status', 'DITOLAK')
            .whereRaw('DATE(created_at) >= ?', ['2025-02-01'])
            .whereRaw('DATE(created_at) <= ?', ['2025-02-28'])
            .count('* as total')

            const countProsesDiterima = await Permohonan.query()
            .where('status', 'SURETY_DONE')    
            .whereRaw('DATE(created_at) >= ?', ['2025-02-01'])  
            .whereRaw('DATE(created_at) <= ?', ['2025-02-28'])
            .count('* as total')

            const summary = {
                total: countProses[0].$extras.total,
                ditolak: countProsesDitolak[0].$extras.total,
                diterima: countProsesDiterima[0].$extras.total
            }
            return summary
    }

    async proses({ request } : HttpContext) {
       const dataPermohonan = await Permohonan.query()
           .preload('toVendor')
           .preload('toBank')
           .whereIn('status', statusPermohonan)
           .whereRaw('DATE(created_at) >= ?', [request.input('start_date', '2025-02-01')])
           .whereRaw('DATE(created_at) <= ?', [request.input('end_date', '2025-02-28')])
           .orderBy('updated_at', 'desc')
           .paginate(request.input('page', 1), 50)
       return dataPermohonan
    }

    async ditolak({ request } : HttpContext) {
        const dataPermohonan = await Permohonan.query()
            .preload('toVendor')
            .preload('toBank')
            .where('status', 'DITOLAK')
            .whereRaw('DATE(created_at) >= ?', [request.input('start_date', '2025-02-01')])
            .whereRaw('DATE(created_at) <= ?', [request.input('end_date', '2025-02-10')])
            .orderBy('updated_at', 'desc')
            .paginate(request.input('page', 1), 25)
        return dataPermohonan
    }

    async diterima({ request } : HttpContext) {
        const dataPermohonan = await Permohonan.query()
            .preload('toVendor')
            .preload('toBank')
            .where('status', 'SURETY_DONE')
            .whereRaw('DATE(created_at) >= ?', [request.input('start_date', '2025-02-01')])
            .whereRaw('DATE(created_at) <= ?', [request.input('end_date', '2025-02-10')])
            .orderBy('updated_at', 'desc')
            .paginate(request.input('page', 1), 25)
        return dataPermohonan
    }
}