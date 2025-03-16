import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Bank extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string
  @column()
  declare address: string
  @column()
  declare province_id: number
  @column()
  declare regency_id: number
  @column()
  declare phone: string
  @column()
  declare email: string
  @column()
  declare sla_penawaran: number
  @column()
  declare sla_uang_muka: number
  @column()
  declare sla_pelaksanaan: number
  @column()
  declare sla_pemeliharaan: number
  @column()
  declare file_id_tnc: number
  @column()
  declare tnc: string
  @column()
  declare file_id_spkmgr: number
  @column()
  declare spkmgr: string
  @column()
  declare is_active: string
  @column()
  declare catatan: string
  @column()
  declare keterangan: string
  @column()
  declare biaya_admin: number
}
