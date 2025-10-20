export interface IncentiveData {

  name: string;
  discount_percentage:number

}

export type CreateIncentiveResponse = {
  message: string;
  data?: IncentiveData;
};
