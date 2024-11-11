import {WalkEvents} from '../enums/walk';
import {Dog} from './dog';

export interface Owner {
  _id?: string;
  name?: string;
  lastName?: string;
  email: string;
  phone: string;
  document: string;
  deviceToken?: string;
  profileUrl?: string;
  password?: string | null;
  dogs?: Dog[];
  rate?: number;
  defaultPayment?: string;
  totalRatings?: number;
  currentWalk?: {
    requestId: string;
    status: WalkEvents;
  } | null;
  customerStripeId?: string;
  confirmPassword?: string;
  address?: {
    zipCode?: string;
    street: string;
    houseNumber: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  pendingReview?: {
    reviewedId: string;
    profileUrl: string;
    requestId: string;
  } | null;
}

export interface FieldOwnerProps {
  id: string;
  label: string;
  value?: string | null | Dog[];
  hide?: boolean;
}

export interface OwnerForm {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  zipCode: string;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
}
