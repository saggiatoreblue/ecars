const sdk = require('@salesforce/salesforce-sdk');
const { LeaseCalculator } = require('lease-calculator');

/**
 * Describe Lease-calculator here.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param {import("@salesforce/salesforce-sdk").InvocationEvent} event:   represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param {import("@salesforce/salesforce-sdk").Context} context: represents the connection to Evergreen and your Salesforce org.
 * @param {import("@salesforce/salesforce-sdk").Logger} logger:  logging handler used to capture application logs and traces specific
 *                 to a given execution of a function.
 */
module.exports = function (event, context, logger) {
    console.log('test');
    console.log(event.data);
    const leaseCalculator = new LeaseCalculator();
    leaseCalculator.calculate({
        make: 'Toyota',
        msrp: event.data.msrp,
        sellingPrice: event.data.sellingPrice,
        rv: event.data.rv,
        isRVPercent: false,
        mf: event.data.mf,
        salesTax: event.data.salesTax,
        leaseTerm: event.data.leaseTerm,
        downPayment: event.data.downPayment,
        totalFees: event.data.totalFees
    });

    // Get the lease monthly payment
    const monthlyPayment = leaseCalculator.getMonthlyPayment();
    const totalLeaseCost = leaseCalculator.getTotalLeaseCost();
    const totalDriveOffPayment = leaseCalculator.getDriveOffPayment();
    const apr = leaseCalculator.getAPR();
    const msrpDiscount = leaseCalculator.getDiscountOffMsrpPercentage();
    const residual = leaseCalculator.getRVValue();

    console.log(totalLeaseCost);
    console.log(monthlyPayment);
    logger.info(
        `Invoking Lease-calculator with payload ${JSON.stringify(
            event.data || {}
        )}`
    );
    const response = {
        totalLeaseCost: totalLeaseCost,
        monthlyPayment: monthlyPayment,
        totalDriveOffPayment: totalDriveOffPayment,
        apr: apr,
        msrpDiscount: msrpDiscount,
        residual: residual
    };
    return response;
};
