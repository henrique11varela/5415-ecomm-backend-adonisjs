import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Checkout extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public products: any

  @column()
  public coupon: string

  @column()
  public total: number

  @column()
  public discountedTotal: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
