export interface AddonData {

  name: string;
  description: string;
  price:number

}

export type CreateAddonResponse = {
  message: string;
  data?: AddonData;
};
