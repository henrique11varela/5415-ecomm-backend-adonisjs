import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';



export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    try {
      const products = await Product.all()

      response.status(200).json(products)
    } catch (error) {
      response.status(500).json(error)
    }
  }
}
