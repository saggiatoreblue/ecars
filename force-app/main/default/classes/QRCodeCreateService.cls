public with sharing class QRCodeCreateService {
    @AuraEnabled
    public static void GenerateQRCode(Id recordId) {
        Car_Configuration__c config = [
            SELECT Lead__r.Email
            FROM Car_Configuration__c
            WHERE Id = :recordId
        ];

        Car_Options__c option = [SELECT Exterior_Color__c FROM Car_Options__c WHERE Car_Configuration__c =: recordId];
        String colorCode = option.Exterior_Color__c.split('_')[1].toLowercase();
        system.debug(colorCode);
        Payload payload = new Payload();
        payload.toAddress = config.Lead__r.Email;
        payload.Id = recordId;
        payload.carImage = 'https://sfdc-demo.s3-us-west-1.amazonaws.com/ecars/car_'+colorCode+'.jpg';
        payload.url = 
            URL.getSalesforceBaseUrl().toExternalForm() +
            '/' +
            recordId;
            functions.Function qrCodeFunction = functions.Function.get('QRCodeGenerator');
            functions.FunctionInvocation invocation = qrCodeFunction.invoke( JSON.serialize(payload));
            String jsonResponse = invocation.getResponse();
            System.debug('Got response ' + jsonResponse);
        }

    /*
    public static String getLeadEmail(Id recordId){
      Car_Configuration__c config = [SELECT Lead__r.Email FROM Car_Configuration__c WHERE Id =: recordId];
      return config?.Lead__r.Email;
    }
*/
    public class MyCallback implements functions.FunctionCallback {
        public void handleResponse(functions.FunctionInvocation result) {
            // Handle result of function invocation
            // ...
        }
    }

    public class Payload {
        public String url;
        public String toAddress;
        public String id;
        public String carImage;
    }
}
