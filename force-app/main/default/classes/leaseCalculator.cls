public with sharing class leaseCalculator {
    // Annotate the method InvocableMethod and give it a label and description
    @InvocableMethod(
        label='Calculate Lease'
        description='Calculate auto lease costs'
    )
    public static List<Response> execute(List<Request> requests) {

        // Create a list to hold the response object
        List<Response> responseWrapper = new List<Response>();

        // Iterate over the request object that is passed into the method
        for (Request req : requests) {
            Payload payload = new Payload();
            payload.make = req.make;
            payload.msrp = req.msrp;
            payload.sellingPrice = req.sellingPrice;
            payload.rv = req.rv;
            payload.mf = req.mf;
            payload.salesTax = req.salesTax;
            payload.totalFees = req.totalFees;
            payload.leaseTerm = req.leaseTerm;
            payload.downPayment = req.downPayment;
            String jsonPayload = JSON.serialize(payload);
            system.debug(jsonPayload);
            functions.Function leaseCalculator = functions.Function.get('leaseCalculator');
            functions.FunctionInvocation result = leaseCalculator.invoke(
                JSON.serialize(payload)
            );
            String jsonResponse = result.getResponse();
            system.debug(result.getResponse());
            system.debug(jsonResponse);
            JSONParser parser = JSON.createParser(jsonResponse);
            Response response = (Response) parser.readValueAs(Response.class);
            responseWrapper.add(response);
        }

        // Return the response to the flow
        return responseWrapper;
    }

    // ---------------------------------------

    // The request object that takes input from the flow
    public class Request {
        @InvocableVariable(label='Make' required=true)
        public String make;
        @InvocableVariable(label='MSRP' required=true)
        public Decimal msrp;
        @InvocableVariable(label='Selling Price' required=true)
        public Decimal sellingPrice;
        @InvocableVariable(label='Residual Value' required=true)
        public Decimal rv;
        @InvocableVariable(label='Money Factor' required=true)
        public Decimal mf;
        @InvocableVariable(label='Sales Tax' required=true)
        public Decimal salesTax;
        @InvocableVariable(label='Total Fees' required=true)
        public Decimal totalFees;
        @InvocableVariable(label='Lease Term' required=true)
        public Integer leaseTerm;
        @InvocableVariable(label='Down Payment' required=true)
        public Decimal downPayment;

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

    public class Payload {
        public String make;
        public Decimal msrp;
        public Decimal sellingPrice;
        public Decimal rv;
        public Decimal mf;
        public Decimal salesTax;
        public Decimal totalFees;
        public Integer leaseTerm;
        public Decimal downPayment;
    }
}
