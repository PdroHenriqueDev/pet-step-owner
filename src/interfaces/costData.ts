export interface CostDataProps {
  totalCost: number;
  dogPrice: {
    numberOfDogs: number;
    pricePerDog: number;
    totalDogCost: number;
  };
  walkPrice: {
    durationMinutes: number;
    price: number;
  };
}
