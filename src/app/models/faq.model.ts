export interface IFaq {
Answer: any;
    _id?: string;
    question:string;
    answer:string
}

export interface IFaqRes {
    msg:string;
    data:IFaq[];
}
