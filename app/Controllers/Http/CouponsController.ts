// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Coupon from 'App/Models/Coupon';
import { DateTime } from 'luxon';

export default class CouponsController {
  public async checkCoupon({ request, response }: HttpContextContract) {
    try {

      const { couponCode } = request.body();

      if (!couponCode) throw new Error('Coupon not found');
      if (typeof couponCode !== 'string') throw new Error('Coupon not found');
      if (couponCode.length !== 7) throw new Error('Coupon not found');
      if (!couponCode.match(/^[A-Z]{7}$/)) throw new Error('Coupon not found');

      // get coupon from database by code
      const coupon = await Coupon.findBy('code', couponCode);

      if (!coupon) throw new Error('Coupon not found');
      if (coupon.validUntil < DateTime.now()) throw new Error('Coupon is expired');
      if (coupon.usageCount >= coupon.usageLimit) throw new Error('Coupon usage limit reached');

      return response.ok({ success: true, message: 'Coupon is valid', discount: coupon.discount });

    } catch (error) {
      // return error message
      return response.badRequest({ error: error.message });
    }
  }
}
