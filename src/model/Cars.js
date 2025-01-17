import ERROR_MESSAGE from '../error/message.js';
import { COMMA } from '../view/OutputView.js';
import Car from './Car.js';

class Cars {
  #cars;

  constructor(names) {
    const parsedNames = this.#parse(names);

    this.#validate(parsedNames);

    this.#cars = parsedNames.map((name) => new Car(name));
  }

  #parse(names) {
    return names.split(COMMA).map((name) => name.trim());
  }

  #validate(names) {
    const uniqueNames = new Set(names);

    if (uniqueNames.size !== names.length)
      throw new Error(`${ERROR_MESSAGE.duplicated} ${ERROR_MESSAGE.retry}`);
  }

  play() {
    this.#cars.forEach((car) => {
      car.forward();
    });

    return this.#cars.map((car) => ({
      name: car.getName(),
      location: car.getLocation(),
    }));
  }

  winners() {
    const maxLocation = Math.max(...this.#cars.map((car) => car.getLocation()));
    return this.#cars
      .filter((car) => car.getLocation() === maxLocation)
      .map((car) => car.getName());
  }
}

export default Cars;
