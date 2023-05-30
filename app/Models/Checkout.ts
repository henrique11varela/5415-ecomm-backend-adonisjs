import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

/**
 *  @swagger
 *    components:
 *      schemas:
 *        Checkout:
 *          type: object
 *          description: Entity to represent a checkout, use it as a log of the checkout and as proof of successful payment
 *          properties:
 *            id:
 *              type: number
 *              example: 1
 *            products:
 *              type: jsonb
 *              example: '[{"id":1,"quantity":10},{"id":2,"quantity":20}]]'
 *            coupon:
 *              type: string
 *              example: "ABCDEFG"
 *            total:
 *              type: number
 *              example: 100
 *            discountedTotal:
 *              type: number
 *              example: 90
 *          required:
 *            - products
 *            - coupon
 *            - total
 *            - discountedTotal
 */
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

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
