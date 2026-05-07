// ===== ТЁМНАЯ ТЕМА =====
let darkMode = localStorage.getItem('darkMode') === 'true';

function applyTheme() {
    if (darkMode) {
        document.body.classList.add('dark');
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) themeSwitch.textContent = '☀️ Светлая тема';
        const themeSwitchSm = document.getElementById('theme-switch-sm');
        if (themeSwitchSm) themeSwitchSm.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) themeSwitch.textContent = '🌙 Тёмная тема';
        const themeSwitchSm = document.getElementById('theme-switch-sm');
        if (themeSwitchSm) themeSwitchSm.textContent = '🌓';
    }
}

function toggleTheme() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyTheme();
}

document.getElementById('theme-switch').addEventListener('click', toggleTheme);
if (document.getElementById('theme-switch-sm')) {
    document.getElementById('theme-switch-sm').addEventListener('click', toggleTheme);
}
applyTheme();

// ===== ЯЗЫК =====
let lang = localStorage.getItem('lang') || 'ru';

const texts = {
    ru: {
        greeting_morning: 'Доброе утро',
        greeting_day: 'Добрый день',
        greeting_evening: 'Добрый вечер',
        greeting_night: 'Доброй ночи',
        records: 'записей',
        days: 'дней',
        streak: 'дней подряд',
        motivation: [
            'Здоровье — это главное. Следите за ним каждый день.',
            'Ваше тело говорит с вами. Слушайте его.',
            'Маленький шаг каждый день — большое здоровье на годы.',
            'Лучшее лечение — это профилактика. Ведите дневник.',
            'Сегодня отличный день, чтобы позаботиться о себе.'
        ],
        record_btn: '✚ Записать симптом',
        history_btn: '📋 История',
        no_records: 'Нет записей',
        fill_all: 'Заполни всё',
        choose_period: 'Выбери период и нажми «Показать».',
        no_records_period: 'Нет записей за этот период.',
        report_title: 'ОТЧЁТ ДЛЯ ВРАЧА',
        copied: '✅ Скопировано!',
        copy_btn: '📋 Скопировать',
        pdf_btn: '🖨️ Сохранить PDF',
        saved: '✅ Записано',
        delete_confirm: 'Удалить?',
        episodes: 'Эпизодов',
        avg_intensity: 'Ср. интенсивность',
        food_label: 'Еда',
        sleep_label: 'Сон (ч)',
        activity_label: 'Действие',
        weather_label: 'Погода',
        note_label: 'Заметка',
        show_btn: 'Показать',
        symptom_title: 'Симптомы',
        input_tab: 'Ввод',
        history_tab: 'История',
        report_tab: 'Отчёт',
        pain: 'Боль',
        nausea: 'Тошнота',
        dizziness: 'Круж.гол',
        numbness: 'Онемение',
        burning: 'Жжение',
        pressure: 'Давление',
        spasm: 'Спазм',
        other: 'Другое',
        sharp: 'Острая',
        pulling: 'Тянущая',
        pulsating: 'Пульсир',
        dull: 'Тупая',
        intensity: 'Интенсивность',
        note_placeholder: 'Заметка',
        fix_btn: 'Зафиксировать',
        period: 'Период',
        close: 'Закрыть',
        save: 'Сохранить',
        details: 'Детали',
        header_title: '🩺 Симптомы',
        no_symptom_selected: 'Выберите зону, тип и интенсивность',
        dark_theme: '🌙 Тёмная тема',
        light_theme: '☀️ Светлая тема'
    },
    en: {
        greeting_morning: 'Good morning',
        greeting_day: 'Good afternoon',
        greeting_evening: 'Good evening',
        greeting_night: 'Good night',
        records: 'records',
        days: 'days',
        streak: 'day streak',
        motivation: [
            'Health is the most important thing. Track it every day.',
            'Your body speaks to you. Listen to it.',
            'A small step every day leads to great health over the years.',
            'The best treatment is prevention. Keep your diary.',
            'Today is a great day to take care of yourself.'
        ],
        record_btn: '✚ Record symptom',
        history_btn: '📋 History',
        no_records: 'No records',
        fill_all: 'Fill all fields',
        choose_period: 'Choose period and press «Show».',
        no_records_period: 'No records for this period.',
        report_title: 'REPORT FOR DOCTOR',
        copied: '✅ Copied!',
        copy_btn: '📋 Copy',
        pdf_btn: '🖨️ Save PDF',
        saved: '✅ Saved',
        delete_confirm: 'Delete?',
        episodes: 'Episodes',
        avg_intensity: 'Avg. intensity',
        food_label: 'Food',
        sleep_label: 'Sleep (h)',
        activity_label: 'Activity',
        weather_label: 'Weather',
        note_label: 'Note',
        show_btn: 'Show',
        symptom_title: 'Symptoms',
        input_tab: 'Input',
        history_tab: 'History',
        report_tab: 'Report',
        pain: 'Pain',
        nausea: 'Nausea',
        dizziness: 'Dizzy',
        numbness: 'Numbness',
        burning: 'Burning',
        pressure: 'Pressure',
        spasm: 'Spasm',
        other: 'Other',
        sharp: 'Sharp',
        pulling: 'Pulling',
        pulsating: 'Pulsating',
        dull: 'Dull',
        intensity: 'Intensity',
        note_placeholder: 'Note',
        fix_btn: 'Save',
        period: 'Period',
        close: 'Close',
        save: 'Save',
        details: 'Details',
        header_title: '🩺 Symptoms',
        no_symptom_selected: 'Select area, type and intensity',
        dark_theme: '🌙 Dark theme',
        light_theme: '☀️ Light theme'
    }
};

function t(key) {
    return texts[lang][key] || key;
}

// Функция для обновления ВСЕГО интерфейса (только когда приложение открыто)
function updateAllTexts() {
    // Проверяем, открыто ли приложение
    const appScreen = document.getElementById('app-screen');
    if (!appScreen || appScreen.style.display === 'none') return;
    
    // Заголовки
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) headerTitle.textContent = t('header_title');
    
    // Табы
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length >= 3) {
        tabs[0].textContent = t('input_tab');
        tabs[1].textContent = t('history_tab');
        tabs[2].textContent = t('report_tab');
    }
    
    // Кнопки типов симптомов
    const typeBtns = document.querySelectorAll('#type-buttons .btn');
    const typeMapping = ['pain', 'nausea', 'dizziness', 'numbness', 'burning', 'pressure', 'spasm', 'other'];
    typeBtns.forEach((btn, idx) => {
        if (typeMapping[idx]) btn.textContent = t(typeMapping[idx]);
    });
    
    // Кнопки характера боли
    const painBtns = document.querySelectorAll('#pain-char-buttons .btn');
    const painMapping = ['sharp', 'pulling', 'pulsating', 'dull'];
    painBtns.forEach((btn, idx) => {
        if (painMapping[idx]) btn.textContent = t(painMapping[idx]);
    });
    
    // Заголовки секций
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length >= 1) {
        if (sectionTitles[0]) sectionTitles[0].textContent = t('symptom_title');
    }
    if (sectionTitles.length >= 2) {
        if (sectionTitles[1]) sectionTitles[1].textContent = t('intensity');
    }
    
    // Плейсхолдер заметки
    const noteInput = document.getElementById('note');
    if (noteInput) noteInput.placeholder = t('note_placeholder');
    
    // Кнопка сохранения
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) saveBtn.textContent = t('fix_btn');
    
    // Заголовок периода в отчёте
    const periodTitle = document.querySelector('#p-rep .section-title');
    if (periodTitle) periodTitle.textContent = t('period');
    
    // Кнопка показа в отчёте
    const genRepBtn = document.getElementById('gen-rep');
    if (genRepBtn) genRepBtn.textContent = t('show_btn');
    
    // Кнопки копирования и PDF
    const copyBtn = document.getElementById('copy-rep');
    const pdfBtn = document.getElementById('pdf-rep');
    if (copyBtn) copyBtn.textContent = t('copy_btn');
    if (pdfBtn) pdfBtn.textContent = t('pdf_btn');
    
    // Модальное окно (если открыто)
    const modalTitle = document.querySelector('.modal h3');
    if (modalTitle) modalTitle.textContent = '📝 ' + t('details');
    const closeModalBtn = document.getElementById('btn-close');
    if (closeModalBtn) closeModalBtn.textContent = t('close');
    const saveModalBtn = document.getElementById('btn-save');
    if (saveModalBtn) saveModalBtn.textContent = t('save');
}

// Функция обновления приветственного экрана
function updateWelcomeScreen() {
    const hour = new Date().getHours();
    let greetingKey;
    if (hour >= 6 && hour < 12) greetingKey = 'greeting_morning';
    else if (hour >= 12 && hour < 18) greetingKey = 'greeting_day';
    else if (hour >= 18 && hour < 23) greetingKey = 'greeting_evening';
    else greetingKey = 'greeting_night';

    const welcomeGreeting = document.getElementById('welcome-greeting');
    if (welcomeGreeting) welcomeGreeting.textContent = t(greetingKey) + '! 👋';
    
    const welcomeDate = document.getElementById('welcome-date');
    if (welcomeDate) {
        welcomeDate.textContent = new Date().toLocaleDateString(
            lang === 'ru' ? 'ru-RU' : 'en-US',
            { weekday: 'long', day: 'numeric', month: 'long' }
        );
    }

    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const statRecords = document.getElementById('stat-records');
    if (statRecords) statRecords.textContent = h.length;

    const daysSet = new Set(h.map(r => new Date(r.dateTime).toDateString()));
    const statDays = document.getElementById('stat-days');
    if (statDays) statDays.textContent = daysSet.size;

    let streak = 0;
    const today = new Date().toDateString();
    const checkDate = new Date();
    while (true) {
        if (daysSet.has(checkDate.toDateString())) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            if (checkDate.toDateString() === today && streak === 0) {
                checkDate.setDate(checkDate.getDate() - 1);
                continue;
            }
            break;
        }
    }
    const statStreak = document.getElementById('stat-streak');
    if (statStreak) statStreak.textContent = streak;

    const motivations = t('motivation');
    const welcomeMotivation = document.getElementById('welcome-motivation');
    if (welcomeMotivation) {
        welcomeMotivation.textContent = motivations[Math.floor(Math.random() * motivations.length)];
    }

    const startRecordBtn = document.getElementById('btn-start-record');
    if (startRecordBtn) startRecordBtn.textContent = t('record_btn');
    
    const goHistoryBtn = document.getElementById('btn-go-history');
    if (goHistoryBtn) goHistoryBtn.textContent = t('history_btn');
    
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) langSwitch.textContent = lang === 'ru' ? '🌐 English' : '🌐 Русский';
    
    // Обновляем тексты в приложении (если оно открыто)
    updateAllTexts();
}

function updateTodayBadge() {
    const todayDate = document.getElementById('today-date');
    if (todayDate) {
        todayDate.textContent = new Date().toLocaleDateString(
            lang === 'ru' ? 'ru-RU' : 'en-US',
            { day: 'numeric', month: 'short' }
        );
    }
}

// ===== СОСТОЯНИЕ =====
let selZ = null, selT = null, selP = null, selI = null, editId = null;

// Кнопки интенсивности
const iRow = document.getElementById('intensity-buttons');
if (iRow) {
    for (let i = 1; i <= 10; i++) {
        const b = document.createElement('div');
        b.className = 'int-btn' + (i >= 7 ? ' high-light' : '');
        b.dataset.intensity = i;
        b.textContent = i;
        iRow.appendChild(b);
    }
}

// ===== НАВИГАЦИЯ =====
function showApp() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const appScreen = document.getElementById('app-screen');
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (appScreen) appScreen.style.display = 'block';
    updateTodayBadge();
    updateAllTexts(); // Обновляем тексты при открытии приложения
}

function showWelcome() {
    const appScreen = document.getElementById('app-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    if (appScreen) appScreen.style.display = 'none';
    if (welcomeScreen) welcomeScreen.style.display = 'flex';
    updateWelcomeScreen();
}

const startRecordBtn = document.getElementById('btn-start-record');
if (startRecordBtn) startRecordBtn.addEventListener('click', showApp);

const goHistoryBtn = document.getElementById('btn-go-history');
if (goHistoryBtn) {
    goHistoryBtn.addEventListener('click', () => {
        showApp();
        const tabs = document.querySelectorAll('.tab');
        const panels = document.querySelectorAll('.panel');
        tabs.forEach(x => x.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        const histTab = document.querySelector('[data-panel="p-hist"]');
        if (histTab) histTab.classList.add('active');
        const histPanel = document.getElementById('p-hist');
        if (histPanel) histPanel.classList.add('active');
        renHist();
    });
}

const backBtn = document.getElementById('back-btn');
if (backBtn) backBtn.addEventListener('click', showWelcome);

// Язык
const langSwitch = document.getElementById('lang-switch');
if (langSwitch) {
    langSwitch.addEventListener('click', () => {
        lang = lang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('lang', lang);
        updateWelcomeScreen();
        updateTodayBadge();
        renHist();
        initRep();
        const repOut = document.getElementById('rep-out');
        if (repOut) repOut.textContent = t('choose_period');
        updateAllTexts();
    });
}

// Табы
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        const panels = document.querySelectorAll('.panel');
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(tab.dataset.panel);
        if (panel) panel.classList.add('active');
        updateTodayBadge();
        if (tab.dataset.panel === 'p-hist') renHist();
        if (tab.dataset.panel === 'p-rep') initRep();
    });
});

// Зоны на теле
const zones = document.querySelectorAll('.zone');
zones.forEach(z => {
    z.addEventListener('click', () => {
        zones.forEach(x => x.classList.remove('active'));
        z.classList.add('active');
        selZ = z.dataset.zone;
    });
});

// Универсальная функция выбора кнопок
function setup(id, attr, key) {
    const c = document.getElementById(id);
    if (!c) return;
    const btns = c.querySelectorAll('[data-' + attr + ']');
    btns.forEach(b => {
        b.addEventListener('click', () => {
            const selectedClass = key === 'selI' ? '.int-btn' : '.btn';
            c.querySelectorAll(selectedClass).forEach(x => x.classList.remove('selected'));
            b.classList.add('selected');
            if (key === 'selT') {
                selT = b.dataset[attr];
                const painRow = document.getElementById('pain-char-row');
                if (painRow) painRow.style.display = selT === 'Боль' ? 'block' : 'none';
                if (selT !== 'Боль') selP = null;
            } else if (key === 'selP') {
                selP = b.dataset[attr];
            } else if (key === 'selI') {
                selI = parseInt(b.dataset[attr]);
            }
        });
    });
}

setup('type-buttons', 'type', 'selT');
setup('pain-char-buttons', 'pain-char', 'selP');
setup('intensity-buttons', 'intensity', 'selI');

// ===== СОХРАНЕНИЕ =====
const saveBtn = document.getElementById('save-btn');
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        if (!selZ || !selT || !selI) {
            alert(t('fill_all'));
            return;
        }
        const rec = {
            id: Date.now(),
            dateTime: new Date().toISOString(),
            zone: selZ,
            type: selT,
            painChar: selT === 'Боль' ? selP : null,
            intensity: selI,
            note: document.getElementById('note').value,
            context: {}
        };
        const h = JSON.parse(localStorage.getItem('sh') || '[]');
        h.unshift(rec);
        localStorage.setItem('sh', JSON.stringify(h));
        const savedMsg = document.getElementById('saved-msg');
        if (savedMsg) {
            savedMsg.textContent = t('saved');
            savedMsg.classList.add('show');
            setTimeout(() => savedMsg.classList.remove('show'), 1500);
        }
        selZ = selT = selP = selI = null;
        zones.forEach(x => x.classList.remove('active'));
        document.querySelectorAll('.btn, .int-btn').forEach(x => x.classList.remove('active', 'selected'));
        const painRow = document.getElementById('pain-char-row');
        if (painRow) painRow.style.display = 'none';
        const note = document.getElementById('note');
        if (note) note.value = '';
        updateWelcomeScreen();
    });
}

// ===== ИСТОРИЯ =====
function renHist() {
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const list = document.getElementById('history-list');
    if (!list) return;
    if (!h.length) {
        list.innerHTML = '<div class="empty-history">' + t('no_records') + '</div>';
        return;
    }
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    list.innerHTML = h.map(r => {
        const d = new Date(r.dateTime);
        const ds = d.toLocaleString(locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        const ic = r.intensity >= 7 ? 'high' : (r.intensity >= 4 ? 'mid' : 'low');
        return `<div class="history-item" data-id="${r.id}">
            <div class="left">
                <span class="zone-name">${r.zone}</span>
                <span class="type-name">${r.type}${r.painChar ? ', ' + r.painChar.toLowerCase() : ''}</span>
                <span class="date-name">${ds}</span>
            </div>
            <div class="right">
                <span class="intensity-badge ${ic}">${r.intensity}/10</span>
                <button class="delete-btn" data-del="${r.id}">✕</button>
            </div>
        </div>`;
    }).join('');
    
    const historyItems = list.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', e => {
            if (!e.target.classList.contains('delete-btn')) openMod(parseInt(item.dataset.id));
        });
    });
    
    const deleteBtns = list.querySelectorAll('.delete-btn');
    deleteBtns.forEach(b => {
        b.addEventListener('click', e => {
            e.stopPropagation();
            delRec(parseInt(b.dataset.del));
        });
    });
}

function delRec(id) {
    if (!confirm(t('delete_confirm'))) return;
    let h = JSON.parse(localStorage.getItem('sh') || '[]');
    h = h.filter(r => r.id !== id);
    localStorage.setItem('sh', JSON.stringify(h));
    renHist();
    updateWelcomeScreen();
}

// ===== МОДАЛКА =====
function openMod(id) {
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const r = h.find(x => x.id === id);
    if (!r) return;
    editId = id;
    const d = new Date(r.dateTime);
    const ctx = r.context || {};
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <p style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">
                ${d.toLocaleString(locale, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                — <b>${r.zone}</b>, ${r.type}${r.painChar ? ' (' + r.painChar.toLowerCase() + ')' : ''}, <b>${r.intensity}/10</b>
            </p>
            <div class="field"><label>${t('food_label')}</label><input id="cf" value="${ctx.food || ''}" placeholder="${lang === 'ru' ? 'кофе' : 'coffee'}"></div>
            <div class="field"><label>${t('sleep_label')}</label><input id="cs" value="${ctx.sleep || ''}" placeholder="6"></div>
            <div class="field"><label>${t('activity_label')}</label><input id="ca" value="${ctx.activity || ''}" placeholder="${lang === 'ru' ? 'сидел' : 'sitting'}"></div>
            <div class="field"><label>${t('weather_label')}</label><input id="cw" value="${ctx.weather || ''}" placeholder="${lang === 'ru' ? 'дождь' : 'rain'}"></div>
        `;
    }
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.add('open');
}

function closeMod() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('open');
    editId = null;
}

const closeBtn = document.getElementById('btn-close');
if (closeBtn) closeBtn.addEventListener('click', closeMod);

const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeMod();
    });
}

const saveContextBtn = document.getElementById('btn-save');
if (saveContextBtn) {
    saveContextBtn.addEventListener('click', () => {
        if (!editId) return;
        const h = JSON.parse(localStorage.getItem('sh') || '[]');
        const r = h.find(x => x.id === editId);
        if (!r) return;
        r.context = {
            food: document.getElementById('cf')?.value || '',
            sleep: document.getElementById('cs')?.value || '',
            activity: document.getElementById('ca')?.value || '',
            weather: document.getElementById('cw')?.value || ''
        };
        localStorage.setItem('sh', JSON.stringify(h));
        closeMod();
        renHist();
    });
}

// ===== ОТЧЁТ =====
function initRep() {
    const n = new Date();
    const w = new Date(n.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fromInput = document.getElementById('r-from');
    const toInput = document.getElementById('r-to');
    if (fromInput) fromInput.value = w.toISOString().split('T')[0];
    if (toInput) toInput.value = n.toISOString().split('T')[0];
}

const genRepBtn = document.getElementById('gen-rep');
if (genRepBtn) {
    genRepBtn.addEventListener('click', () => {
        const fromStr = document.getElementById('r-from')?.value;
        const toStr = document.getElementById('r-to')?.value;

        if (!fromStr || !toStr) {
            alert(t('choose_period'));
            return;
        }

        const f = new Date(fromStr);
        const tDate = new Date(toStr + 'T23:59:59');

        if (isNaN(f.getTime()) || isNaN(tDate.getTime())) return;

        const h = JSON.parse(localStorage.getItem('sh') || '[]');
        const fl = h.filter(r => {
            const d = new Date(r.dateTime);
            return d >= f && d <= tDate;
        });

        const repOut = document.getElementById('rep-out');
        if (!repOut) return;

        if (!fl.length) {
            repOut.textContent = t('no_records_period');
            return;
        }

        const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
        let rep = t('report_title') + '\n';
        rep += '═'.repeat(26) + '\n';
        rep += f.toLocaleDateString(locale) + ' — ' + tDate.toLocaleDateString(locale) + '\n';
        rep += t('episodes') + ': ' + fl.length + '\n';

        let si = 0;
        fl.forEach(r => { si += r.intensity; });
        rep += t('avg_intensity') + ': ' + (si / fl.length).toFixed(1) + '/10\n';
        rep += '─'.repeat(26) + '\n';

        fl.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)).forEach((r, i) => {
            const d = new Date(r.dateTime);
            rep += '\n' + (i + 1) + '. ' + d.toLocaleString(locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '\n';
            rep += '   ' + r.zone + ', ' + r.type + (r.painChar ? ' (' + r.painChar.toLowerCase() + ')' : '') + ', ' + r.intensity + '/10\n';
            if (r.context) {
                if (r.context.food) rep += '   ' + t('food_label') + ': ' + r.context.food + '\n';
                if (r.context.sleep) rep += '   ' + t('sleep_label') + ': ' + r.context.sleep + (lang === 'ru' ? 'ч' : 'h') + '\n';
                if (r.context.activity) rep += '   ' + t('activity_label') + ': ' + r.context.activity + '\n';
            }
            if (r.note) rep += '   ' + t('note_label') + ': ' + r.note + '\n';
        });

        repOut.textContent = rep;
    });
}

// Копировать
const copyRepBtn = document.getElementById('copy-rep');
if (copyRepBtn) {
    copyRepBtn.addEventListener('click', () => {
        const txt = document.getElementById('rep-out')?.textContent;
        if (!txt || txt === t('choose_period') || txt === t('no_records_period')) return;
        navigator.clipboard.writeText(txt).then(() => {
            const btn = document.getElementById('copy-rep');
            if (btn) {
                btn.textContent = t('copied');
                setTimeout(() => { btn.textContent = t('copy_btn'); }, 1500);
            }
        });
    });
}

// PDF
const pdfRepBtn = document.getElementById('pdf-rep');
if (pdfRepBtn) {
    pdfRepBtn.addEventListener('click', () => {
        const txt = document.getElementById('rep-out')?.textContent;
        if (!txt || txt === t('choose_period') || txt === t('no_records_period')) return;
        window.print();
    });
}

// ===== PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swCode = [
            "self.addEventListener('install', e => self.skipWaiting());",
            "self.addEventListener('activate', e => self.clients.claim());",
            "self.addEventListener('fetch', e => {",
            "  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));",
            "});"
        ].join('\n');
        const blob = new Blob([swCode], { type: 'application/javascript' });
        navigator.serviceWorker.register(URL.createObjectURL(blob)).catch(() => {});
    });
}

// ===== ЗАПУСК =====
updateWelcomeScreen();
renHist();
initRep();