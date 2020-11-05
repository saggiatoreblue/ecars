import { InvocationEvent, Context, Logger } from '@salesforce/salesforce-sdk';
const LeaseCalculator = require('lease-calculator');

/**
 * Describe Leasing-calc here.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event:   represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Evergreen and your Salesforce org.
 * @param logger:  logging handler used to capture application logs and traces specific
 *                 to a given execution of a function.
 */
 export default async function execute(event: InvocationEvent, context: Context, logger: Logger): Promise<any> {
    logger.info(`Invoking Leasing-calc with payload ${JSON.stringify(event.data || {})}`);

    const leaseCalculator = new LeaseCalculator();
    console.log(leaseCalculator);
    /*
    leaseCalculator.calculate({
      // Make of the vehicle, for calculating manufacturer-based fees
      make: "Toyota",
      // Required, MSRP of the vehicle
      msrp: 23000,
      // Required, negotiated price of the vehicle
      sellingPrice: 21000,
      // Required, Residual value of the vehicle
      rv: 13110,
      // Whether the RV is an absolute value or a percentage of MSRP. Default: true
      isRVPercent: false,
      // Required, The money factor of the lease
      mf: 0.00125,
      // The state's sales tax in percentage. Default: 0%.
      salesTax: 6.25,
      // Total fees of the lease. Default: 0.
      totalFees: 1200,
    });
    // Get the lease monthly payment
    const monthlyPayment = leaseCalculator.getMonthlyPayment();
    console.log('+++++', monthlyPayment);
    */

    const results = await context.org.data.query('SELECT Id, Name FROM Account');
    logger.info(JSON.stringify(results));

    return results;
}
