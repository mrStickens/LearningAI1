class MatrixCalculator {
    constructor() {
        this.matrix = Array(3).fill().map(() => Array(3).fill(0));
    }

    sumOfDigits(number) {
        return String(number)
            .split('')
            .filter(ch => /\d/.test(ch))
            .reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    reduceToSingleDigit(num) {
        while (num > 9) {
            num = this.sumOfDigits(num);
        }
        return num;
    }

    calculateMatrix(birthdate) {
        // Преобразуем дату в формат DDMMYYYY
        const dateStr = birthdate.split('-').reverse().join('');
        
        // Извлекаем день, месяц, год
        const day = parseInt(dateStr.substring(0, 2));
        const month = parseInt(dateStr.substring(2, 4));
        const year = parseInt(dateStr.substring(4));

        // Массив всех цифр даты рождения
        const digitsOfBirthdate = dateStr.split('').map(Number);

        // Расчет S1 (сумма всех цифр)
        const S1 = digitsOfBirthdate.reduce((sum, digit) => sum + digit, 0);

        // Расчет S2 (свёртка S1)
        const S2 = this.reduceToSingleDigit(S1);

        // Расчет D (S1 - 2 * день рождения)
        const D = S1 - 2 * day;

        // Расчет S3 (свёртка D)
        const S3 = this.reduceToSingleDigit(D);

        // Формируем итоговый набор цифр
        const finalDigits = [
            ...digitsOfBirthdate,
            ...String(S1).split('').map(Number),
            S2,
            ...String(D).split('').map(Number),
            S3
        ].filter(x => x !== 0); // Убираем нули

        // Подсчёт вхождений каждой цифры
        const counts = {};
        for (let i = 1; i <= 9; i++) {
            counts[i] = finalDigits.filter(x => x === i).length;
        }

        // Формирование матрицы
        this.matrix = [
            [counts[1] || 0, counts[2] || 0, counts[3] || 0],
            [counts[4] || 0, counts[5] || 0, counts[6] || 0],
            [counts[7] || 0, counts[8] || 0, counts[9] || 0]
        ];

        return {
            matrix: this.matrix,
            additional: {
                S1,
                S2,
                D,
                S3,
                dateStr,
                day,
                month,
                year
            }
        };
    }

    getInterpretation() {
        // Здесь можно добавить интерпретацию значений матрицы
        let interpretation = [];
        
        // Пример интерпретации (можно расширить)
        const totalNumbers = this.matrix.flat().reduce((sum, num) => sum + num, 0);
        interpretation.push(`Всего чисел в матрице: ${totalNumbers}`);

        // Проверка на характер
        const firstRow = this.matrix[0];
        const characterSum = firstRow.reduce((sum, num) => sum + num, 0);
        interpretation.push(`Сила характера: ${characterSum}`);

        // Проверка на энергетику
        const secondRow = this.matrix[1];
        const energySum = secondRow.reduce((sum, num) => sum + num, 0);
        interpretation.push(`Энергетический потенциал: ${energySum}`);

        // Проверка на интуицию
        const thirdRow = this.matrix[2];
        const intuitionSum = thirdRow.reduce((sum, num) => sum + num, 0);
        interpretation.push(`Уровень интуиции: ${intuitionSum}`);

        return interpretation;
    }
}

// Экспорт для использования в других модулях
window.MatrixCalculator = MatrixCalculator;
