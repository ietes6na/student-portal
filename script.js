// Данные расписания (имитация базы данных)
const scheduleData = [
    { day: "Понедельник", time: "09:00 - 10:30", subject: "Высшая математика", room: "305", teacher: "Иванов И.И." },
    { day: "Понедельник", time: "10:45 - 12:15", subject: "Физика", room: "412", teacher: "Петров П.П." },
    { day: "Вторник", time: "09:00 - 10:30", subject: "Программирование", room: "Comp-1", teacher: "Сидоров С.С." },
    { day: "Вторник", time: "10:45 - 12:15", subject: "Английский язык", room: "201", teacher: "Смирнова А.А." },
    { day: "Среда", time: "12:30 - 14:00", subject: "Базы данных", room: "Comp-2", teacher: "Козлов К.К." },
    { day: "Четверг", time: "09:00 - 10:30", subject: "Философия", room: "105", teacher: "Новиков Н.Н." },
    { day: "Пятница", time: "10:45 - 12:15", subject: "Физкультура", room: "Спортзал", teacher: "Орлов О.О." }
];

// Функция переключения секций (Главная / Расписание)
function showSection(sectionId) {
    // Скрываем все секции
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('schedule-section').style.display = 'none';

    // Показываем нужную
    if (sectionId === 'home') {
        document.getElementById('home-section').style.display = 'block';
    } else if (sectionId === 'schedule') {
        document.getElementById('schedule-section').style.display = 'block';
        renderSchedule(); // Перерисовываем таблицу при открытии
    }
}

// Функция отрисовки таблицы расписания
function renderSchedule() {
    const tbody = document.getElementById('schedule-body');
    const selectedDay = document.getElementById('day-select').value;
    
    // Очищаем текущую таблицу
    tbody.innerHTML = '';

    // Фильтруем данные
    const filteredData = scheduleData.filter(item => {
        if (selectedDay === 'all') return true;
        return item.day === selectedDay;
    });

    // Если данных нет
    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Пар нет 😎</td></tr>';
        return;
    }

    // Генерируем строки таблицы
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.day}</td>
            <td>${item.time}</td>
            <td><strong>${item.subject}</strong></td>
            <td>${item.room}</td>
            <td>${item.teacher}</td>
        `;
        tbody.appendChild(row);
    });
}

// Инициализация при загрузке (показываем главную)
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});