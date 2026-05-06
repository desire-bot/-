let selZ = null, selT = null, selP = null, selI = null, editId = null;

// Обновление даты в шапке
function updateTodayBadge() {
    document.getElementById('today-date').textContent = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}
updateTodayBadge();
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateTodayBadge();
});

// Кнопки интенсивности
const iRow = document.getElementById('intensity-buttons');
for (let i = 1; i <= 10; i++) {
    const b = document.createElement('div');
    b.className = 'int-btn' + (i >= 7 ? ' high-light' : '');
    b.dataset.intensity = i;
    b.textContent = i;
    iRow.appendChild(b);
}

// Табы
document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        t.classList.add('active');
        document.getElementById(t.dataset.panel).classList.add('active');
        updateTodayBadge();
        if (t.dataset.panel === 'p-hist') renHist();
        if (t.dataset.panel === 'p-rep') initRep();
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
                document.getElementById('pain-char-row').style.display = selT === 'Боль' ? 'block' : 'none';
                if (selT !== 'Боль') { selP = null; }
            } else if (key === 'selP') selP = b.dataset[attr];
            else if (key === 'selI') selI = parseInt(b.dataset[attr]);
        });
    });
}
setup('type-buttons', 'type', 'selT');
setup('pain-char-buttons', 'pain-char', 'selP');
setup('intensity-buttons', 'intensity', 'selI');

// Сохранение
document.getElementById('save-btn').addEventListener('click', () => {
    if (!selZ || !selT || !selI) return alert('Заполни всё');
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
    document.getElementById('saved-msg').classList.add('show');
    setTimeout(() => document.getElementById('saved-msg').classList.remove('show'), 1500);
    selZ = selT = selP = selI = null;
    document.querySelectorAll('.zone,.btn,.int-btn').forEach(x => x.classList.remove('active','selected'));
    document.getElementById('pain-char-row').style.display = 'none';
    document.getElementById('note').value = '';
});

// История
function renHist() {
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const list = document.getElementById('history-list');
    if (!h.length) { list.innerHTML = '<div class="empty-history">Нет записей</div>'; return; }
    list.innerHTML = h.map(r => {
        const d = new Date(r.dateTime);
        const ds = d.toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        const ic = r.intensity >= 7 ? 'high' : (r.intensity >= 4 ? 'mid' : 'low');
        return `<div class="history-item" data-id="${r.id}"><div class="left"><span class="zone-name">${r.zone}</span><span class="type-name">${r.type}${r.painChar ? ', ' + r.painChar.toLowerCase() : ''}</span><span class="date-name">${ds}</span></div><div class="right"><span class="intensity-badge ${ic}">${r.intensity}/10</span><button class="delete-btn" data-del="${r.id}">✕</button></div></div>`;
    }).join('');
    list.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', e => { if (!e.target.classList.contains('delete-btn')) openMod(parseInt(item.dataset.id)); });
    });
    list.querySelectorAll('.delete-btn').forEach(b => {
        b.addEventListener('click', e => { e.stopPropagation(); delRec(parseInt(b.dataset.del)); });
    });
}

function delRec(id) {
    if (!confirm('Удалить?')) return;
    let h = JSON.parse(localStorage.getItem('sh') || '[]');
    h = h.filter(r => r.id !== id);
    localStorage.setItem('sh', JSON.stringify(h));
    renHist();
}

// Модалка
function openMod(id) {
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const r = h.find(x => x.id === id);
    if (!r) return;
    editId = id;
    const d = new Date(r.dateTime);
    const ctx = r.context || {};
    document.getElementById('modal-content').innerHTML = `
        <p style="font-size:11px;color:var(--text-secondary);margin-bottom:8px;">${d.toLocaleString('ru-RU',{day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'})} — <b>${r.zone}</b>, ${r.type}${r.painChar?' ('+r.painChar.toLowerCase()+')':''}, <b>${r.intensity}/10</b></p>
        <div class="field"><label>Еда</label><input id="cf" value="${ctx.food||''}" placeholder="кофе"></div>
        <div class="field"><label>Сон (ч)</label><input id="cs" value="${ctx.sleep||''}" placeholder="6"></div>
        <div class="field"><label>Действие</label><input id="ca" value="${ctx.activity||''}" placeholder="сидел"></div>
        <div class="field"><label>Погода</label><input id="cw" value="${ctx.weather||''}" placeholder="дождь"></div>
    `;
    document.getElementById('modal-overlay').classList.add('open');
}

function closeMod() { document.getElementById('modal-overlay').classList.remove('open'); editId = null; }
document.getElementById('btn-close').addEventListener('click', closeMod);
document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === document.getElementById('modal-overlay')) closeMod(); });
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

// Отчёт
function initRep() {
    const n = new Date();
    const w = new Date(n.getTime() - 7*24*60*60*1000);
    document.getElementById('r-from').value = w.toISOString().split('T')[0];
    document.getElementById('r-to').value = n.toISOString().split('T')[0];
}

document.getElementById('gen-rep').addEventListener('click', () => {
    const f = new Date(document.getElementById('r-from').value);
    const t = new Date(document.getElementById('r-to').value + 'T23:59:59');
    if (isNaN(f) || isNaN(t)) return;
    const h = JSON.parse(localStorage.getItem('sh') || '[]');
    const fl = h.filter(r => { const d = new Date(r.dateTime); return d >= f && d <= t; });
    if (!fl.length) { document.getElementById('rep-out').textContent = 'Нет записей.'; return; }
    let rep = `ОТЧЁТ ДЛЯ ВРАЧА\n${'═'.repeat(26)}\n${f.toLocaleDateString('ru-RU')} — ${t.toLocaleDateString('ru-RU')}\nЭпизодов: ${fl.length}\n`;
    let si = 0;
    fl.forEach(r => si += r.intensity);
    rep += `Ср. интенсивность: ${(si/fl.length).toFixed(1)}/10\n${'─'.repeat(26)}\n`;
    fl.sort((a,b) => new Date(a.dateTime)-new Date(b.dateTime)).forEach((r,i) => {
        const d = new Date(r.dateTime);
        rep += `\n${i+1}. ${d.toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}\n   ${r.zone}, ${r.type}${r.painChar?' ('+r.painChar.toLowerCase()+')':''}, ${r.intensity}/10\n`;
        if (r.context) {
            if (r.context.food) rep += `   Еда: ${r.context.food}\n`;
            if (r.context.sleep) rep += `   Сон: ${r.context.sleep}ч\n`;
            if (r.context.activity) rep += `   Действие: ${r.context.activity}\n`;
        }
        if (r.note) rep += `   Заметка: ${r.note}\n`;
    });
    document.getElementById('rep-out').textContent = rep;
});

document.getElementById('copy-rep').addEventListener('click', () => {
    const t = document.getElementById('rep-out').textContent;
    if (t.startsWith('Выбери')) return;
    navigator.clipboard.writeText(t).then(() => {
        const b = document.getElementById('copy-rep');
        b.textContent = '✅ Скопировано!';
        setTimeout(() => b.textContent = '📋 Скопировать', 1500);
    });
});

// PWA Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const sw = new Blob(["self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>self.clients.claim());self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});"], {type:'application/javascript'});
        navigator.serviceWorker.register(URL.createObjectURL(sw)).catch(()=>{});
    });
}

// Первый рендер
renHist();