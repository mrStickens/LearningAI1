class TelegramInterface {
    constructor() {
        // Инициализация Telegram WebApp
        this.tg = window.Telegram.WebApp;
        this.initializeApp();
    }

    initializeApp() {
        // Настройка темы и основных параметров
        this.tg.expand(); // Раскрываем на всю высоту
        
        // Настраиваем основную кнопку
        this.tg.MainButton.setParams({
            text: 'Поделиться результатом',
            color: '#2b5278'
        });

        // Слушаем события из основного приложения
        document.addEventListener('matrixCalculated', (event) => {
            this.handleMatrixCalculated(event.detail);
        });

        // Обработчик нажатия основной кнопки
        this.tg.MainButton.onClick(() => {
            this.sendDataToBot();
        });
    }

    handleMatrixCalculated(data) {
        // Показываем кнопку, когда расчёт выполнен
        this.matrixData = data;
        this.tg.MainButton.show();
    }

    sendDataToBot() {
        if (!this.matrixData) return;

        // Формируем данные для отправки
        const dataToSend = {
            action: 'matrix_fate',
            date: this.matrixData.birthdate,
            matrix: this.matrixData.matrix,
            additional: this.matrixData.additional,
            interpretation: this.matrixData.interpretation
        };

        // Отправляем данные боту
        this.tg.sendData(JSON.stringify(dataToSend));
    }

    // Метод для обновления UI в соответствии с темой Telegram
    applyTelegramTheme() {
        const colorScheme = this.tg.colorScheme || 'light';
        document.documentElement.setAttribute('data-theme', colorScheme);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что скрипт выполняется в контексте Telegram WebApp
    if (window.Telegram?.WebApp) {
        window.telegramInterface = new TelegramInterface();
    } else {
        console.warn('Telegram WebApp не обнаружен. Приложение запущено вне контекста Telegram.');
    }
});

// Дополнительно добавим обработчик событий для генерации события после расчёта матрицы
class MatrixEventDispatcher {
    static dispatchMatrixCalculated(data) {
        const event = new CustomEvent('matrixCalculated', {
            detail: data
        });
        document.dispatchEvent(event);
    }
}

// Экспортируем для использования в других модулях
window.MatrixEventDispatcher = MatrixEventDispatcher;
