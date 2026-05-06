// ===== ТЁМНАЯ ТЕМА =====
let darkMode = localStorage.getItem('darkMode') === 'true';

function applyTheme() {
    if (darkMode) {
        document.body.classList.add('dark');
        document.getElementById('theme-switch').textContent = '☀️ Светлая тема';
        if (document.getElementById('theme-switch-sm')) {
            document.getElementById('theme-switch-sm').textContent = '☀️';
        }
    } else {
        document.body.classList.remove('dark');
        document.getElementById('theme-switch').textContent = '🌙 Тёмная тема';
        if (document.getElementById('theme-switch-sm')) {
            document.getElementById('theme-switch-sm').textContent = '🌓';
        }
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
        show_btn: 'Показать'
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
        show_btn: 'Show'
    }
};

function t(key) {
    return texts[lang][key] || key;
}

// ===== ПРИВЕТСТВЕННЫЙ ЭКРАН =====
function updateWelcomeScreen() {
    const hour = new Date().getHours();
    let greetingKey;
    if (hour >= 6 && hour < 12) greetingKey = 'greeting_morning';
    else if (hour >= 12 && hour < 18) greetingKey = 'greeting_day';
    else if (hour >= 18 && hour < 23) greetingKey = 'greeting_evening';
    else greetingKey = 'greeting_night';

    document.getElementById('welcome-greeting').textContent = t(greetingKey) + '! 👋';
    document.getElementById('welcome-date').textContent = new Date().toLocaleDateString(
        lang === 'ru' ? 'ru-RU' : 'en-US',
        { weekday: 'long', day: 'numeric', month: 'long' }
    );

    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    document.getElementById('stat-records').textContent = h.length;

    const daysSet = new Set(h.map(r => new Date(r.dateTime).toDateString()));
    document.getElementById('stat-days').textContent = daysSet.size;

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
    document.getElementById('stat-streak').textContent = streak;

    const motivations = t('motivation');
    document.getElementById('welcome-motivation').textContent =
        motivations[Math.floor(Math.random() * motivations.length)];

    document.getElementById('btn-start-record').textContent = t('record_btn');
    document.getElementById('btn-go-history').textContent = t('history_btn');
    document.getElementById('lang-switch').textContent = lang === 'ru' ? '🌐 English' : '🌐 Русский';
    document.getElementById('copy-rep').textContent = t('copy_btn');
    document.getElementById('pdf-rep').textContent = t('pdf_btn');
    document.getElementById('gen-rep').textContent = t('show_btn');
}

// ===== СОСТОЯНИЕ =====
let selZ = null, selT = null, selP = null, selI = null, editId = null;

function updateTodayBadge() {
    document.getElementById('today-date').textContent = new Date().toLocaleDateString(
        lang === 'ru' ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'short' }
    );
}

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
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    updateTodayBadge();
}

function showWelcome() {
    document.getElementById('app-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'flex';
    updateWelcomeScreen();
}

document.getElementById('btn-start-record').addEventListener('click', showApp);
document.getElementById('btn-go-history').addEventListener('click', () => {
    showApp();
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const histTab = document.querySelector('[data-panel="p-hist"]');
    if (histTab) histTab.classList.add('active');
    const histPanel = document.getElementById('p-hist');
    if (histPanel) histPanel.classList.add('active');
    renHist();
});
document.getElementById('back-btn').addEventListener('click', showWelcome);

// Язык
document.getElementById('lang-switch').addEventListener('click', () => {
    lang = lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', lang);
    updateWelcomeScreen();
    updateTodayBadge();
    renHist();
    initRep();
    document.getElementById('rep-out').textContent = t('choose_period');
    document.getElementById('gen-rep').textContent = t('show_btn');
});

// Табы
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(tab.dataset.panel);
        if (panel) panel.classList.add('active');
        updateTodayBadge();
        if (tab.dataset.panel === 'p-hist') renHist();
        if (tab.dataset.panel === 'p-rep') initRep();
    });
});

// Зоны на теле
document.querySelectorAll('.zone').forEach(z => {
    z.addEventListener('click', () => {
        document.querySelectorAll('.zone').forEach(x => x.classList.remove('active'));
        z.classList.add('active');
        selZ = z.dataset.zone;
    });
});

// Универсальная функция выбора кнопок
function setup(id, attr, key) {
    const c = document.getElementById(id);
    if (!c) return;
    c.querySelectorAll('[data-' + attr + ']').forEach(b => {
        b.addEventListener('click', () => {
            c.querySelectorAll('.btn, .int-btn').forEach(x => x.classList.remove('selected'));
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
document.getElementById('save-btn').addEventListener('click', () => {
    if (!selZ || !selT || !selI) return alert(t('fill_all'));
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
    document.getElementById('saved-msg').textContent = t('saved');
    document.getElementById('saved-msg').classList.add('show');
    setTimeout(() => document.getElementById('saved-msg').classList.remove('show'), 1500);
    selZ = selT = selP = selI = null;
    document.querySelectorAll('.zone,.btn,.int-btn').forEach(x => x.classList.remove('active', 'selected'));
    const painRow = document.getElementById('pain-char-row');
    if (painRow) painRow.style.display = 'none';
    document.getElementById('note').value = '';
    updateWelcomeScreen();
});

// ===== ИСТОРИЯ =====
function renHist() {
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const list = document.getElementById('history-list');
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
    list.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', e => {
            if (!e.target.classList.contains('delete-btn')) openMod(parseInt(item.dataset.id));
        });
    });
    list.querySelectorAll('.delete-btn').forEach(b => {
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
    document.getElementById('modal-content').innerHTML = `
        <p style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">
            ${d.toLocaleString(locale, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
            — <b>${r.zone}</b>, ${r.type}${r.painChar ? ' (' + r.painChar.toLowerCase() + ')' : ''}, <b>${r.intensity}/10</b>
        </p>
        <div class="field"><label>${t('food_label')}</label><input id="cf" value="${ctx.food || ''}" placeholder="${lang === 'ru' ? 'кофе' : 'coffee'}"></div>
        <div class="field"><label>${t('sleep_label')}</label><input id="cs" value="${ctx.sleep || ''}" placeholder="6"></div>
        <div class="field"><label>${t('activity_label')}</label><input id="ca" value="${ctx.activity || ''}" placeholder="${lang === 'ru' ? 'сидел' : 'sitting'}"></div>
        <div class="field"><label>${t('weather_label')}</label><input id="cw" value="${ctx.weather || ''}" placeholder="${lang === 'ru' ? 'дождь' : 'rain'}"></div>
    `;
    document.getElementById('modal-overlay').classList.add('open');
}

function closeMod() {
    document.getElementById('modal-overlay').classList.remove('open');
    editId = null;
}

document.getElementById('btn-close').addEventListener('click', closeMod);
document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeMod();
});
document.getElementById('btn-save').addEventListener('click', () => {
    if (!editId) return;
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const r = h.find(x => x.id === editId);
    if (!r) return;
    r.context = {
        food: document.getElementById('cf').value,
        sleep: document.getElementById('cs').value,
        activity: document.getElementById('ca').value,
        weather: document.getElementById('cw').value
    };
    localStorage.setItem('sh', JSON.stringify(h));
    closeMod();
    renHist();
});

// ===== ОТЧЁТ =====
function initRep() {
    const n = new Date();
    const w = new Date(n.getTime() - 7 * 24 * 60 * 60 * 1000);
    document.getElementById('r-from').value = w.toISOString().split('T')[0];
    document.getElementById('r-to').value = n.toISOString().split('T')[0];
}

document.getElementById('gen-rep').addEventListener('click', () => {
    const fromStr = document.getElementById('r-from').value;
    const toStr = document.getElementById('r-to').value;

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

// Копировать
document.getElementById('copy-rep').addEventListener('click', () => {
    const txt = document.getElementById('rep-out').textContent;
    if (txt === t('choose_period') || txt === t('no_records_period')) return;
    navigator.clipboard.writeText(txt).then(() => {
        const b = document.getElementById('copy-rep');
        b.textContent = t('copied');
        setTimeout(() => { b.textContent = t('copy_btn'); }, 1500);
    });
});

// PDF
document.getElementById('pdf-rep').addEventListener('click', () => {
    const txt = document.getElementById('rep-out').textContent;
    if (txt === t('choose_period') || txt === t('no_records_period')) return;
    window.print();
});

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