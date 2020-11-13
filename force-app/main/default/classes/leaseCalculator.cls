public with sharing class leaseCalculator {

    // Annotate the method InvocableMethod and give it a label and description
    @InvocableMethod(label='Calculate Lease' description='Calculate auto lease costs')
    public static List<Response> execute(List<Request> requests) {
        
        // Create a list to hold the response object
        List<Response> responseWrapper = new List<Response>();

        // Iterate over the request object that is passed into the method
        for (Request req : requests) {

            // Serialize the request into a payload for the function
            String payload = JSON.serialize(req);

            // Instantiate the function
            functions.Function leaseCalculator = functions.Function.get('leaseCalculator');

            // Invoke the function
            functions.FunctionInvocation result = leaseCalculator.invoke(payload);

            // Process the response 
            String jsonResponse = result.getResponse();
            JSONParser parser = JSON.createParser(jsonResponse);
            Response response = (Response) parser.readValueAs(Response.class);

            // Add the response to the wrapper
            responseWrapper.add(response);
        }

        // Return the response to the flow
        return responseWrapper;
    }

    // ---------------------------------------

    // The request object that takes input from the flow
    public class Request {
        @InvocableVariable(label='Down Payment' required=true)
        public Decimal downPayment;
        @InvocableVariable(label='Lease Term' required=true)
        public Integer leaseTerm;
        @InvocableVariable(label='Make' required=true)
        public String make;
        @InvocableVariable(label='Money Factor' required=true)
        public Decimal mf;
        @InvocableVariable(label='MSRP' required=true)
        public Decimal msrp;
        @InvocableVariable(label='Residual Value' required=true)
        public Decimal rv;
        @InvocableVariable(label='Is RV Percent?' required=true)
        public Boolean isRVPercent;
        @InvocableVariable(label='Sales Tax' required=true)
        public Decimal salesTax;
        @InvocableVariable(label='Selling Price' required=true)
        public Decimal sellingPrice;
        @InvocableVariable(label='Total Fees' required=true)
        public Decimal totalFees;
    }

    // The response object that passes data to the flow
    public class Response {
        @InvocableVariable(label='Total Lease Cost')
        public String totalLeaseCost;
        @InvocableVariable(label='Monthly Payment')
        public String monthlyPayment;
        @InvocableVariable(label='Drive off Payment')
        public String totalDriveOffPayment;
        @InvocableVariable(label='APR')
        public String apr;
        @InvocableVariable(label='MSRP Discount')
        public String msrpDiscount;
        @InvocableVariable(label='Residual Value')
        public String residual;
    }
}
