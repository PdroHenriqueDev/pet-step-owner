export interface CostDataProps {
  costDetails: {
    totalCost: string;
    dogPrice: {
      numberOfDogs: number;
      pricePerDog: number;
      totalDogCost: string;
    };
    walkPrice: {
      durationMinutes: number;
      price: number;
    };
  };
  requestId: string;
}
