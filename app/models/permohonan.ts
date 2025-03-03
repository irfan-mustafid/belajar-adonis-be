import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Vendor from './vendor.ts'
import Bank from './bank.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Permohonan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @column()
  declare tender_no: string
  @column()
  declare implement_no: string
  @column()
  declare down_payment_no: string
  @column()
  declare maintenance_no: string
  @column()
  declare nama_pekerjaan: string
  @column()
  declare tgl_pekerjaan: string
  @column()
  declare jangka_waktu_jaminan_start: string
  @column()
  declare jangka_waktu_jaminan_end: string
  @column()
  declare nilai_jaminan: number
  @column()
  declare insurance_id: number
  @column()
  declare vendor_id: number
  @column()
  declare nama_pic: string
  @column()
  declare phone_number_pic: string
  @column()
  declare email_pic: string
  @column()
  declare status: string
  @column()
  declare jenis: string
  @column()
  declare bowheer_id: number
  @column()
  declare alasan_tolak: string
  @column()
  declare insurance_premi_rp: number
  @column()
  declare insurance_admin_rp: number
  @column()
  declare insurance_materai_rp: number
  @column()
  declare biaya_aplikasi_rp: number
  @column()
  declare created_by: string
  @column()
  declare sisipkan_ematerai: string
  @column()
  declare type: string
  @column()
  declare tgl_adendum: string
  @column()
  declare no_adendum: string
  @column()
  declare permohonan_id: number
  @column()
  declare bank_id: number
  @column()
  declare penjamin: string
  @column()
  declare service_fee_auto_debit: string
  @column()
  declare web_admin_fee_auto_debit: string
  @column()
  declare norek: string
  @column()
  declare collateral: string
  @column()
  declare bank_provisi_percent: string
  @column()
  declare bank_admin_rp: number
  @column()
  declare bank_materai_rp: number
  @column()
  declare convenience_fee: number
  @column()
  declare bowheer_confirm_at: string

  @belongsTo(() => Vendor, { foreignKey: 'vendor_id' })
  public toVendor: BelongsTo<typeof Vendor>

  @belongsTo(() => Bank, { foreignKey: 'bank_id' })
  public toBank: BelongsTo<typeof Bank>
}