export interface CostDataProps {
  totalCost: number;
  dogPrice: {
    dogs: number;
    price: number;
    totalDogCost: number;
  };
  walkPrice: {
    time: number;
    price: number;
  };
}
