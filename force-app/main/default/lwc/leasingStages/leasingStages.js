import { LightningElement, api } from 'lwc';

const stages = {};

export default class LeasingStages extends LightningElement {
    stages = stages;
    @api flowStages;
    @api currentStage;

    connectedCallback() {
    }

    renderedCallback() {
        console.log(JSON.stringify(this.flowStages));
        console.log(JSON.stringify(this.currentStage));
        setTimeout(function () {
            this.dispatchEvent(new CustomEvent('notify', { bubbles: true }));
        }, 200);

    }
}
