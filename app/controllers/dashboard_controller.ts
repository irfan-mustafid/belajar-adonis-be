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
  'IJIN_PRINSIP_DITOLAK',
]

export default class DashboardController {
  async summary({}: HttpContext) {
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
      diterima: countProsesDiterima[0].$extras.total,
    }
    return summary
  }

  private async getDataPermohonan(
    request: HttpContext['request'],
    status: string[],
    pageSize: number
  ) {
    const dataPermohonan = await Permohonan.query()
      .preload('toVendor')
      .preload('toBank')
      .whereIn('status', status)
      .whereRaw('DATE(created_at) >= ?', [request.input('start_date', '2025-02-01')])
      .whereRaw('DATE(created_at) <= ?', [request.input('end_date', '2025-02-28')])
      .orderBy('updated_at', 'desc')
      .paginate(request.input('page', 1), pageSize)
    return dataPermohonan
  }

  async proses({ request }: HttpContext) {
    return this.getDataPermohonan(request, statusPermohonan, 50)
  }

  async ditolak({ request }: HttpContext) {
    return this.getDataPermohonan(request, ['DITOLAK'] as string[], 25)
  }

  async diterima({ request }: HttpContext) {
    return this.getDataPermohonan(request, ['SURETY_DONE'] as string[], 25)
  }
}
