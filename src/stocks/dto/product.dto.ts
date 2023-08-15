export class Products{
        name: string;
        amount: number;
        category: string;
        lastPurchase: LastPurchase;
}

export class LastPurchase{
    amount: number;
    unitaryPrice: number;
    date: Date;
}