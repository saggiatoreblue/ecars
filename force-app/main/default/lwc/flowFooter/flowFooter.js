import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';
import sendNotification from '@salesforce/apex/NewCarNotificationService.sendNotification'
export default class FlowFooter extends LightningElement {
    @api label;
    @api recordId;
    @api availableActions = [];

    handleGoNext() {
        if (this.availableActions.find(action => action === 'NEXT')) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        } else if(this.availableActions.find(action => action === 'FINISH')){
            this.sendNewCarNotification();
            const navigateFinishEvent = new FlowNavigationFinishEvent();
            this.dispatchEvent(navigateFinishEvent);
        }
    }

    sendNewCarNotification(){
        sendNotification({recordId: this.recordId})
        .catch(error => {
            console.log('error:- '+error.body.message);
        });

    }

}