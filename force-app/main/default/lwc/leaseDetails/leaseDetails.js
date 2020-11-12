import { LightningElement, api } from 'lwc';

export default class LeaseDetails extends LightningElement {
    @api totalMonthlyPayment;
    @api totalDriveOffPayment;
    @api apr;
    @api totalLeaseCost;
    @api msrp;
    @api sellingCost;
    @api msrpDiscount;
    @api residual;
}