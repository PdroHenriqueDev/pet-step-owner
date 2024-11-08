export interface WalkProps {
  _id: string;
  dogWalker: {
    name: string;
    profileUrl?: string;
  };
  walk: {
    totalCost: number;
    durationMinutes: number;
  };
  startDate: Date | string;
}
