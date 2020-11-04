import { FastifyInstance } from 'fastify';
import RequestBodySchema from '../../schemas/leasing/requestBody.json';
import { RequestBodySchema as RequestBodySchemaInterface } from '../../types/leasing/requestBody';
import { LeaseCalculator } from 'lease-calculator';

export default async function (fastify: FastifyInstance, opts: any) {
    opts.schema = { body: RequestBodySchema };

    fastify.post<{
        Body: RequestBodySchemaInterface;
    }>('/', opts, async function (request) {
        try {
            const { log } = request;
            //const { body: data } = request;

            log.info('Calculating financing...');

            const leaseCalculator = new LeaseCalculator();
            leaseCalculator.calculate({
                // Make of the vehicle, for calculating manufacturer-based fees
                make: 'Toyota',
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
                totalFees: 1200
            });

            const result = await leaseCalculator.getMonthlyPayment();
            if (result.length > 0) {
                console.log(result);
            }
            return JSON.stringify({ success: true });
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    });
}
