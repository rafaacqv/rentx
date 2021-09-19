import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 1234,
      license_plate: "000",
      fine_amount: 1234,
      brand: "Car Brand",
      category_id: "0000",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car A",
        description: "Car description",
        daily_rate: 1234,
        license_plate: "000",
        fine_amount: 1234,
        brand: "Car Brand",
        category_id: "0000",
      });

      await createCarUseCase.execute({
        name: "Car B",
        description: "Car description",
        daily_rate: 1234,
        license_plate: "000",
        fine_amount: 1234,
        brand: "Car Brand",
        category_id: "0000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 1234,
      license_plate: "000-000",
      fine_amount: 1234,
      brand: "Car Brand",
      category_id: "0000",
    });

    expect(car.available).toBe(true);
  });
});
