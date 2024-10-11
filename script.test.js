import { changeNumbers } from "./script";
import { expect, describe, test } from "@jest/globals";

describe("changeNumbers", () => {
  test("번호가 바뀐당", () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    const numbersCopy = numbers.slice();
    expect(changeNumbers(numbers)).not.toEquals(numbersCopy);
  });
});
