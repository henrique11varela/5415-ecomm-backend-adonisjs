import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Checkout from 'App/Models/Checkout';
import Coupon from 'App/Models/Coupon';
import Product from 'App/Models/Product';
import { DateTime } from 'luxon';

export default class CheckoutsController {
  //checkout
  public async store({ request, response }: HttpContextContract) {
    try {
      const { products, coupon } = request.all()
      const productsIdList = products.map((product: any) => product.id)

      //this 2 queries could be done in parallel
      const dbProducts = await Product.query().whereIn('id', productsIdList).exec()
      if (dbProducts.length !== products.length) throw new Error('Some products were not found')
      if (dbProducts.some((product: any) => product.quantity === 0)) throw new Error('Some products are out of stock')

      let dbCoupon: Coupon | null = null

      if (coupon) {
        dbCoupon = await Coupon.findByOrFail('code', coupon.code)
        if (dbCoupon.usageCount >= dbCoupon.usageLimit) throw new Error('Coupon usage limit reached')
        if (dbCoupon.validFrom > DateTime.now()) throw new Error('Coupon is not valid yet')
        if (dbCoupon.validUntil < DateTime.now()) throw new Error('Coupon is expired')
      }

      let total = 0
      let discountedTotal = 0

      dbProducts.reduce((acc: number, product: any) => {
        const productQuantity = products.find((p: any) => p.id === product.id)?.quantity
        if (productQuantity) {
          total += product.price * productQuantity
        }
        return total
      }, 0)

      //update products quantity
      await Promise.all(products.map(async (product: any) => {
        const dbProduct = dbProducts.find((dbProduct: any) => dbProduct.id === product.id)
        if (dbProduct) {
          dbProduct.quantity -= product.quantity
          await dbProduct.save()
        }
      }))
      if (dbCoupon) {
        discountedTotal = total - (total * dbCoupon.discount) / 100

        dbCoupon.usageCount += 1
        await dbCoupon.save()
      }
      //implement transaction here (Stripe, Paypal, etc)

      const checkout = await Checkout.create({ products, coupon, total, discountedTotal })

      return response.ok({ success: true, message: 'Checkout successful', checkout })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}
