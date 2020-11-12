import { LightningElement, api } from 'lwc';
import pulsarLogo from '@salesforce/resourceUrl/pulsarLogo';

export default class FlowHeader extends LightningElement {
    @api title;
    pulsarLogo = pulsarLogo;
}