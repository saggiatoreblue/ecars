export interface RequestBodySchema {
    msrp?: number;
    sellingPrice?: number;
    rv?: number;
    isRVPercent?: boolean;
    mf?: number;
    salesTax?: number;
    totalFees?: number;
    make: 'Acura' | 'Alfa Romeo' | 'Pulsar Red' | 'Deep Blue' | 'Modern Green';
}
