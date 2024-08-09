import {Dog} from './dog';

export interface Owner {
  _id: string;
  name: string;
  email: string;
  longitude: number;
  latitude: number;
  dogs: Dog[];
  rate: number;
  defaultPayment: string;
  totalRatings: number;
  customerStripe: {
    id: string;
  };
}
