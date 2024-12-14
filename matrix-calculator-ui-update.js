// В методе handleCalculate класса MatrixUI добавить после расчёта матрицы:
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
        const interpretation = this.displayInterpretation();
        
        // Показываем секцию с результатами
        this.resultSection.classList.remove('hidden');

        // Отправляем событие о расчёте матрицы
        MatrixEventDispatcher.dispatchMatrixCalculated({
            birthdate: birthdate,
            matrix: result.matrix,
            additional: result.additional,
            interpretation: interpretation
        });
    }
