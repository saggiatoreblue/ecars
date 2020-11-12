import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';
import GenerateQRCode from '@salesforce/apex/QRCodeCreateService.GenerateQRCode'
export default class FlowFooter extends LightningElement {
    @api label;
    @api recordId;
    @api availableActions = [];

    handleGoNext() {
        if (this.availableActions.find(action => action === 'NEXT')) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        } else if(this.availableActions.find(action => action === 'FINISH')){
            this.sendEmail();
            const navigateFinishEvent = new FlowNavigationFinishEvent();
            this.dispatchEvent(navigateFinishEvent);
        }
    }

    sendEmail(){
        GenerateQRCode({recordId: this.recordId})
        .catch(error => {
            console.log('error:- '+error.body.message);
        });

    }

}