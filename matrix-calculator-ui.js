class MatrixUI {
    constructor() {
        this.calculator = new MatrixCalculator();
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Получаем ссылки на DOM элементы
        this.birthdateInput = document.getElementById('birthdate');
        this.calculateButton = document.getElementById('calculate');
        this.resultSection = document.querySelector('.result-section');
        this.matrixGrid = document.querySelector('.matrix-grid');
        this.interpretation = document.querySelector('.interpretation');
    }

    attachEventListeners() {
        this.calculateButton.addEventListener('click', () => this.handleCalculate());
        
        // Добавляем обработчик для input, чтобы проверять валидность даты
        this.birthdateInput.addEventListener('change', (e) => {
            const date = new Date(e.target.value);
            const now = new Date();
            if (date > now) {
                alert('Пожалуйста, выберите корректную дату рождения');
                e.target.value = '';
            }
        });
    }

    handleCalculate() {
        const birthdate = this.birthdateInput.value;
        if (!birthdate) {
            alert('Пожалуйста, введите дату рождения');
            return;
        }

        // Получаем результаты расчета
        const result = this.calculator.calculateMatrix(birthdate);
        
        // Отображаем результаты
        this.displayMatrix(result.matrix);
        this.displayInterpretation();
        
        // Показываем секцию с результатами
        this.resultSection.classList.remove('hidden');
    }

    displayMatrix(matrix) {
        // Очищаем предыдущую матрицу
        this.matrixGrid.innerHTML = '';

        // Создаем ячейки матрицы
        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.textContent = value;
                
                // Добавляем анимацию появления
                cell.style.animation = `fadeIn 0.5s ${(i * 3 + j) * 0.1}s both`;
                
                this.matrixGrid.appendChild(cell);
            });
        });
    }

    displayInterpretation() {
        const interpretations = this.calculator.getInterpretation();
        
        // Создаем HTML для интерпретации
        const interpretationHTML = interpretations
            .map(text => `<p>${text}</p>`)
            .join('');

        this.interpretation.innerHTML = `
            <h3>Интерпретация вашей матрицы:</h3>
            ${interpretationHTML}
            <p class="disclaimer">* Это базовая интерпретация. Для более глубокого анализа рекомендуется консультация специалиста.</p>
        `;
    }

    // Метод для анимации чисел при отображении
    animateNumber(element, finalNumber) {
        let current = 0;
        const duration = 1000; // 1 секунда
        const stepTime = 50; // Обновление каждые 50мс
        const steps = duration / stepTime;
        const increment = finalNumber / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                element.textContent = finalNumber;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

// Инициализация UI при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.matrixUI = new MatrixUI();
});

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
