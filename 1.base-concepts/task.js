"use strict";

function solveEquation(a, b, c) {
    let arr = [];
    // Вычисляем дискриминант
    let d = b ** 2 - 4 * a * c;

    if (d < 0) {
        // Если дискриминант меньше нуля, корней нет
        return arr;
    } else if (d === 0) {
        // Если дискриминант равен нулю, один корень
        let x = -b / (2 * a);
        arr.push(x);
    } else {
        // Если дискриминант больше нуля, два корня
        let x1 = (-b + Math.sqrt(d)) / (2 * a);
        let x2 = (-b - Math.sqrt(d)) / (2 * a);
        arr.push(x1, x2);
    }

    return arr;
}

// Пример использования:
console.log(solveEquation(1, 5, 4)); // [-1, -4]
console.log(solveEquation(1, 2, 1));  // [-1]
console.log(solveEquation(1, 2, 10)); // []*/


"use strict";

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    // Преобразуем процентную ставку из годовой в месячную
    let monthlyPercent = (percent / 100) / 12;

    // Рассчитываем тело кредита (сумма кредита минус первоначальный взнос)
    let loanBody = amount - contribution;

    // Если тело кредита 0, значит платить нечего
    if (loanBody <= 0) {
        return 0;
    }

    // Рассчитываем ежемесячный платёж по формуле
    let monthlyPayment = loanBody * (monthlyPercent + (monthlyPercent / (Math.pow((1 + monthlyPercent), countMonths) - 1)));

    // Общая сумма выплат (ежемесячный платёж умножаем на количество месяцев)
    let totalPayment = monthlyPayment * countMonths;

    // Округляем результат до двух знаков после запятой
    totalPayment = +totalPayment.toFixed(2);

    // Возвращаем общую сумму, которую нужно заплатить клиенту
    return totalPayment;
}

// Примеры использования функции
console.log(calculateTotalMortgage(10, 0, 50000, 12)); // 52749.53
console.log(calculateTotalMortgage(10, 1000, 50000, 12)); // 51694.54
console.log(calculateTotalMortgage(10, 0, 20000, 24)); // 22149.56
console.log(calculateTotalMortgage(10, 1000, 20000, 24)); // 21042.09
console.log(calculateTotalMortgage(10, 20000, 20000, 24)); // 0
console.log(calculateTotalMortgage(10, 0, 10000, 36)); // 11616.19
console.log(calculateTotalMortgage(15, 0, 10000, 36)); // 12479.52
