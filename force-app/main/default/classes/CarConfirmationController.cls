public with sharing class CarConfirmationController {

    @AuraEnabled(Cacheable = true)
    public static Car_Configuration__c getLeadDetails(Id recordId){
        Car_Configuration__c config = [SELECT Id, Lead__r.Name, Lead__r.Email, Lead__r.MobilePhone FROM Car_Configuration__c WHERE Id =: recordId LIMIT 1];
        return config;
    }

}
