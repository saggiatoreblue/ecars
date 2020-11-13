public with sharing class QRCodeCreateService {
    @AuraEnabled
    public static void GenerateQRCode(Id recordId) {
        Car_Configuration__c config = getCarConfigurationDetails(recordId);
        String colorCode = getColorCode(recordId);
        String payload = generatePayload(recordId, config, colorCode);
        functions.Function qrCodeFunction = functions.Function.get('QRCodeGenerator');
        qrCodeFunction.invoke(payload, new MyCallback());
    }

    public class MyCallback implements functions.FunctionCallback {
        public void handleResponse(functions.FunctionInvocation result) {
            String response = result.getResponse();
            System.debug('Got response ' + response);
        }
    }

    public class Payload {
        public String url;
        public String toAddress;
        public String id;
        public String carImage;
        public String firstName;
    }

    public static String generatePayload(Id recordId, Car_Configuration__c config, String colorCode){
        Payload payload = new Payload();
        payload.toAddress = config.Lead__r.Email;
        payload.Id = recordId;
        payload.carImage = 'https://sfdc-demo.s3-us-west-1.amazonaws.com/ecars/car_' + colorCode + '.jpg';
        payload.firstName = config.Lead__r.FirstName;
        payload.url = URL.getSalesforceBaseUrl().toExternalForm() + '/' + recordId;
        return JSON.serialize(payload);
    }

    public static Car_Configuration__c getCarConfigurationDetails(Id recordId) {
        Car_Configuration__c config = [
            SELECT Lead__r.Email, Lead__r.FirstName
            FROM Car_Configuration__c
            WHERE Id = :recordId
        ];
        return config;
    }

    public static String getColorCode(Id recordId) {
        Car_Options__c option = [SELECT Exterior_Color__c FROM Car_Options__c WHERE Car_Configuration__c = :recordId];
        String colorCode = option?.Exterior_Color__c?.split('_')[1]?.toLowercase();
        return colorCode;
    }

}
