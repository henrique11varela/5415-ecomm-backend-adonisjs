import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Coupon from 'App/Models/Coupon';
import faker from 'faker';

import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  public async run() {
    const discountOptions = [10, 20, 30, 40, 50, 60, 75];

    const generateRandomCode = (): string => {
      return faker.random.alpha(7).toUpperCase();
    };

    const generateRandomNumber = (min: number, max: number): number => {
      return faker.random.number({ min, max });
    };

    const generateRandomDateTime = (start: DateTime, end: DateTime): DateTime => {
      const startTime = start.toMillis();
      const endTime = end.toMillis();
      const randomTime = faker.random.number({ min: startTime, max: endTime });
      return DateTime.fromMillis(randomTime).startOf('day');
    };

    const currentDate = DateTime.now();
    const maxMonths = 3;
    const maxWeeks = 6;

    const coupons: Object[] = [];

    for (let i = 0; i < 7; i++) {
      const code = generateRandomCode();
      const discount = discountOptions[i % discountOptions.length];
      const usageLimit = generateRandomNumber(3, 12);
      const usageCount = generateRandomNumber(0, usageLimit);
      const validFrom = generateRandomDateTime(
        currentDate,
        currentDate.plus({ months: maxMonths, weeks: maxWeeks })
      );
      const validUntil = validFrom.plus({ months: 1, weeks: 2 }); // 1 month and 2 weeks period

      coupons.push({
        code,
        discount,
        validFrom,
        validUntil,
        usageLimit,
        usageCount,
      });
    }

    await Coupon.createMany(coupons);
  }
}
