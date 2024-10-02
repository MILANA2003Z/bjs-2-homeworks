"use strict";

function getArrayParams(...arr) {
  // Переменные для минимального, максимального и суммы элементов
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  // Проход по массиву с обновлением значений min, max и суммы
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
    sum += arr[i];
  }

  // Вычисление среднего значения
  let avg = sum / arr.length;
  avg = +avg.toFixed(2); // Округляем до 2 знаков после запятой и преобразуем в число

  // Возвращаем объект с результатами
  return { min: min, max: max, avg: avg };
}

// Примеры вызовов
console.log(getArrayParams(-99, 99, 10));  // { min: -99, max: 99, avg: 3.33 }
console.log(getArrayParams(1, 2, 3, -100, 10));  // { min: -100, max: 10, avg: -16.80 }
console.log(getArrayParams(5));  // { min: 5, max: 5, avg: 5 }

//Насадка для суммирования элементов
function summElementsWorker(...arr) {
  if (arr.length === 0) return 0; // Если массив пуст
  return arr.reduce((sum, elem) => sum + elem, 0); // Суммирование элементов
}

// Насадка для вычисления разницы максимального и минимального элементов
function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) return 0; // Если массив пуст
  let max = Math.max(...arr); // Находим максимум
  let min = Math.min(...arr); // Находим минимум
  return max - min; // Возвращаем разницу
}

// Насадка для вычисления разницы сумм чётных и нечётных элементов
function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) return 0; // Если массив пуст

  let sumEvenElement = 0; // Сумма чётных элементов
  let sumOddElement = 0; // Сумма нечётных элементов

  // Перебираем элементы массива
  arr.forEach((elem) => {
    if (elem % 2 === 0) {
      sumEvenElement += elem; // Если элемент чётный
    } else {
      sumOddElement += elem; // Если элемент нечётный
    }
  });

  return sumEvenElement - sumOddElement; // Разница сумм чётных и нечётных
}

// Насадка для вычисления среднего значения чётных элементов
function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) return 0; // Если массив пуст

  let sumEvenElement = 0; // Сумма чётных элементов
  let countEvenElement = 0; // Количество чётных элементов

  // Перебираем элементы массива
  arr.forEach((elem) => {
    if (elem % 2 === 0) {
      sumEvenElement += elem; // Добавляем чётный элемент к сумме
      countEvenElement++; // Увеличиваем счётчик чётных элементов
    }
  });

  return countEvenElement === 0 ? 0 : sumEvenElement / countEvenElement; // Возвращаем среднее значение
}

// Примеры вызовов
console.log(summElementsWorker()); // 0
console.log(summElementsWorker(10, 10, 11, 20, 10)); // 61

console.log(differenceMaxMinWorker()); // 0
console.log(differenceMaxMinWorker(10, 10, 11, 20, 10)); // 10

console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17)); // 53
console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // -269

console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9)); // 5
console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // 38


// Функция-агрегатор makeWork:
function makeWork(arrOfArr, func) {
  let maxWorkerResult = -Infinity;
  
  for (let arr of arrOfArr) {
    const result = func(...arr);
    if (result > maxWorkerResult) {
      maxWorkerResult = result;
    }
  }
  
  return maxWorkerResult;
}

// Примеры:
const arr = [[10, 10, 11, 20, 10], [67, 10, 2, 39, 88], [72, 75, 51, 87, 43], [30, 41, 55, 96, 62]];

console.log(makeWork(arr, summElementsWorker)); // максимум из 61, 206, 328, 284 => 328
console.log(makeWork(arr, differenceMaxMinWorker)); // максимум из 10, 86, 44, 66 => 86
console.log(makeWork(arr, differenceEvenOddWorker)); // максимум из 39, -6, -184, 92 => 92
console.log(makeWork(arr, averageEvenElementsWorker)); // максимум из 12.5, 33.333, 72, 62.666 => 72
