import { LightningElement, track, api } from 'lwc';

export default class CarLocator extends LightningElement {
    @api recordId;
    @track mapMarkers = [
        {
            location: {
                // Location Information
                City: 'Las Vegas',
                Country: 'USA',
                PostalCode: '89117',
                State: 'NV',
                Street: '7150 W Sahara Ave',
            },

            // For onmarkerselect
            value: 'SF1',

            // Extra info for tile in list & info window
            icon: 'standard:task2',
            title: 'Pulsar of Las Vegas', // e.g. Account.Name
            description: 'Available: 3',
        },
        {
            location: {
                // Location Information
                City: 'Las Vegas',
                Country: 'USA',
                PostalCode: '89149',
                State: 'NV',
                Street: '6200 Centennial Center Blvd',
            },

            // For onmarkerselect
            value: 'SF2',

            icon: 'standard:task2',
            title: 'Centennial Pulsar',
            description: 'Available: 2',
        },
        {
            location: {
                // Location Information
                City: 'Las Vegas',
                Country: 'USA',
                PostalCode: '89118',
                State: 'NV',
                Street: '6825 Redwood St.',
            },

            // For onmarkerselect
            value: 'SF3',

            icon: 'standard:first_non_empty',
            title: 'ABC Pulsar',
            description: 'Available: 0 **ON ORDER**',
        },
        {
            location: {
                // Location Information
                City: 'Henderson',
                Country: 'USA',
                PostalCode: '89015',
                State: 'NV',
                Street: '460 Boulder Hwy',
            },

            // For onmarkerselect
            value: 'SF4',

            icon: 'standard:task2',
            title: 'Henderson Pulsar',
            description: 'Available: 1',
        },


    ];
    @track selectedMarkerValue = 'SF1';

    handleMarkerSelect(event) {
        this.selectedMarkerValue = event.target.selectedMarkerValue;
    }
}