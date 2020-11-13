import { LightningElement, api, wire } from 'lwc';
import getLeadDetails from '@salesforce/apex/CarConfirmationController.getLeadDetails'

export default class CarConfirmation extends LightningElement {
    @api recordId;
    lead = {};
    error;
    @wire(getLeadDetails, { recordId: '$recordId' })
    carOptions({ error, data }) {
        if (data) {
            this.selectedRange = data.Range__c;
            this.lead = {
                name: data.Lead__r.Name,
                email: data.Lead__r.Email,
                phone: data.Lead__r.MobilePhone
            };
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }

}
