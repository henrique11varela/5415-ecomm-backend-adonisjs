import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

/**
 *  @swagger
 *    components:
 *      schemas:
 *        Product:
 *          type: object
 *          description: Entity to represent a product, use it to create a checkout. The products came from an external API
 *          properties:
 *            id:
 *              type: number
 *              example: 1
 *            name:
 *              type: string
 *              example: "Product 1"
 *            description:
 *              type: string
 *              example: "Description 1"
 *            image:
 *              type: string
 *              example: "https://via.placeholder.com/150"
 *            price:
 *              type: number
 *              example: 100
 *            quantity:
 *              type: number
 *              example: 10
 *          required:
 *            - name
 *            - description
 *            - image
 *            - price
 *            - quantity
 *
 */
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public price: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
