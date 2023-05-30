import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

/**
 *@swagger
 *  components:
 *    schemas:
 *      Coupon:
 *        type: object
 *        description: Entity to represent a coupon, use it to apply discounts to the total of a checkout
 *        properties:
 *          id:
 *            type: number
 *            example: 1
 *          code:
 *            type: string
 *            example: "ABCDEFG"
 *          discount:
 *            type: number
 *            example: 10
 *          validFrom:
 *            type: string
 *            format: date-time
 *            example: "2021-01-01T00:00:00.000Z"
 *          validUntil:
 *            type: string
 *            format: date-time
 *            example: "2021-12-31T23:59:59.999Z"
 *          usageLimit:
 *            type: number
 *            example: 100
 *          usageCount:
 *            type: number
 *            example: 10
 *        required:
 *          - code
 *          - discount
 *          - validFrom
 *          - validUntil
 *          - usageLimit
 *          - usageCount
 */
export default class Coupon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public discount: number

  @column.dateTime()
  public validFrom: DateTime

  @column.dateTime()
  public validUntil: DateTime

  @column()
  public usageLimit: number

  @column()
  public usageCount: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
