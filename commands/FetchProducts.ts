import { BaseCommand } from '@adonisjs/core/build/standalone';
import Env from '@ioc:Adonis/Core/Env';
import Product from 'App/Models/Product';
import axios from 'axios';
import _ from 'lodash';


export default class FetchProducts extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fetch:products'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    try {
      const firstProduct = await Product.first();

      if (firstProduct) {
        this.logger.info(`There are products in the database!`);
        return;
      }

      this.logger.info(`Fetching products from FakeStoreAPI for catefory ${Env.get('STORE_THEME')}!`)
      const response = await axios.get(`https://fakestoreapi.com/products/category/${Env.get('STORE_THEME')}`)
      const productsAPI = response.data
      this.logger.info(`Found ${productsAPI.length} products!`)

      const products = productsAPI.map((p: any) => ({
        name: p.title,
        description: p.description,
        image: p.image,
        price: p.price,
        quantity: _.random(1, 20)
      }))

      const savedProducts = await Product.createMany(products)
      this.logger.info(`Saved ${savedProducts.length} products!`)

    } catch (error) {
      this.logger.error(error)
    }

  }
}
