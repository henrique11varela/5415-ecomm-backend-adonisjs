// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Coupon from 'App/Models/Coupon';
import { DateTime } from 'luxon';

export default class CouponsController {
  /**
 * @swagger
 * /check-coupon:
 *   post:
 *     tags:
 *       - Coupons
 *     description: Check if a coupon is valid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               couponCode:
 *                 type: string
 *                 example: "ABCDEFG"
 *             required:
 *               - couponCode
 *     responses:
 *       200:
 *         description: Coupon is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Coupon is valid"
 *                 discount:
 *                   type: number
 *                   example: 10
 *       400:
 *         description: Coupon not found or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Coupon not found or invalid"
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
