import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';



export default class ProductsController {
  /**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
  public async index({ response }: HttpContextContract) {
    try {
      const products = await Product.all()

      response.status(200).json(products)
    } catch (error) {
      response.status(500).json(error)
    }
  }
}
