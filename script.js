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
        symptom_title: 'Тип',
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
        light_theme: '☀️ Светлая тема',
        selected: 'Выбрано',
        body_view: 'Тело',
        organs_view: 'Органы'
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
        symptom_title: 'Type',
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
        light_theme: '☀️ Light theme',
        selected: 'Selected',
        body_view: 'Body',
        organs_view: 'Organs'
    }
};

function t(key) {
    return texts[lang][key] || key;
}

function updateAllTexts() {
    const appScreen = document.getElementById('app-screen');
    if (!appScreen || appScreen.style.display === 'none') return;
    
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) headerTitle.textContent = t('header_title');
    
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length >= 3) { tabs[0].textContent = t('input_tab'); tabs[1].textContent = t('history_tab'); tabs[2].textContent = t('report_tab'); }
    
    const viewBtns = document.querySelectorAll('.view-btn');
    if (viewBtns.length >= 2) { viewBtns[0].textContent = t('body_view'); viewBtns[1].textContent = t('organs_view'); }
    
    const typeBtns = document.querySelectorAll('#type-buttons .btn');
    const typeMapping = ['pain','nausea','dizziness','numbness','burning','pressure','spasm','other'];
    typeBtns.forEach((btn, idx) => { if (typeMapping[idx]) btn.textContent = t(typeMapping[idx]); });
    
    const painBtns = document.querySelectorAll('#pain-char-buttons .btn');
    const painMapping = ['sharp','pulling','pulsating','dull'];
    painBtns.forEach((btn, idx) => { if (painMapping[idx]) btn.textContent = t(painMapping[idx]); });
    
    const st = document.querySelectorAll('#p-in .section-title');
    if (st.length >= 2) st[1].textContent = t('symptom_title');
    if (st.length >= 3) st[2].textContent = t('intensity');
    
    const ni = document.getElementById('note'); if (ni) ni.placeholder = t('note_placeholder');
    const sb = document.getElementById('save-btn'); if (sb) sb.textContent = t('fix_btn');
    const pt = document.querySelector('#p-rep .section-title'); if (pt) pt.textContent = t('period');
    const gr = document.getElementById('gen-rep'); if (gr) gr.textContent = t('show_btn');
    const cb = document.getElementById('copy-rep'); if (cb) cb.textContent = t('copy_btn');
    const pb = document.getElementById('pdf-rep'); if (pb) pb.textContent = t('pdf_btn');
    const mt = document.querySelector('.modal h3'); if (mt) mt.textContent = '📝 ' + t('details');
    const cm = document.getElementById('btn-close'); if (cm) cm.textContent = t('close');
    const sm = document.getElementById('btn-save'); if (sm) sm.textContent = t('save');
    updateSelectedInfo();
}

function updateWelcomeScreen() {
    const hour = new Date().getHours();
    let gk;
    if (hour >= 6 && hour < 12) gk = 'greeting_morning';
    else if (hour >= 12 && hour < 18) gk = 'greeting_day';
    else if (hour >= 18 && hour < 23) gk = 'greeting_evening';
    else gk = 'greeting_night';
    const wg = document.getElementById('welcome-greeting'); if (wg) wg.textContent = t(gk) + '! 👋';
    const wd = document.getElementById('welcome-date');
    if (wd) wd.textContent = new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const sr = document.getElementById('stat-records'); if (sr) sr.textContent = h.length;
    const daysSet = new Set(h.map(r => new Date(r.dateTime).toDateString()));
    const sd = document.getElementById('stat-days'); if (sd) sd.textContent = daysSet.size;
    let streak = 0; const today = new Date().toDateString(); const checkDate = new Date();
    while (true) { if (daysSet.has(checkDate.toDateString())) { streak++; checkDate.setDate(checkDate.getDate() - 1); } else { if (checkDate.toDateString() === today && streak === 0) { checkDate.setDate(checkDate.getDate() - 1); continue; } break; } }
    const ss = document.getElementById('stat-streak'); if (ss) ss.textContent = streak;
    const wm = document.getElementById('welcome-motivation'); if (wm) wm.textContent = t('motivation')[Math.floor(Math.random() * 5)];
    const sb = document.getElementById('btn-start-record'); if (sb) sb.textContent = t('record_btn');
    const gh = document.getElementById('btn-go-history'); if (gh) gh.textContent = t('history_btn');
    const ls = document.getElementById('lang-switch'); if (ls) ls.textContent = lang === 'ru' ? '🌐 English' : '🌐 Русский';
    updateAllTexts();
}

function updateTodayBadge() {
    const td = document.getElementById('today-date');
    if (td) td.textContent = new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' });
}

function updateSelectedInfo() {
    const info = document.getElementById('selected-info');
    if (!info) return;
    info.textContent = (selZ && selOrgan) ? `${t('selected')}: ${selZ} → ${selOrgan}` : selZ ? `${t('selected')}: ${selZ}` : '';
}

// ===== СОСТОЯНИЕ =====
let selZ = null, selOrgan = null, selT = null, selP = null, selI = null, editId = null, currentView = 'body';

const iRow = document.getElementById('intensity-buttons');
if (iRow) { for (let i = 1; i <= 10; i++) { const b = document.createElement('div'); b.className = 'int-btn' + (i >= 7 ? ' high-light' : ''); b.dataset.intensity = i; b.textContent = i; iRow.appendChild(b); } }

const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => { btn.addEventListener('click', () => { viewBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentView = btn.dataset.view; document.getElementById('silhouette-body').style.display = currentView === 'body' ? 'flex' : 'none'; document.getElementById('silhouette-organs').style.display = currentView === 'organs' ? 'flex' : 'none'; }); });

function showApp() { document.getElementById('welcome-screen').style.display = 'none'; document.getElementById('app-screen').style.display = 'block'; updateTodayBadge(); updateAllTexts(); }
function showWelcome() { document.getElementById('app-screen').style.display = 'none'; document.getElementById('welcome-screen').style.display = 'flex'; updateWelcomeScreen(); }

document.getElementById('btn-start-record')?.addEventListener('click', showApp);
document.getElementById('btn-go-history')?.addEventListener('click', () => { showApp(); document.querySelectorAll('.tab').forEach(x => x.classList.remove('active')); document.querySelectorAll('.panel').forEach(p => p.classList.remove('active')); document.querySelector('[data-panel="p-hist"]')?.classList.add('active'); document.getElementById('p-hist')?.classList.add('active'); renHist(); });
document.getElementById('back-btn')?.addEventListener('click', showWelcome);
document.getElementById('lang-switch')?.addEventListener('click', () => { lang = lang === 'ru' ? 'en' : 'ru'; localStorage.setItem('lang', lang); updateWelcomeScreen(); updateTodayBadge(); renHist(); initRep(); const ro = document.getElementById('rep-out'); if (ro) ro.textContent = t('choose_period'); updateAllTexts(); });

document.querySelectorAll('.tab').forEach(tab => { tab.addEventListener('click', () => { document.querySelectorAll('.tab').forEach(x => x.classList.remove('active')); document.querySelectorAll('.panel').forEach(p => p.classList.remove('active')); tab.classList.add('active'); const panel = document.getElementById(tab.dataset.panel); if (panel) panel.classList.add('active'); updateTodayBadge(); if (tab.dataset.panel === 'p-hist') renHist(); if (tab.dataset.panel === 'p-rep') initRep(); }); });

function setupZoneClick(sel) { document.querySelectorAll(sel).forEach(el => { el.addEventListener('click', (e) => { e.stopPropagation(); document.querySelectorAll('.zone').forEach(z => z.classList.remove('active')); el.classList.add('active'); selZ = el.dataset.zone; if (el.dataset.organ) selOrgan = el.dataset.organ; else if (currentView === 'body') selOrgan = null; updateSelectedInfo(); }); }); }
setupZoneClick('#silhouette-body .zone');
setupZoneClick('#silhouette-organs .organ-zone');

function setup(id, attr, key) { const c = document.getElementById(id); if (!c) return; c.querySelectorAll('[data-' + attr + ']').forEach(b => { b.addEventListener('click', () => { c.querySelectorAll(key === 'selI' ? '.int-btn' : '.btn').forEach(x => x.classList.remove('selected')); b.classList.add('selected'); if (key === 'selT') { selT = b.dataset[attr]; const pr = document.getElementById('pain-char-row'); if (pr) pr.style.display = selT === 'Боль' ? 'block' : 'none'; if (selT !== 'Боль') selP = null; } else if (key === 'selP') selP = b.dataset[attr]; else if (key === 'selI') selI = parseInt(b.dataset[attr]); }); }); }
setup('type-buttons', 'type', 'selT');
setup('pain-char-buttons', 'pain-char', 'selP');
setup('intensity-buttons', 'intensity', 'selI');

document.getElementById('save-btn')?.addEventListener('click', () => {
    if (!selZ || !selT || !selI) { const m = []; if (!selZ) m.push(lang === 'ru' ? 'зона' : 'zone'); if (!selT) m.push(lang === 'ru' ? 'тип' : 'type'); if (!selI) m.push(lang === 'ru' ? 'интенсивность' : 'intensity'); alert(t('fill_all') + ': ' + m.join(', ')); return; }
    const rec = { id: Date.now(), dateTime: new Date().toISOString(), zone: selZ, organ: selOrgan || null, type: selT, painChar: selT === 'Боль' ? selP : null, intensity: selI, note: document.getElementById('note').value, context: {} };
    const h = JSON.parse(localStorage.getItem('sh') || '[]'); h.unshift(rec); localStorage.setItem('sh', JSON.stringify(h));
    const sm = document.getElementById('saved-msg'); if (sm) { sm.textContent = t('saved'); sm.classList.add('show'); setTimeout(() => sm.classList.remove('show'), 1500); }
    selZ = selOrgan = selT = selP = selI = null;
    document.querySelectorAll('.zone').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.btn, .int-btn').forEach(x => x.classList.remove('active', 'selected'));
    const pr = document.getElementById('pain-char-row'); if (pr) pr.style.display = 'none';
    const no = document.getElementById('note'); if (no) no.value = '';
    updateSelectedInfo(); updateWelcomeScreen();
});

function renHist() { const h = JSON.parse(localStorage.getItem('sh') || '[]'); const list = document.getElementById('history-list'); if (!list) return; if (!h.length) { list.innerHTML = '<div class="empty-history">' + t('no_records') + '</div>'; return; } const lo = lang === 'ru' ? 'ru-RU' : 'en-US'; list.innerHTML = h.map(r => { const d = new Date(r.dateTime); const ds = d.toLocaleString(lo, { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }); const ic = r.intensity >= 7 ? 'high' : (r.intensity >= 4 ? 'mid' : 'low'); return `<div class="history-item" data-id="${r.id}"><div class="left"><span class="zone-name">${r.zone}${r.organ?' → '+r.organ:''}</span><span class="type-name">${r.type}${r.painChar?', '+r.painChar.toLowerCase():''}</span><span class="date-name">${ds}</span></div><div class="right"><span class="intensity-badge ${ic}">${r.intensity}/10</span><button class="delete-btn" data-del="${r.id}">✕</button></div></div>`; }).join(''); list.querySelectorAll('.history-item').forEach(item => { item.addEventListener('click', e => { if (!e.target.classList.contains('delete-btn')) openMod(parseInt(item.dataset.id)); }); }); list.querySelectorAll('.delete-btn').forEach(b => { b.addEventListener('click', e => { e.stopPropagation(); delRec(parseInt(b.dataset.del)); }); }); }
function delRec(id) { if (!confirm(t('delete_confirm'))) return; let h = JSON.parse(localStorage.getItem('sh') || '[]'); h = h.filter(r => r.id !== id); localStorage.setItem('sh', JSON.stringify(h)); renHist(); updateWelcomeScreen(); }

function openMod(id) { const h = JSON.parse(localStorage.getItem('sh') || '[]'); const r = h.find(x => x.id === id); if (!r) return; editId = id; const d = new Date(r.dateTime); const ctx = r.context || {}; const lo = lang === 'ru' ? 'ru-RU' : 'en-US'; const mc = document.getElementById('modal-content'); if (mc) mc.innerHTML = `<p style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">${d.toLocaleString(lo,{day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'})} — <b>${r.zone}</b>${r.organ?' → <b>'+r.organ+'</b>':''}, ${r.type}${r.painChar?' ('+r.painChar.toLowerCase()+')':''}, <b>${r.intensity}/10</b></p><div class="field"><label>${t('food_label')}</label><input id="cf" value="${ctx.food||''}" placeholder="${lang==='ru'?'кофе':'coffee'}"></div><div class="field"><label>${t('sleep_label')}</label><input id="cs" value="${ctx.sleep||''}" placeholder="6"></div><div class="field"><label>${t('activity_label')}</label><input id="ca" value="${ctx.activity||''}" placeholder="${lang==='ru'?'сидел':'sitting'}"></div><div class="field"><label>${t('weather_label')}</label><input id="cw" value="${ctx.weather||''}" placeholder="${lang==='ru'?'дождь':'rain'}"></div>`; document.getElementById('modal-overlay')?.classList.add('open'); }
function closeMod() { document.getElementById('modal-overlay')?.classList.remove('open'); editId = null; }
document.getElementById('btn-close')?.addEventListener('click', closeMod);
document.getElementById('modal-overlay')?.addEventListener('click', e => { if (e.target === document.getElementById('modal-overlay')) closeMod(); });
document.getElementById('btn-save')?.addEventListener('click', () => { if (!editId) return; const h = JSON.parse(localStorage.getItem('sh') || '[]'); const r = h.find(x => x.id === editId); if (!r) return; r.context = { food: document.getElementById('cf')?.value || '', sleep: document.getElementById('cs')?.value || '', activity: document.getElementById('ca')?.value || '', weather: document.getElementById('cw')?.value || '' }; localStorage.setItem('sh', JSON.stringify(h)); closeMod(); renHist(); });

function initRep() { const n = new Date(); const w = new Date(n.getTime() - 7*24*60*60*1000); const fi = document.getElementById('r-from'); if (fi) fi.value = w.toISOString().split('T')[0]; const ti = document.getElementById('r-to'); if (ti) ti.value = n.toISOString().split('T')[0]; }
document.getElementById('gen-rep')?.addEventListener('click', () => { const fs = document.getElementById('r-from')?.value; const ts = document.getElementById('r-to')?.value; if (!fs || !ts) { alert(t('choose_period')); return; } const f = new Date(fs); const td = new Date(ts + 'T23:59:59'); if (isNaN(f.getTime()) || isNaN(td.getTime())) return; const h = JSON.parse(localStorage.getItem('sh') || '[]'); const fl = h.filter(r => { const d = new Date(r.dateTime); return d >= f && d <= td; }); const ro = document.getElementById('rep-out'); if (!ro) return; if (!fl.length) { ro.textContent = t('no_records_period'); return; } const lo = lang === 'ru' ? 'ru-RU' : 'en-US'; let rep = t('report_title') + '\n' + '═'.repeat(26) + '\n' + f.toLocaleDateString(lo) + ' — ' + td.toLocaleDateString(lo) + '\n' + t('episodes') + ': ' + fl.length + '\n'; let si = 0; fl.forEach(r => { si += r.intensity; }); rep += t('avg_intensity') + ': ' + (si/fl.length).toFixed(1) + '/10\n─'.repeat(26) + '\n'; fl.sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime)).forEach((r,i) => { const d = new Date(r.dateTime); rep += '\n' + (i+1) + '. ' + d.toLocaleString(lo,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) + '\n   ' + r.zone + (r.organ?' → '+r.organ:'') + ', ' + r.type + (r.painChar?' ('+r.painChar.toLowerCase()+')':'') + ', ' + r.intensity + '/10\n'; if (r.context) { if (r.context.food) rep += '   ' + t('food_label') + ': ' + r.context.food + '\n'; if (r.context.sleep) rep += '   ' + t('sleep_label') + ': ' + r.context.sleep + (lang==='ru'?'ч':'h') + '\n'; if (r.context.activity) rep += '   ' + t('activity_label') + ': ' + r.context.activity + '\n'; } if (r.note) rep += '   ' + t('note_label') + ': ' + r.note + '\n'; }); ro.textContent = rep; });
document.getElementById('copy-rep')?.addEventListener('click', () => { const txt = document.getElementById('rep-out')?.textContent; if (!txt || txt === t('choose_period') || txt === t('no_records_period')) return; navigator.clipboard.writeText(txt).then(() => { const btn = document.getElementById('copy-rep'); if (btn) { btn.textContent = t('copied'); setTimeout(() => { btn.textContent = t('copy_btn'); }, 1500); } }); });
document.getElementById('pdf-rep')?.addEventListener('click', () => { const txt = document.getElementById('rep-out')?.textContent; if (!txt || txt === t('choose_period') || txt === t('no_records_period')) return; window.print(); });

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { const sw = ["self.addEventListener('install', e => self.skipWaiting());","self.addEventListener('activate', e => self.clients.claim());","self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });"].join('\n'); navigator.serviceWorker.register(URL.createObjectURL(new Blob([sw],{type:'application/javascript'}))).catch(() => {}); }); }

updateWelcomeScreen(); renHist(); initRep();