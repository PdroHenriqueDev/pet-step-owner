export interface DogWalker {
  _id: string;
  name: string;
  rate: number;
  distance?: string;
  isOnline: boolean;
  date?: string;
  time?: string;
  profileUrl: string;
}
