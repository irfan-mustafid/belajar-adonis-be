import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vendor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string
  @column()
  declare telp: string
  @column()
  declare email: string
  @column()
  declare province_id: number
  @column()
  declare regency_id: number
  @column()
  declare kode_pos: string
  @column()
  declare alamat: string
  @column()
  declare npwp: string
}
