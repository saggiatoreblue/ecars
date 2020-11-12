import { LightningElement, api } from 'lwc';

export default class PriceCalculator extends LightningElement {
    @api msrp;
    @api leaseTerm;
    @api sellingPrice;
    @api rv;
    @api mf;
    @api salesTax;
    @api totalFees;
    @api downPayment;

    handleInputChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        console.log(event.target.value);
        switch (name) {
            case 'msrp':
                this.msrp = value;
                break;
            case 'sellingPrice':
                this.sellingPrice = value;
                break;
            case 'rv':
                this.rv = value;
                break;
            case 'salesTax':
                this.salesTax = value;
                break;
            case 'downPayment':
                this.downPayment = value;
                break;
            default:
                break;
        }
    }

    get options() {
        return [
            { label: '24', value: '24' },
            { label: '36', value: '36' },
            { label: '48', value: '48' },
            { label: '60', value: '60' }
        ];
    }
}
