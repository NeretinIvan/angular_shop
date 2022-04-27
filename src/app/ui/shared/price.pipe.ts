import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currency: "RUB" | "USD"): string {
    if (!value) return "";

    let valueAsString = value.toString();
    const pointPosition = valueAsString.indexOf(".") !== -1 ? valueAsString.indexOf(".") : valueAsString.length;

    const numbersAfterPoint = 2;
    if (pointPosition < valueAsString.length - numbersAfterPoint) {
      valueAsString = valueAsString.slice(0, pointPosition + numbersAfterPoint + 1);
    }

    const step = 3;
    for (let i = pointPosition - step; i > 0; i -= step) {
      valueAsString = insert(valueAsString, " ", i);
    }

    if (currency === "RUB") {
      valueAsString += " ₽";
    }

    if (currency === "USD") {
      valueAsString += "$";
    }

    return valueAsString;
  }
}

function insert(str: string, valueAsString: string, index: number): string {
  if (index === 0) return valueAsString + str;
  if (index >= str.length) return str + valueAsString;
  return str.slice(0, index) + valueAsString + str.slice(index, str.length);
}