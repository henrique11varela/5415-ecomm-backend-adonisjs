import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';


export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    Product.all().then((products) => {
      ctx.response.status(200).json(products)
    }).catch((error) => {
      ctx.response.status(500).json(error)
    })
  }
}
