import {Dog} from './dog';

export interface Owner {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string | null;
  longitude: number;
  latitude: number;
  dogs: Dog[];
  rate: number;
  defaultPayment: string;
  totalRatings: number;
  currentWalk: {
    requestId: string;
    status: string;
  };
  customerStripe: {
    id: string;
  };
}

export interface FieldOwnerProps {
  id: string;
  label: string;
  value?: string | null | Dog[];
  hide?: boolean;
}
