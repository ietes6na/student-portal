// === ДАННЫЕ ===
const scheduleData = [
    { day: "Понедельник", time: "09:00 - 10:30", subject: "Высшая математика", room: "305", teacher: "Иванов И.И." },
    { day: "Понедельник", time: "10:45 - 12:15", subject: "Физика", room: "412", teacher: "Петров П.П." },
    { day: "Вторник", time: "09:00 - 10:30", subject: "Программирование", room: "Comp-1", teacher: "Сидоров С.С." },
    { day: "Вторник", time: "10:45 - 12:15", subject: "Английский язык", room: "201", teacher: "Смирнова А.А." },
    { day: "Среда", time: "12:30 - 14:00", subject: "Базы данных", room: "Comp-2", teacher: "Козлов К.К." },
    { day: "Четверг", time: "09:00 - 10:30", subject: "Философия", room: "105", teacher: "Новиков Н.Н." },
    { day: "Пятница", time: "10:45 - 12:15", subject: "Физкультура", room: "Спортзал", teacher: "Орлов О.О." }
];

const newsData = [
    { date: "01.06.2026", category: "Важное", title: "Изменения в сессии", text: "Обращаем внимание, что начало летней экзаменационной сессии перенесено на 15 июня. Проверьте обновленное расписание." },
    { date: "28.05.2026", category: "Мероприятия", title: "День открытых дверей", text: "Приглашаем школьников и их родителей посетить наш университет 10 июня. Будут работать интерактивные площадки." },
    { date: "25.05.2026", category: "Учеба", title: "Новый курс по Python", text: "Открыта регистрация на факультативный курс 'Python для анализа данных'. Занятия начнутся со следующей недели." },
    { date: "20.05.2026", category: "Мероприятия", title: "Студенческая весна", text: "Финальный концерт фестиваля состоится в главном актовом зале. Вход по студенческим билетам." }
];

let currentNewsFilter = 'all';

// === УПРАВЛЕНИЕ СЕКЦИЯМИ ===
function showSection(sectionId) {
    const sections = ['home', 'schedule', 'news', 'contacts'];
    sections.forEach(id => {
        const el = document.getElementById(id + '-section');
        if (el) el.style.display = 'none';
    });

    const target = document.getElementById(sectionId + '-section');
    if (target) {
        target.style.display = 'block';
        if (sectionId === 'schedule') renderSchedule();
        if (sectionId === 'news') renderNews();
    }
}

// === ЛОГИКА РАСПИСАНИЯ ===
function renderSchedule() {
    const tbody = document.getElementById('schedule-body');
    const selectedDay = document.getElementById('day-select').value;
    tbody.innerHTML = '';
    
    const filteredData = scheduleData.filter(item => selectedDay === 'all' || item.day === selectedDay);
    
    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Пар нет 😎</td></tr>';
        return;
    }
    
    filteredData.forEach(item => {
        tbody.innerHTML += `<tr><td>${item.day}</td><td>${item.time}</td><td><strong>${item.subject}</strong></td><td>${item.room}</td><td>${item.teacher}</td></tr>`;
    });
}

// === ЛОГИКА НОВОСТЕЙ ===
function filterNews(category, btnElement) {
    currentNewsFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    renderNews();
}

function renderNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    const filteredNews = currentNewsFilter === 'all' 
        ? newsData 
        : newsData.filter(item => item.category === currentNewsFilter);

    if (filteredNews.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d;">Новостей в этой категории пока нет.</p>';
        return;
    }

    filteredNews.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <span class="news-date">${news.date}</span>
            <span class="news-category">${news.category}</span>
            <h3 class="news-title">${news.title}</h3>
            <p class="news-text">${news.text}</p>
        `;
        container.appendChild(card);
    });
}

// === ЛОГИКА КОНТАКТОВ ===
function handleContactSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-message');
    
    form.style.display = 'none';
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMsg.style.display = 'none';
    }, 3000);
}

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});