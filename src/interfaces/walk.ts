export interface WalkProps {
  _id: string;
  dogWalker: {
    name: string;
    profileUrl: string;
  };
  price: number;
  startDate: Date | string;
}
