// Kontoplan (förenklad svensk kontoplan)
const accounts = {
    "Tillgångar": [
        { number: "1210", name: "Maskiner" },
        { number: "1219", name: "Ack. avskrivningar maskiner" },
        { number: "1220", name: "Inventarier" },
        { number: "1229", name: "Ack. avskrivningar inventarier" },
        { number: "1240", name: "Bilar" },
        { number: "1249", name: "Ack. avskrivningar på bilar" },
        { number: "1250", name: "Datorer" },
        { number: "1259", name: "Ack. avskrivningar på datorer" },
        { number: "1400", name: "Varulager" },
        { number: "1510", name: "Kundfordringar" },
        { number: "1580", name: "Fordran kontokort" },
        { number: "1630", name: "Skattekonto" },
        { number: "1710", name: "Förutbetald hyra" },
        { number: "1730", name: "Förutbetald försäkring" },
        { number: "1790", name: "Upplupna intäkter och förutbetalda kostnader" },
        { number: "1910", name: "Kassa" },
        { number: "1920", name: "Plusgiro" },
        { number: "1930", name: "Företagskonto" },
        { number: "1940", name: "Bank" }
    ],
    "Skulder och Eget Kapital": [
        { number: "2010", name: "Eget kapital" },
        { number: "2012", name: "Skattekonto" },
        { number: "2013", name: "Eget uttag" },
        { number: "2018", name: "Egen insattning" },
        { number: "2019", name: "Årets resultat" },
        { number: "2081", name: "Aktiekapital" },
        { number: "2091", name: "Balanserad vinst" },
        { number: "2098", name: "Föregående års vinst" },
        { number: "2099", name: "Årets resultat" },
        { number: "2350", name: "Banklån" },
        { number: "2440", name: "Leverantörsskulder" },
        { number: "2490", name: "Övriga skulder" },
        { number: "2610", name: "Utgående moms, 25%" },
        { number: "2620", name: "Utgående moms, 12%" },
        { number: "2630", name: "Utgående moms, 6%" },
        { number: "2615", name: "Beräknad utgående EU-moms" },
        { number: "2640", name: "Ingående moms" },
        { number: "2645", name: "Beräknad ingående EU-moms" },
        { number: "2650", name: "Momsredovisning" },
        { number: "2710", name: "Personalens skatter" },
        { number: "2730", name: "Skuld for sociala avgifter" },
        { number: "2960", name: "Upplupen ränta" },
        { number: "2990", name: "Upplupna kostnader och förutbetalda intakter" }
    ],
    "Intäkter": [
        { number: "3010", name: "Varuförsäljning" },
        { number: "3030", name: "Utförda uppdrag" },
        { number: "3730", name: "Lämnade rabatter" },
        { number: "3960", name: "Kursvinster" },
        { number: "3973", name: "Vinst vid avyttring" }
    ],
    "Kostnader": [
        { number: "4010", name: "Varuinköp" },
        { number: "4730", name: "Erhållna rabatter" },
        { number: "4900", name: "Varulagerforandring" },
        { number: "5010", name: "Lokalhyra" },
        { number: "5060", name: "Städning" },
        { number: "5410", name: "Förbrukningsinventarier" },
        { number: "5460", name: "Forbrukningsmaterial" },
        { number: "5610", name: "Driftkostnader bilar" },
        { number: "5800", name: "Resekostnader" },
        { number: "5900", name: "Reklam" },
        { number: "6040", name: "Kontokortsavgifter" },
        { number: "6100", name: "Kontorsmaterial" },
        { number: "6200", name: "Tele och post" },
        { number: "6310", name: "Försäkringar" },
        { number: "6990", name: "Övriga kostnader" },
        { number: "7010", name: "Löner" },
        { number: "7510", name: "Arbetsgivaravgifter" },
        { number: "7832", name: "Avskrivning mask/inve" },
        { number: "7834", name: "Avskrivning bilar" },
        { number: "7973", name: "Förlust vid avyttring" },
        { number: "7960", name: "Kursförlust" }
    ],
    "Finansiella poster": [
        { number: "8310", name: "Ränteintäkter" },
        { number: "8320", name: "Erhållen dröjsmålsränta" },
        { number: "8410", name: "Räntekostnader" },
        { number: "8420", name: "Erlagd dröjmålsränta" },
        { number: "8999", name: "Årets resultat" }
    ]
};

// Ljudeffekter med Web Audio API
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Aktivera ljud vid första interaktion
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

function playCorrectSound() {
    if (!audioContext) return;
    // Pling-ljud för rätt svar
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    oscillator.frequency.setValueAtTime(1108.73, audioContext.currentTime + 0.1); // C#6
    oscillator.frequency.setValueAtTime(1318.51, audioContext.currentTime + 0.2); // E6

    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
}

function playWrongSound() {
    if (!audioContext) return;
    // Mjukt buzz-ljud för fel svar
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.15);

    oscillator.type = 'triangle';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Affärshändelser med rätta svar
const defaultEvents = [
    {
        description: "Du säljer varor för 10 000 kr på kredit exklusive moms. Kontera denna händelse.",
        hint: "Tänk på att en försäljning på kredit innebär att kunden betalar senare (kundfordran). Glöm inte momsen som är 25%!",
        correctAnswer: [
            { account: "1510", side: "debet", amount: 12500 },
            { account: "3010", side: "kredit", amount: 10000 },
            { account: "2610", side: "kredit", amount: 2500 }
        ],
        level: 1
    },
    {
        description: "Du betalar lokalhyra med 5 000 kr från banken. Kontera denna händelse.",
        hint: "Hyra är en kostnad och betalning sker från banken.",
        correctAnswer: [
            { account: "5010", side: "debet", amount: 5000 },
            { account: "1930", side: "kredit", amount: 5000 }
        ],
        level: 1
    },
    {
        description: "Du köper in varor för 8 000 kr exklusive moms på kredit. Kontera denna händelse.",
        hint: "Inköp på kredit innebär leverantörsskuld. Momsen är avdragsgill (ingående moms).",
        correctAnswer: [
            { account: "4010", side: "debet", amount: 8000 },
            { account: "2640", side: "debet", amount: 2000 },
            { account: "2440", side: "kredit", amount: 10000 }
        ],
        level: 1
    },
    {
        description: "En kund betalar 15 000 kr till ditt bankkonto. Kontera denna händelse.",
        hint: "Betalning från kund innebär att kundfordran minskar och banken ökar.",
        correctAnswer: [
            { account: "1930", side: "debet", amount: 15000 },
            { account: "1510", side: "kredit", amount: 15000 }
        ],
        level: 1
    },
    {
        description: "Du betalar leverantörsskuld på 7 500 kr från banken. Kontera denna händelse.",
        hint: "Betalning av skuld minskar både skulden och bankkontot.",
        correctAnswer: [
            { account: "2440", side: "debet", amount: 7500 },
            { account: "1930", side: "kredit", amount: 7500 }
        ],
        level: 1
    },
    {
        description: "Du säljer varor för 20 000 kr kontant (kassan) exklusive moms. Kontera denna händelse.",
        hint: "Kontant försäljning går till kassan. Glöm inte 25% moms!",
        correctAnswer: [
            { account: "1910", side: "debet", amount: 25000 },
            { account: "3010", side: "kredit", amount: 20000 },
            { account: "2610", side: "kredit", amount: 5000 }
        ],
        level: 2
    },
    {
        description: "Du betalar ut lön 30 000 kr från banken. Kontera denna händelse.",
        hint: "Lön är en kostnad som betalas från banken.",
        correctAnswer: [
            { account: "7010", side: "debet", amount: 30000 },
            { account: "1930", side: "kredit", amount: 30000 }
        ],
        level: 2
    },
    {
        description: "Du tar ut 3 000 kr från banken till kassan. Kontera denna händelse.",
        hint: "Pengarna flyttas från bank till kassa - båda är tillgångskonton.",
        correctAnswer: [
            { account: "1910", side: "debet", amount: 3000 },
            { account: "1930", side: "kredit", amount: 3000 }
        ],
        level: 2
    },
    {
        description: "Du har representationskostnader på 2 000 kr exklusive moms och betalar kontant. Kontera denna händelse.",
        hint: "Representation är en kostnad. Moms på representation är avdragsgill (ingående moms).",
        correctAnswer: [
            { account: "6990", side: "debet", amount: 2000 },
            { account: "2640", side: "debet", amount: 500 },
            { account: "1910", side: "kredit", amount: 2500 }
        ],
        level: 2
    },
    {
        description: "Du betalar arbetsgivaravgifter 9 450 kr från banken. Kontera denna händelse.",
        hint: "Arbetsgivaravgifter är en personalkostnad som betalas från banken.",
        correctAnswer: [
            { account: "7510", side: "debet", amount: 9450 },
            { account: "1930", side: "kredit", amount: 9450 }
        ],
        level: 2
    }
];

// Aktuella händelser (kan bytas ut med inladdade)
let events = [...defaultEvents];

// Spelvariabler
let currentEventIndex = 0;
let score = 0;
let level = 1;
let correctCount = 0;
let incorrectCount = 0;
let bookingRows = [];
let streak = 0;
let bestStreak = 0;
let highScore = 0;
let totalCorrect = 0;
let totalIncorrect = 0;
let levelStartTime = null;

// Sessionsstatistik (nollställs vid sidomladdning)
let sessionCorrect = 0;
let sessionIncorrect = 0;
const sessionStartTime = Date.now();

// Achievements
const achievements = {
    firstCorrect: { id: 'firstCorrect', name: 'Första steget', description: 'Svara rätt på din första fråga', icon: '🌟', unlocked: false },
    streak5: { id: 'streak5', name: 'Uppvärmd', description: '5 rätt i rad', icon: '🔥', unlocked: false },
    streak10: { id: 'streak10', name: 'Het svit', description: '10 rätt i rad', icon: '💥', unlocked: false },
    streak25: { id: 'streak25', name: 'Ostoppbar', description: '25 rätt i rad', icon: '⚡', unlocked: false },
    streak50: { id: 'streak50', name: 'Maskin', description: '50 rätt i rad', icon: '🤖', unlocked: false },
    score5000: { id: 'score5000', name: 'Tusingen', description: 'Nå 5 000 poäng', icon: '💰', unlocked: false },
    score25000: { id: 'score25000', name: 'Poängproffs', description: 'Nå 25 000 poäng', icon: '💎', unlocked: false },
    score100000: { id: 'score100000', name: 'Bokföringslegend', description: 'Nå 100 000 poäng', icon: '👑', unlocked: false },
    level2: { id: 'level2', name: 'Nivå 2 klar', description: 'Klara alla övningar på nivå 2', icon: '📈', unlocked: false },
    level3: { id: 'level3', name: 'Momsmästare', description: 'Klara alla övningar på nivå 3', icon: '🏆', unlocked: false },
    perfect15: { id: 'perfect15', name: 'Noggrann', description: '15 rätt utan fel i session', icon: '✨', unlocked: false },
    perfect50: { id: 'perfect50', name: 'Perfektionist', description: '50 rätt utan fel i session', icon: '💫', unlocked: false },
    total100: { id: 'total100', name: 'Flitig student', description: '100 rätta svar totalt', icon: '📚', unlocked: false },
    total500: { id: 'total500', name: 'Expert', description: '500 rätta svar totalt', icon: '🎓', unlocked: false },
    total1000: { id: 'total1000', name: 'Mästare', description: '1000 rätta svar totalt', icon: '🏅', unlocked: false }
};

// Spara till localStorage
function saveProgress() {
    const data = {
        highScore,
        bestStreak,
        totalCorrect,
        totalIncorrect,
        achievements: Object.fromEntries(
            Object.entries(achievements).map(([key, val]) => [key, val.unlocked])
        )
    };
    localStorage.setItem('bokforingsakuten_progress', JSON.stringify(data));
}

// Ladda från localStorage
function loadProgress() {
    const saved = localStorage.getItem('bokforingsakuten_progress');
    if (saved) {
        const data = JSON.parse(saved);
        highScore = data.highScore || 0;
        bestStreak = data.bestStreak || 0;
        totalCorrect = data.totalCorrect || 0;
        totalIncorrect = data.totalIncorrect || 0;

        // Återställ achievements
        if (data.achievements) {
            Object.keys(data.achievements).forEach(key => {
                if (achievements[key]) {
                    achievements[key].unlocked = data.achievements[key];
                }
            });
        }
    }
}

// Kontrollera och lås upp achievements
function checkAchievements() {
    const newAchievements = [];

    // Första rätt
    if (!achievements.firstCorrect.unlocked && totalCorrect >= 1) {
        achievements.firstCorrect.unlocked = true;
        newAchievements.push(achievements.firstCorrect);
    }

    // Streak achievements
    if (!achievements.streak5.unlocked && streak >= 5) {
        achievements.streak5.unlocked = true;
        newAchievements.push(achievements.streak5);
    }
    if (!achievements.streak10.unlocked && streak >= 10) {
        achievements.streak10.unlocked = true;
        newAchievements.push(achievements.streak10);
    }
    if (!achievements.streak25.unlocked && streak >= 25) {
        achievements.streak25.unlocked = true;
        newAchievements.push(achievements.streak25);
    }
    if (!achievements.streak50.unlocked && streak >= 50) {
        achievements.streak50.unlocked = true;
        newAchievements.push(achievements.streak50);
    }

    // Poäng achievements
    if (!achievements.score5000.unlocked && score >= 5000) {
        achievements.score5000.unlocked = true;
        newAchievements.push(achievements.score5000);
    }
    if (!achievements.score25000.unlocked && score >= 25000) {
        achievements.score25000.unlocked = true;
        newAchievements.push(achievements.score25000);
    }
    if (!achievements.score100000.unlocked && score >= 100000) {
        achievements.score100000.unlocked = true;
        newAchievements.push(achievements.score100000);
    }

    // Totalt rätt
    if (!achievements.total100.unlocked && totalCorrect >= 100) {
        achievements.total100.unlocked = true;
        newAchievements.push(achievements.total100);
    }
    if (!achievements.total500.unlocked && totalCorrect >= 500) {
        achievements.total500.unlocked = true;
        newAchievements.push(achievements.total500);
    }
    if (!achievements.total1000.unlocked && totalCorrect >= 1000) {
        achievements.total1000.unlocked = true;
        newAchievements.push(achievements.total1000);
    }

    // Perfektionist (rätt utan fel i en session)
    if (!achievements.perfect15.unlocked && correctCount >= 15 && incorrectCount === 0) {
        achievements.perfect15.unlocked = true;
        newAchievements.push(achievements.perfect15);
    }
    if (!achievements.perfect50.unlocked && correctCount >= 50 && incorrectCount === 0) {
        achievements.perfect50.unlocked = true;
        newAchievements.push(achievements.perfect50);
    }

    // Visa nya achievements
    newAchievements.forEach(achievement => {
        showAchievementPopup(achievement);
    });

    if (newAchievements.length > 0) {
        saveProgress();
        renderAchievements();
    }
}

// Visa achievement popup
function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <div class="achievement-title">Utmärkelse upplåst!</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
        </div>
    `;
    document.body.appendChild(popup);

    // Ta bort efter animation
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Rendera achievements i sidofältet
function renderAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;

    const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
    const totalCount = Object.keys(achievements).length;

    container.innerHTML = `
        <div class="achievements-progress">
            ${unlockedCount} / ${totalCount} upplåsta
        </div>
        ${Object.values(achievements).map(a => `
            <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-badge">${a.unlocked ? a.icon : '🔒'}</span>
                <div class="achievement-text">
                    <div class="achievement-item-name">${a.name}</div>
                    <div class="achievement-item-desc">${a.description}</div>
                </div>
            </div>
        `).join('')}
    `;
}

// Initialisera spelet
async function init() {
    loadProgress();
    renderAccountPlan();
    renderAchievements();
    setupEventListeners();
    updateStats();
    // Ladda nivå 1 som standard
    await loadLevel(1);
}

// Rendera kontoplanen
function renderAccountPlan() {
    const accountList = document.getElementById('account-list');
    let html = '';

    for (const [category, accountArray] of Object.entries(accounts)) {
        html += `
            <div class="account-group">
                <div class="account-group-title">${category}</div>
                ${accountArray.map(acc => `
                    <div class="account-item">
                        <span class="account-number">${acc.number}</span>
                        <span>${acc.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    accountList.innerHTML = html;
}

// Ladda en händelse
// Avgör övningstyp
function getExerciseType(event) {
    return event.type || 'classic';
}

// Dölj alla övningsytor
function hideAllExerciseAreas() {
    const bookingArea = document.querySelector('.booking-area');
    const dragArea = document.getElementById('drag-exercise-area');
    const addRowBtn = document.getElementById('add-row');

    if (bookingArea) bookingArea.style.display = 'none';
    if (dragArea) dragArea.style.display = 'none';
    if (addRowBtn) addRowBtn.style.display = 'none';
}

function loadEvent() {
    const event = events[currentEventIndex];
    document.getElementById('event-description').textContent = event.description;
    document.getElementById('event-counter').textContent = `Händelse ${currentEventIndex + 1} av ${events.length}`;
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('hint').style.display = 'none';
    document.getElementById('next-event').style.display = 'none';
    document.getElementById('check-answer').style.display = 'block';
    document.getElementById('skip-event').style.display = 'block';

    // Dölj mini-balansräkningen vid ny uppgift
    hideMiniBalance();

    // Dölj alla övningsytor först
    hideAllExerciseAreas();

    // Rendera rätt övningstyp
    const type = getExerciseType(event);

    if (type === 'classic') {
        // Visa klassisk bokföringsyta
        document.querySelector('.booking-area').style.display = 'block';
        document.getElementById('add-row').style.display = 'block';
        bookingRows = [];
        renderBookingRows();
        addBookingRow();
    } else {
        // Visa drag-and-drop yta
        document.getElementById('drag-exercise-area').style.display = 'block';
        renderDragExercise(event, type);
    }

    // Scrolla till uppgiften
    const eventCard = document.querySelector('.event-card');
    if (eventCard) {
        eventCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Lägg till bokföringsrad
function addBookingRow() {
    bookingRows.push({
        account: '',
        debetAmount: '',
        kreditAmount: ''
    });
    renderBookingRows();
}

// Ta bort bokföringsrad
function removeBookingRow(index) {
    bookingRows.splice(index, 1);
    renderBookingRows();
}

// Rendera bokföringsrader
// Hitta liknande konton baserat på kontoklass (första siffran)
function getSimilarAccounts(correctAccountNumbers, count = 7) {
    const allAccounts = [];
    for (const accountArray of Object.values(accounts)) {
        allAccounts.push(...accountArray);
    }

    // Hitta alla kontoklasser som används i rätt svar
    const usedClasses = new Set(correctAccountNumbers.map(num => num.charAt(0)));

    // Samla alla konton i samma klasser som inte är rätt svar
    const similarAccounts = allAccounts.filter(acc =>
        usedClasses.has(acc.number.charAt(0)) &&
        !correctAccountNumbers.includes(acc.number)
    );

    // Blanda och returnera önskat antal
    const shuffled = similarAccounts.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function renderBookingRows() {
    const container = document.getElementById('booking-entries');
    const event = events[currentEventIndex];

    // Hämta konton som används i uppgiften
    const usedAccountNumbers = event.correctAnswer.map(entry => entry.account);

    // Filtrera till rätta konton
    const correctAccounts = [];
    for (const accountArray of Object.values(accounts)) {
        for (const acc of accountArray) {
            if (usedAccountNumbers.includes(acc.number)) {
                correctAccounts.push(acc);
            }
        }
    }

    // Lägg till 7 liknande konton som distraktorer
    const distractorAccounts = getSimilarAccounts(usedAccountNumbers, 7);

    // Kombinera och sortera
    const relevantAccounts = [...correctAccounts, ...distractorAccounts];
    relevantAccounts.sort((a, b) => a.number.localeCompare(b.number));

    container.innerHTML = bookingRows.map((row, index) => {
        return `
        <tr>
            <td colspan="2">
                <select class="account-select" data-index="${index}" data-field="account"
                        aria-label="Välj konto för rad ${index + 1}">
                    <option value="">Välj konto...</option>
                    ${relevantAccounts.map(acc => `
                        <option value="${acc.number}" ${row.account === acc.number ? 'selected' : ''}>
                            ${acc.number} - ${acc.name}
                        </option>
                    `).join('')}
                </select>
            </td>
            <td>
                <input type="number"
                       data-index="${index}"
                       data-field="debetAmount"
                       value="${row.debetAmount}"
                       placeholder="0"
                       min="0"
                       step="0.01"
                       aria-label="Debetbelopp för rad ${index + 1}">
            </td>
            <td>
                <input type="number"
                       data-index="${index}"
                       data-field="kreditAmount"
                       value="${row.kreditAmount}"
                       placeholder="0"
                       min="0"
                       step="0.01"
                       aria-label="Kreditbelopp för rad ${index + 1}">
            </td>
            <td>
                <button class="btn-remove" data-index="${index}" aria-label="Ta bort rad ${index + 1}">✕</button>
            </td>
        </tr>
    `}).join('');

    // Event listeners för inputs
    container.querySelectorAll('select, input').forEach(el => {
        el.addEventListener('change', handleInputChange);
        el.addEventListener('input', handleInputChange);
    });

    container.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeBookingRow(index);
        });
    });

    updateTotals();
}

// Uppdatera summering
function updateTotals() {
    const debetSum = bookingRows.reduce((sum, row) => sum + (parseFloat(row.debetAmount) || 0), 0);
    const kreditSum = bookingRows.reduce((sum, row) => sum + (parseFloat(row.kreditAmount) || 0), 0);

    const debetEl = document.getElementById('total-debet');
    const kreditEl = document.getElementById('total-kredit');

    debetEl.textContent = debetSum.toLocaleString('sv-SE');
    kreditEl.textContent = kreditSum.toLocaleString('sv-SE');

    // Visa om det balanserar
    const isBalanced = Math.abs(debetSum - kreditSum) < 0.01 && debetSum > 0;

    debetEl.className = 'total-cell' + (isBalanced ? ' balance-ok' : (debetSum > 0 ? ' balance-error' : ''));
    kreditEl.className = 'total-cell' + (isBalanced ? ' balance-ok' : (kreditSum > 0 ? ' balance-error' : ''));
}

// Hantera input-ändringar
function handleInputChange(e) {
    const index = parseInt(e.target.dataset.index);
    const field = e.target.dataset.field;
    let value = e.target.value;

    if (field === 'debetAmount' || field === 'kreditAmount') {
        value = parseFloat(value) || '';
    }

    bookingRows[index][field] = value;

    // Uppdatera kontonamn om konto ändrades
    if (field === 'account') {
        renderBookingRows();
    } else {
        updateTotals();
    }
}

// Kontrollera svar
function checkAnswer() {
    const event = events[currentEventIndex];
    const type = getExerciseType(event);

    let isCorrect = null;

    // Hantera olika övningstyper
    if (type === 'drag-to-side') {
        isCorrect = checkDragToSideAnswer(event);
    } else if (type === 'true-false') {
        isCorrect = checkTrueFalseAnswer(event);
    } else {
        // Klassisk konteringsövning
        isCorrect = checkClassicAnswer(event);
    }

    // Om null returnerades betyder det att validering misslyckades och feedback visades
    if (isCorrect === null) return;

    // Resten av funktionen hanterar poäng och feedback
    handleAnswerResult(isCorrect, event);
}

// Klassisk konteringsvalidering
function checkClassicAnswer(event) {
    // Konvertera nya formatet till gammalt format för jämförelse
    const userAnswer = [];
    bookingRows.forEach(row => {
        if (row.account) {
            if (row.debetAmount && parseFloat(row.debetAmount) > 0) {
                userAnswer.push({
                    account: row.account,
                    side: 'debet',
                    amount: parseFloat(row.debetAmount)
                });
            }
            if (row.kreditAmount && parseFloat(row.kreditAmount) > 0) {
                userAnswer.push({
                    account: row.account,
                    side: 'kredit',
                    amount: parseFloat(row.kreditAmount)
                });
            }
        }
    });

    // Kolla om det finns rader med belopp men inget konto valt
    const rowsWithoutAccount = bookingRows.filter(row =>
        !row.account && (row.debetAmount || row.kreditAmount)
    );
    if (rowsWithoutAccount.length > 0) {
        showFeedback(false, "Välj konto först!\n\nDu har fyllt i belopp men inte valt vilket konto det gäller. Använd dropdown-menyn för att välja rätt konto.");
        return null;
    }

    // Validera att det finns svar
    if (userAnswer.length === 0) {
        showFeedback(false, "Ingen kontering gjord\n\nFyll i minst en bokföringspost genom att:\n1. Välja ett konto i dropdown-menyn\n2. Ange belopp i Debet eller Kredit");
        return null;
    }

    // Kontrollera att debet = kredit
    const debetSum = userAnswer
        .filter(row => row.side === 'debet')
        .reduce((sum, row) => sum + row.amount, 0);

    const kreditSum = userAnswer
        .filter(row => row.side === 'kredit')
        .reduce((sum, row) => sum + row.amount, 0);

    if (Math.abs(debetSum - kreditSum) > 0.01) {
        const diff = Math.abs(debetSum - kreditSum);
        showFeedback(false, `Bokföringen balanserar inte!\n\nDebet: ${debetSum.toLocaleString('sv-SE')} kr\nKredit: ${kreditSum.toLocaleString('sv-SE')} kr\nDifferens: ${diff.toLocaleString('sv-SE')} kr\n\n💡 Tips: I bokföring måste summa debet alltid vara lika med summa kredit.`);
        return null;
    }

    // Kontrollera om svaret är korrekt
    return compareAnswers(userAnswer, event.correctAnswer);
}

// Hantera resultat (poäng, streak, feedback)
function handleAnswerResult(isCorrect, event) {
    const type = getExerciseType(event);

    if (isCorrect) {
        correctCount++;
        totalCorrect++;
        sessionCorrect++;
        streak++;

        // Uppdatera bästa streak
        if (streak > bestStreak) {
            bestStreak = streak;
        }

        // Beräkna poäng med streak-bonus
        let basePoints = event.level * 100;
        let streakBonus = Math.min(streak - 1, 5) * 10; // Max 50 bonus
        const points = basePoints + streakBonus;
        score += points;

        // Uppdatera highscore
        if (score > highScore) {
            highScore = score;
        }

        // Kolla om användaren ska uppgradera nivå
        if (correctCount % 3 === 0) {
            level++;
        }

        // Kolla achievements
        checkAchievements();

        // Spara progress
        saveProgress();

        updateStats();

        let message = `Rätt! Du fick ${points} poäng!`;
        if (streakBonus > 0) {
            message += ` (inkl. ${streakBonus} streak-bonus)`;
        }
        if (streak >= 3) {
            message += `\n🔥 ${streak} rätt i rad!`;
        }
        showFeedback(true, message);

        // Visa mini-balansräkning med animation (endast för klassisk och drag-to-side)
        if (type === 'classic' && event.correctAnswer) {
            showMiniBalance(event.correctAnswer);
        }

        // Markera korrekta block för drag-övningar
        if (type !== 'classic') {
            markDragBlocksCorrect();
        }
    } else {
        incorrectCount++;
        totalIncorrect++;
        sessionIncorrect++;
        streak = 0; // Återställ streak

        saveProgress();
        updateStats();

        let explanation = getIncorrectExplanation(event, type);
        showFeedback(false, explanation);

        // Markera felaktiga block för drag-övningar
        if (type !== 'classic') {
            markDragBlocksIncorrect();
        }
    }

    document.getElementById('check-answer').style.display = 'none';
    document.getElementById('skip-event').style.display = 'none';
    document.getElementById('next-event').style.display = 'block';
}

// Hoppa över uppgift (räknas som fel)
function skipEvent() {
    const event = events[currentEventIndex];

    // Räkna som fel
    incorrectCount++;
    totalIncorrect++;
    sessionIncorrect++;
    streak = 0;

    saveProgress();
    updateStats();

    // Visa rätt svar
    let explanation = "Hoppade över uppgiften. Så här ska det konteras:\n\n";
    event.correctAnswer.forEach(entry => {
        const accountInfo = findAccountByNumber(entry.account);
        const accountName = accountInfo ? accountInfo.name : 'Okänt konto';
        const side = entry.side === 'debet' ? 'Debet' : 'Kredit';
        explanation += `📌 ${entry.account} ${accountName}\n     ${side}: ${entry.amount.toLocaleString('sv-SE')} kr\n\n`;
    });

    explanation += "📖 Studera svaret ovan innan du går vidare!";

    showFeedback(false, explanation);

    document.getElementById('check-answer').style.display = 'none';
    document.getElementById('skip-event').style.display = 'none';
    document.getElementById('next-event').style.display = 'block';
}

// ==========================================
// DRAG AND DROP ÖVNINGAR
// ==========================================

let draggedElement = null;
let touchClone = null;
let currentDropTarget = null;

// Generera förklaring vid fel svar
function getIncorrectExplanation(event, type) {
    if (type === 'drag-to-side') {
        let explanation = "Inte riktigt rätt. Rätt placering:\n\n";
        explanation += "📌 DEBET:\n";
        event.correctAnswer.debet.forEach(acc => {
            const block = event.blocks.find(b => b.account === acc);
            if (block) {
                explanation += `   ${block.account} ${block.name} (${block.amount.toLocaleString('sv-SE')} kr)\n`;
            }
        });
        explanation += "\n📌 KREDIT:\n";
        event.correctAnswer.kredit.forEach(acc => {
            const block = event.blocks.find(b => b.account === acc);
            if (block) {
                explanation += `   ${block.account} ${block.name} (${block.amount.toLocaleString('sv-SE')} kr)\n`;
            }
        });
        return explanation;
    } else if (type === 'build-entry') {
        let explanation = "Inte riktigt rätt ordning. Rätt ordning:\n\n";
        event.correctOrder.forEach((id, idx) => {
            const block = event.blocks.find(b => b.id === id);
            if (block) {
                explanation += `${idx + 1}. ${block.side.toUpperCase()}: ${block.account} ${block.name} (${block.amount.toLocaleString('sv-SE')} kr)\n`;
            }
        });
        return explanation;
    } else if (type === 'true-false') {
        const correct = event.correctAnswer ? 'SANT' : 'FALSKT';
        return `Svaret är ${correct}.\n\n${event.explanation || ''}`;
    } else {
        // Klassisk
        let explanation = "Inte riktigt rätt. Så här ska det konteras:\n\n";
        event.correctAnswer.forEach(entry => {
            const accountInfo = findAccountByNumber(entry.account);
            const accountName = accountInfo ? accountInfo.name : 'Okänt konto';
            const side = entry.side === 'debet' ? 'Debet' : 'Kredit';
            explanation += `📌 ${entry.account} ${accountName}\n     ${side}: ${entry.amount.toLocaleString('sv-SE')} kr\n\n`;
        });
        explanation += "💡 Tips: Läs igenom händelsen igen och tänk på vilka konton som påverkas.";
        return explanation;
    }
}

// Markera block som korrekta
function markDragBlocksCorrect() {
    document.querySelectorAll('.draggable-block').forEach(block => {
        block.classList.add('correct');
    });
}

// Markera block som felaktiga
function markDragBlocksIncorrect() {
    document.querySelectorAll('.draggable-block').forEach(block => {
        block.classList.add('incorrect');
    });
}

// Router för interaktiva övningar
function renderDragExercise(event, type) {
    const container = document.getElementById('drag-exercise-area');

    if (type === 'drag-to-side') {
        renderDragToSide(event, container);
    } else if (type === 'true-false') {
        renderTrueFalse(event, container);
    }
}

// Sant/Falskt övning
function renderTrueFalse(event, container) {
    container.innerHTML = `
        <div class="true-false-exercise">
            <div class="statement-box">
                ${event.statement}
            </div>
            <div class="true-false-buttons">
                <button class="tf-btn true-btn" data-answer="true">Sant</button>
                <button class="tf-btn false-btn" data-answer="false">Falskt</button>
            </div>
        </div>
    `;

    initTrueFalseListeners();
}

let selectedTrueFalse = null;

function initTrueFalseListeners() {
    const buttons = document.querySelectorAll('.tf-btn');
    selectedTrueFalse = null;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Ta bort tidigare val
            buttons.forEach(b => b.classList.remove('selected'));
            // Markera valt
            btn.classList.add('selected');
            selectedTrueFalse = btn.dataset.answer === 'true';
        });
    });
}

function checkTrueFalseAnswer(event) {
    if (selectedTrueFalse === null) {
        showFeedback(false, "Välj Sant eller Falskt!");
        return null;
    }

    const isCorrect = selectedTrueFalse === event.correctAnswer;

    // Markera knapparna
    const buttons = document.querySelectorAll('.tf-btn');
    buttons.forEach(btn => {
        const btnAnswer = btn.dataset.answer === 'true';
        if (btnAnswer === event.correctAnswer) {
            btn.classList.add('correct-answer');
        } else if (btn.classList.contains('selected') && !isCorrect) {
            btn.classList.add('wrong-answer');
        }
    });

    return isCorrect;
}

// Typ 1: Dra konton till rätt sida
function renderDragToSide(event, container) {
    container.innerHTML = `
        <div class="drag-exercise">
            <div class="block-pool" id="block-pool">
                ${event.blocks.map((block, idx) => `
                    <div class="draggable-block"
                         draggable="true"
                         data-account="${block.account}"
                         data-index="${idx}"
                         id="block-${idx}">
                        <span class="block-account">${block.account}</span>
                        <span class="block-name">${block.name}</span>
                        <span class="block-amount">${block.amount.toLocaleString('sv-SE')} kr</span>
                    </div>
                `).join('')}
            </div>

            <div class="drop-zones">
                <div class="drop-zone debet-zone" id="debet-dropzone" data-side="debet">
                    <h4>DEBET</h4>
                    <div class="dropped-blocks"></div>
                </div>
                <div class="drop-zone kredit-zone" id="kredit-dropzone" data-side="kredit">
                    <h4>KREDIT</h4>
                    <div class="dropped-blocks"></div>
                </div>
            </div>
        </div>
    `;

    initDragToSideListeners();
}

// Typ 2: Bygg konteringen
function renderBuildEntry(event, container) {
    // Blanda blocken
    const shuffledBlocks = [...event.blocks].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="build-exercise">
            <div class="block-pool" id="build-pool">
                ${shuffledBlocks.map(block => `
                    <div class="draggable-block entry-block"
                         draggable="true"
                         data-id="${block.id}"
                         data-side="${block.side}"
                         id="entry-${block.id}">
                        <span class="block-side ${block.side}">${block.side.toUpperCase()}</span>
                        <span class="block-account">${block.account}</span>
                        <span class="block-name">${block.name}</span>
                        <span class="block-amount">${block.amount.toLocaleString('sv-SE')} kr</span>
                    </div>
                `).join('')}
            </div>

            <div class="build-zone" id="build-dropzone">
                <h4>Konteringsorder</h4>
                <div class="entry-stack" id="entry-stack">
                    <div class="stack-placeholder">Dra block hit för att bygga konteringen</div>
                </div>
            </div>
        </div>
    `;

    initBuildEntryListeners();
}

// Typ 3: Sortera bokslutssteg
function renderSortSteps(event, container) {
    // Blanda blocken
    const shuffledBlocks = [...event.blocks].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="sort-exercise">
            <div class="step-list" id="step-list">
                ${shuffledBlocks.map((block, idx) => `
                    <div class="draggable-block step-block"
                         draggable="true"
                         data-id="${block.id}"
                         id="step-${block.id}">
                        <span class="step-number">${idx + 1}</span>
                        <span class="step-text">${block.text}</span>
                        <span class="step-handle">⋮⋮</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    initSortStepsListeners();
}

// ==========================================
// DRAG AND DROP EVENT HANDLERS
// ==========================================

function handleDragStart(e) {
    draggedElement = e.target.closest('.draggable-block');
    if (!draggedElement) return;

    draggedElement.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedElement.id);
}

function handleDragEnd(e) {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
    }

    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    const dropzone = e.target.closest('.drop-zone, .build-zone, .step-list, .block-pool');
    if (dropzone) {
        dropzone.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const dropzone = e.target.closest('.drop-zone, .build-zone, .step-list, .block-pool');
    if (dropzone && !dropzone.contains(e.relatedTarget)) {
        dropzone.classList.remove('drag-over');
    }
}

// Typ 1: Listeners
function initDragToSideListeners() {
    const blocks = document.querySelectorAll('#block-pool .draggable-block');
    const dropzones = document.querySelectorAll('.drop-zone');
    const pool = document.getElementById('block-pool');

    blocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
        block.addEventListener('touchstart', handleTouchStart, { passive: false });
        block.addEventListener('touchmove', handleTouchMove, { passive: false });
        block.addEventListener('touchend', handleTouchEndDrop);
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDropToSide);
    });

    pool.addEventListener('dragover', handleDragOver);
    pool.addEventListener('dragenter', handleDragEnter);
    pool.addEventListener('dragleave', handleDragLeave);
    pool.addEventListener('drop', handleReturnToPool);
}

function handleDropToSide(e) {
    e.preventDefault();
    const dropzone = e.target.closest('.drop-zone');
    if (!dropzone || !draggedElement) return;

    dropzone.classList.remove('drag-over');

    const droppedContainer = dropzone.querySelector('.dropped-blocks');
    droppedContainer.appendChild(draggedElement);

    draggedElement.classList.add('dropped');
    draggedElement.style.animation = 'dropBounce 0.3s ease-out';

    // Re-attach listeners
    draggedElement.addEventListener('dragstart', handleDragStart);
    draggedElement.addEventListener('dragend', handleDragEnd);
}

function handleReturnToPool(e) {
    e.preventDefault();
    const pool = e.target.closest('.block-pool');
    if (!pool || !draggedElement) return;

    pool.classList.remove('drag-over');
    pool.appendChild(draggedElement);
    draggedElement.classList.remove('dropped');
}

// Typ 2: Build Entry Listeners
function initBuildEntryListeners() {
    const pool = document.getElementById('build-pool');
    const stack = document.getElementById('entry-stack');
    const blocks = pool.querySelectorAll('.draggable-block');

    blocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
        block.addEventListener('touchstart', handleTouchStart, { passive: false });
        block.addEventListener('touchmove', handleTouchMove, { passive: false });
        block.addEventListener('touchend', handleTouchEndSort);
    });

    stack.addEventListener('dragover', handleSortDragOver);
    stack.addEventListener('dragenter', handleDragEnter);
    stack.addEventListener('dragleave', handleDragLeave);
    stack.addEventListener('drop', handleStackDrop);

    pool.addEventListener('dragover', handleDragOver);
    pool.addEventListener('dragenter', handleDragEnter);
    pool.addEventListener('dragleave', handleDragLeave);
    pool.addEventListener('drop', handleReturnToBuildPool);
}

function handleStackDrop(e) {
    e.preventDefault();
    const stack = document.getElementById('entry-stack');
    if (!draggedElement) return;

    stack.classList.remove('drag-over');

    // Ta bort placeholder
    const placeholder = stack.querySelector('.stack-placeholder');
    if (placeholder) placeholder.remove();

    // Lägg till i rätt position
    const afterElement = getDragAfterElement(stack, e.clientY);
    if (afterElement) {
        stack.insertBefore(draggedElement, afterElement);
    } else {
        stack.appendChild(draggedElement);
    }

    draggedElement.classList.add('dropped');
    draggedElement.style.animation = 'dropBounce 0.3s ease-out';
}

function handleReturnToBuildPool(e) {
    e.preventDefault();
    const pool = document.getElementById('build-pool');
    if (!pool || !draggedElement) return;

    pool.classList.remove('drag-over');
    pool.appendChild(draggedElement);
    draggedElement.classList.remove('dropped');

    // Visa placeholder om stacken är tom
    const stack = document.getElementById('entry-stack');
    if (stack && stack.querySelectorAll('.draggable-block').length === 0) {
        stack.innerHTML = '<div class="stack-placeholder">Dra block hit för att bygga konteringen</div>';
    }
}

// Typ 3: Sort Steps Listeners
function initSortStepsListeners() {
    const list = document.getElementById('step-list');
    const blocks = list.querySelectorAll('.draggable-block');

    blocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEndSort);
        block.addEventListener('touchstart', handleTouchStart, { passive: false });
        block.addEventListener('touchmove', handleTouchMove, { passive: false });
        block.addEventListener('touchend', handleTouchEndSort);
    });

    list.addEventListener('dragover', handleSortDragOver);
    list.addEventListener('dragenter', handleDragEnter);
    list.addEventListener('dragleave', handleDragLeave);
    list.addEventListener('drop', handleSortDrop);
}

function handleSortDragOver(e) {
    e.preventDefault();
    const container = e.target.closest('.entry-stack, .step-list');
    if (!container || !draggedElement) return;

    const afterElement = getDragAfterElement(container, e.clientY);

    if (afterElement == null) {
        container.appendChild(draggedElement);
    } else {
        container.insertBefore(draggedElement, afterElement);
    }
}

function handleSortDrop(e) {
    e.preventDefault();
    const list = document.getElementById('step-list');
    if (!list) return;

    list.classList.remove('drag-over');
    updateStepNumbers();
}

function handleDragEndSort(e) {
    handleDragEnd(e);
    updateStepNumbers();
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable-block:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateStepNumbers() {
    const list = document.getElementById('step-list');
    if (!list) return;

    const blocks = list.querySelectorAll('.step-block');
    blocks.forEach((block, idx) => {
        const numEl = block.querySelector('.step-number');
        if (numEl) numEl.textContent = idx + 1;
    });
}

// ==========================================
// TOUCH SUPPORT
// ==========================================

function handleTouchStart(e) {
    const block = e.target.closest('.draggable-block');
    if (!block) return;

    e.preventDefault();
    draggedElement = block;

    const touch = e.touches[0];

    touchClone = block.cloneNode(true);
    touchClone.classList.add('touch-clone');
    touchClone.style.cssText = `
        position: fixed;
        left: ${touch.clientX - block.offsetWidth / 2}px;
        top: ${touch.clientY - block.offsetHeight / 2}px;
        width: ${block.offsetWidth}px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0.9;
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(touchClone);

    block.classList.add('dragging');

    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function handleTouchMove(e) {
    if (!touchClone || !draggedElement) return;
    e.preventDefault();

    const touch = e.touches[0];

    touchClone.style.left = `${touch.clientX - touchClone.offsetWidth / 2}px`;
    touchClone.style.top = `${touch.clientY - touchClone.offsetHeight / 2}px`;

    touchClone.style.display = 'none';
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    touchClone.style.display = '';

    const dropzone = elementBelow?.closest('.drop-zone, .build-zone, .step-list, .block-pool');

    if (currentDropTarget && currentDropTarget !== dropzone) {
        currentDropTarget.classList.remove('drag-over');
    }

    if (dropzone) {
        dropzone.classList.add('drag-over');
        currentDropTarget = dropzone;
    }
}

function handleTouchEndDrop(e) {
    if (!draggedElement) return;

    const touch = e.changedTouches[0];

    if (touchClone) {
        touchClone.remove();
        touchClone = null;
    }

    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropzone = elementBelow?.closest('.drop-zone');
    const pool = elementBelow?.closest('.block-pool');

    if (dropzone) {
        const droppedContainer = dropzone.querySelector('.dropped-blocks');
        droppedContainer.appendChild(draggedElement);
        draggedElement.classList.add('dropped');
        draggedElement.style.animation = 'dropBounce 0.3s ease-out';

        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
    } else if (pool) {
        pool.appendChild(draggedElement);
        draggedElement.classList.remove('dropped');
    }

    draggedElement.classList.remove('dragging');

    if (currentDropTarget) {
        currentDropTarget.classList.remove('drag-over');
        currentDropTarget = null;
    }

    draggedElement = null;
}

function handleTouchEndSort(e) {
    if (!draggedElement) return;

    if (touchClone) {
        touchClone.remove();
        touchClone = null;
    }

    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const container = elementBelow?.closest('.entry-stack, .step-list');
    const pool = elementBelow?.closest('.block-pool');

    if (container) {
        const afterElement = getDragAfterElement(container, touch.clientY);
        if (afterElement) {
            container.insertBefore(draggedElement, afterElement);
        } else {
            container.appendChild(draggedElement);
        }

        // Ta bort placeholder för build-entry
        const placeholder = container.querySelector('.stack-placeholder');
        if (placeholder) placeholder.remove();

        draggedElement.classList.add('dropped');
        updateStepNumbers();
    } else if (pool) {
        pool.appendChild(draggedElement);
        draggedElement.classList.remove('dropped');

        // Visa placeholder om stacken är tom
        const stack = document.getElementById('entry-stack');
        if (stack && stack.querySelectorAll('.draggable-block').length === 0) {
            stack.innerHTML = '<div class="stack-placeholder">Dra block hit för att bygga konteringen</div>';
        }
    }

    draggedElement.classList.remove('dragging');

    if (currentDropTarget) {
        currentDropTarget.classList.remove('drag-over');
        currentDropTarget = null;
    }

    draggedElement = null;
}

// ==========================================
// VALIDERING FÖR DRAG-ÖVNINGAR
// ==========================================

function checkDragToSideAnswer(event) {
    const debetZone = document.querySelector('#debet-dropzone .dropped-blocks');
    const kreditZone = document.querySelector('#kredit-dropzone .dropped-blocks');
    const pool = document.getElementById('block-pool');

    // Kolla om det finns block kvar i poolen
    if (pool.querySelectorAll('.draggable-block').length > 0) {
        showFeedback(false, "Placera alla block!\n\nDra alla kontoblock till antingen DEBET eller KREDIT.");
        return null;
    }

    const userDebet = [...debetZone.querySelectorAll('.draggable-block')]
        .map(block => block.dataset.account);
    const userKredit = [...kreditZone.querySelectorAll('.draggable-block')]
        .map(block => block.dataset.account);

    const correctDebet = [...event.correctAnswer.debet].sort();
    const correctKredit = [...event.correctAnswer.kredit].sort();

    return arraysEqual(userDebet.sort(), correctDebet) &&
           arraysEqual(userKredit.sort(), correctKredit);
}

function checkBuildEntryAnswer(event) {
    const stack = document.getElementById('entry-stack');
    const pool = document.getElementById('build-pool');

    // Kolla om det finns block kvar i poolen
    if (pool.querySelectorAll('.draggable-block').length > 0) {
        showFeedback(false, "Placera alla block!\n\nDra alla kontoblock till konteringsytan i rätt ordning.");
        return null;
    }

    const userOrder = [...stack.querySelectorAll('.draggable-block')]
        .map(block => block.dataset.id);

    return arraysEqual(userOrder, event.correctOrder);
}

function checkSortStepsAnswer(event) {
    const list = document.getElementById('step-list');

    const userOrder = [...list.querySelectorAll('.draggable-block')]
        .map(block => block.dataset.id);

    return arraysEqual(userOrder, event.correctOrder);
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
}

// ==========================================
// KLASSISK BOKFÖRING
// ==========================================

// Jämför användarens svar med rätt svar
function compareAnswers(userAnswer, correctAnswer) {
    // Netta poster på samma konto (debet - kredit) och returnera nettoresultat
    const netEntries = (entries) => {
        const accountMap = {};

        // Summera debet och kredit per konto
        entries.forEach(entry => {
            const account = entry.account;
            if (!accountMap[account]) {
                accountMap[account] = { debet: 0, kredit: 0 };
            }
            if (entry.side === 'debet') {
                accountMap[account].debet += parseFloat(entry.amount);
            } else {
                accountMap[account].kredit += parseFloat(entry.amount);
            }
        });

        // Beräkna netto per konto
        const result = [];
        for (const account of Object.keys(accountMap)) {
            const debet = accountMap[account].debet;
            const kredit = accountMap[account].kredit;
            const net = debet - kredit;

            if (Math.abs(net) > 0.01) {
                result.push({
                    account: account,
                    side: net > 0 ? 'debet' : 'kredit',
                    amount: Math.abs(net)
                });
            }
        }

        return result;
    };

    const nettedUser = netEntries(userAnswer);
    const nettedCorrect = netEntries(correctAnswer);

    if (nettedUser.length !== nettedCorrect.length) {
        return false;
    }

    // Sortera båda arrays för jämförelse
    const sortAnswer = (arr) => arr.sort((a, b) => {
        if (a.account !== b.account) return a.account.localeCompare(b.account);
        if (a.side !== b.side) return a.side.localeCompare(b.side);
        return a.amount - b.amount;
    });

    const sortedUser = sortAnswer(nettedUser);
    const sortedCorrect = sortAnswer(nettedCorrect);

    for (let i = 0; i < sortedUser.length; i++) {
        if (sortedUser[i].account !== sortedCorrect[i].account ||
            sortedUser[i].side !== sortedCorrect[i].side ||
            Math.abs(sortedUser[i].amount - sortedCorrect[i].amount) > 0.01) {
            return false;
        }
    }

    return true;
}

// Hitta konto baserat på nummer
function findAccountByNumber(number) {
    for (const accountArray of Object.values(accounts)) {
        const account = accountArray.find(acc => acc.number === number);
        if (account) return account;
    }
    return null;
}

// Visa feedback
function showFeedback(isCorrect, message) {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.innerHTML = `
        <h3>${isCorrect ? '✅ Rätt!' : '❌ Fel'}</h3>
        <p style="white-space: pre-line;">${message}</p>
    `;
    feedback.style.display = 'block';

    // Spela ljud
    if (isCorrect) {
        playCorrectSound();
    } else {
        playWrongSound();
    }

    // Visa mobil toast för tydligare feedback
    showMobileToast(isCorrect, message);

    // Scrolla till feedbacken på mobil
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Mobil toast-notifikation
function showMobileToast(isCorrect, message) {
    // Ta bort eventuell befintlig toast
    const existingToast = document.querySelector('.mobile-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Extrahera första raden/poänginfo för kort meddelande
    const shortMessage = isCorrect
        ? message.split('\n')[0]
        : 'Se rätt svar nedan';

    const toast = document.createElement('div');
    toast.className = `mobile-toast ${isCorrect ? 'correct' : 'incorrect'}`;
    toast.innerHTML = `
        <div class="toast-icon">${isCorrect ? '🎉' : '😕'}</div>
        <div class="toast-content">
            <div class="toast-title">${isCorrect ? 'Rätt svar!' : 'Inte riktigt...'}</div>
            <div class="toast-message">${shortMessage}</div>
        </div>
        <button class="toast-close" aria-label="Stäng">✕</button>
    `;

    document.body.appendChild(toast);

    // Stäng-knapp
    toast.querySelector('.toast-close').addEventListener('click', () => {
        closeMobileToast(toast);
    });

    // Auto-stäng efter 4 sekunder för rätt svar, längre för fel
    const autoCloseTime = isCorrect ? 4000 : 6000;
    setTimeout(() => {
        closeMobileToast(toast);
    }, autoCloseTime);
}

function closeMobileToast(toast) {
    if (toast && toast.parentNode) {
        toast.style.animation = 'toastSlideUp 0.3s ease-out forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }
}

// Visa ledtråd
function showHint() {
    const event = events[currentEventIndex];
    const hint = document.getElementById('hint');
    hint.innerHTML = `<strong>💡 Ledtråd:</strong> ${event.hint}`;
    hint.style.display = 'block';
}

// Rangordning av achievements (högst till lägst)
const achievementRank = [
    'score100000', // 👑 Bokföringslegend (100 000 poäng)
    'total1000',   // 🏅 Mästare (1000 rätt totalt)
    'streak50',    // 🤖 Maskin (50 i rad)
    'perfect50',   // 💫 Perfektionist (50 utan fel)
    'score25000',  // 💎 Poängproffs (25 000 poäng)
    'total500',    // 🎓 Expert (500 rätt totalt)
    'streak25',    // ⚡ Ostoppbar (25 i rad)
    'perfect15',   // ✨ Noggrann (15 utan fel)
    'level3',      // 🏆 Momsmästare
    'total100',    // 📚 Flitig student (100 rätt totalt)
    'score5000',   // 💰 Tusingen (5 000 poäng)
    'streak10',    // 💥 Het svit (10 i rad)
    'level2',      // 📈 Nivå 2 klar
    'streak5',     // 🔥 Uppvärmd (5 i rad)
    'firstCorrect' // 🌟 Första steget
];

// Hitta bästa upplåsta badge
function getBestBadge() {
    for (const id of achievementRank) {
        if (achievements[id] && achievements[id].unlocked) {
            return achievements[id];
        }
    }
    return null;
}

// Uppdatera statistik
function updateStats() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;

    // Uppdatera utökad statistik
    const highScoreEl = document.getElementById('high-score');
    const streakEl = document.getElementById('streak');

    if (highScoreEl) highScoreEl.textContent = highScore;
    if (streakEl) {
        streakEl.textContent = streak;
        // Lägg till visuell effekt vid hög streak
        if (streak >= 5) {
            streakEl.classList.add('hot-streak');
        } else if (streak >= 3) {
            streakEl.classList.add('on-fire');
        } else {
            streakEl.classList.remove('hot-streak', 'on-fire');
        }
    }

    // Uppdatera bästa badge
    const bestBadgeEl = document.getElementById('best-badge');
    const bestBadgeNameEl = document.getElementById('best-badge-name');
    if (bestBadgeEl) {
        const best = getBestBadge();
        if (best) {
            bestBadgeEl.textContent = best.icon;
            if (bestBadgeNameEl) bestBadgeNameEl.textContent = best.name;
        } else {
            bestBadgeEl.textContent = '🔒';
            if (bestBadgeNameEl) bestBadgeNameEl.textContent = 'Ingen ännu';
        }
    }

    // Uppdatera sessionsstatistik
    const sessionStatsEl = document.getElementById('session-stats');
    if (sessionStatsEl) {
        sessionStatsEl.textContent = `${sessionCorrect}/${sessionCorrect + sessionIncorrect}`;
    }
}

// Uppdatera sessionstid
function updateSessionTime() {
    const sessionTimeEl = document.getElementById('session-time');
    if (sessionTimeEl) {
        const elapsedMs = Date.now() - sessionStartTime;
        const minutes = Math.floor(elapsedMs / 60000);
        const seconds = Math.floor((elapsedMs % 60000) / 1000);
        sessionTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Nästa händelse
function nextEvent() {
    currentEventIndex++;

    if (currentEventIndex >= events.length) {
        // Kolla nivå-achievements
        if (selectedLevel === 2 && !achievements.level2.unlocked) {
            achievements.level2.unlocked = true;
            showAchievementPopup(achievements.level2);
            saveProgress();
            renderAchievements();
        }
        if (selectedLevel === 3 && !achievements.level3.unlocked) {
            achievements.level3.unlocked = true;
            showAchievementPopup(achievements.level3);
            saveProgress();
            renderAchievements();
        }

        // Spelet är slut
        const elapsedMs = Date.now() - levelStartTime;
        const elapsedMinutes = Math.floor(elapsedMs / 60000);
        const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);
        const timeString = elapsedMinutes > 0
            ? `${elapsedMinutes} min ${elapsedSeconds} sek`
            : `${elapsedSeconds} sek`;

        let endMessage = `🎊 Grattis! Du har klarat alla övningar!\n\n`;
        endMessage += `📊 Resultat:\n`;
        endMessage += `Poäng: ${score}\n`;
        endMessage += `Rätt: ${correctCount} | Fel: ${incorrectCount}\n`;
        endMessage += `Bästa streak: ${bestStreak}\n`;
        endMessage += `⏱️ Tid: ${timeString}\n`;
        if (score >= highScore && score > 0) {
            endMessage += `\n🏆 NYTT HIGHSCORE!`;
        }

        showFeedback(true, endMessage);
        document.getElementById('next-event').style.display = 'none';
        document.getElementById('check-answer').style.display = 'none';
        document.getElementById('skip-event').style.display = 'none';
        document.getElementById('show-hint').style.display = 'none';
        document.getElementById('add-row').style.display = 'none';
        document.getElementById('event-description').textContent = 'Nivån är klar! Välj en annan nivå eller ladda om sidan.';
    } else {
        loadEvent();
    }
}

// Nivåfiler
const levelFiles = {
    1: 'grundlaggande-kontering.json',
    2: 'forsaljning-inkop-utan-moms.json',
    3: 'transaktioner.json',
    4: 'momsredovisning.json',
    5: 'resultatrakning.json',
    6: 'kreditfakturor-ranta-kontokort.json',
    7: 'loner.json',
    8: 'periodiseringar.json',
    9: 'mer-periodiseringar.json',
    10: 'interaktiva-ovningar.json'
};

// Aktuell vald nivå
let selectedLevel = 1;

// Visa/dölj laddningsindikator
function showLoading(message = 'Laddar...') {
    const eventCard = document.querySelector('.event-card');
    if (!eventCard) return;

    // Ta bort befintlig overlay om den finns
    hideLoading();

    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">${message}</div>
    `;
    eventCard.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Ladda händelser från nivå
async function loadLevel(levelNumber) {
    selectedLevel = levelNumber;

    // Uppdatera dropdown
    const dropdown = document.getElementById('level-select');
    if (dropdown) {
        dropdown.value = levelNumber;
    }

    const fileName = levelFiles[levelNumber];

    // Visa laddningsindikator
    showLoading('Laddar nivå...');

    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error(`Kunde inte ladda fil: ${fileName}`);
        }

        const loadedEvents = await response.json();

        // Validera att det är en array
        if (!Array.isArray(loadedEvents)) {
            alert('Filen måste innehålla en array av händelser!');
            return;
        }

        // Validera att händelserna har rätt format
        const isValid = loadedEvents.every(event => {
            // Grundläggande fält
            if (!event.description || !event.hint || !event.level) return false;

            // Typspecifik validering
            const type = event.type || 'classic';
            if (type === 'classic') {
                return Array.isArray(event.correctAnswer);
            } else if (type === 'drag-to-side') {
                return event.blocks && event.correctAnswer && event.correctAnswer.debet && event.correctAnswer.kredit;
            } else if (type === 'true-false') {
                return event.statement && typeof event.correctAnswer === 'boolean';
            }
            return false;
        });

        if (!isValid) {
            alert('Händelserna har fel format!');
            return;
        }

        // Ladda händelserna
        events = loadedEvents;

        // Dölj laddningsindikator
        hideLoading();

        // Återställ spelet
        resetGame();

    } catch (error) {
        hideLoading();
        alert('Fel vid laddning av nivå: ' + error.message);
        console.error(error);
    }
}

// Återställ spelet
function resetGame() {
    currentEventIndex = 0;
    // score behålls mellan nivåer
    level = 1;
    correctCount = 0;
    incorrectCount = 0;
    streak = 0;
    levelStartTime = Date.now();
    updateStats();
    loadEvent();
}

// Event listeners
function setupEventListeners() {
    document.getElementById('add-row').addEventListener('click', addBookingRow);
    document.getElementById('check-answer').addEventListener('click', checkAnswer);
    document.getElementById('next-event').addEventListener('click', nextEvent);
    document.getElementById('skip-event').addEventListener('click', skipEvent);
    document.getElementById('show-hint').addEventListener('click', showHint);

    // Enter-tangent för att skicka svar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            const checkBtn = document.getElementById('check-answer');
            const nextBtn = document.getElementById('next-event');

            // Om "Kontrollera svar" är synlig, klicka på den
            if (checkBtn && checkBtn.style.display !== 'none') {
                e.preventDefault();
                checkAnswer();
            }
            // Om "Nästa händelse" är synlig, klicka på den
            else if (nextBtn && nextBtn.style.display !== 'none') {
                e.preventDefault();
                nextEvent();
            }
        }
    });

    // Nivåval via dropdown med bekräftelse
    const levelSelect = document.getElementById('level-select');
    if (levelSelect) {
        levelSelect.addEventListener('change', (e) => {
            const newLevel = parseInt(e.target.value);

            // Kolla om användaren har påbörjat en uppgift eller har poäng i sessionen
            const hasInput = bookingRows.some(row => row.account || row.debetAmount || row.kreditAmount);
            const hasProgress = currentEventIndex > 0 || hasInput;

            if (hasProgress) {
                const confirmed = confirm('Vill du byta nivå? Din nuvarande progress på denna nivå nollställs.');
                if (!confirmed) {
                    // Återställ dropdown till nuvarande nivå
                    e.target.value = selectedLevel;
                    return;
                }
            }

            loadLevel(newLevel);
        });
    }
}

// ==========================================
// MINI-BALANSRÄKNING MED ANIMERADE SIFFROR
// ==========================================

// Dölj mini-balansräkningen
function hideMiniBalance() {
    const miniBalance = document.getElementById('mini-balance');
    if (miniBalance) {
        miniBalance.style.display = 'none';
    }
}

// Beräkna balanseffekt från bokföringsposter
function calculateBalanceEffect(entries) {
    const assets = [];      // Tillgångar (1xxx)
    const liabilities = []; // Skulder och EK (2xxx)
    let yearResult = 0;     // Beräknat årets resultat

    entries.forEach(entry => {
        const accountNum = parseInt(entry.account);
        const accountInfo = findAccountByNumber(entry.account);
        const accountName = accountInfo ? accountInfo.name : `Konto ${entry.account}`;
        const amount = parseFloat(entry.amount);
        const isDebet = entry.side === 'debet';

        if (accountNum >= 1000 && accountNum < 2000) {
            // Tillgångar: Debet ökar, Kredit minskar
            const effect = isDebet ? amount : -amount;
            assets.push({ account: entry.account, name: accountName, amount: effect });
        } else if (accountNum >= 2000 && accountNum < 3000) {
            // Skulder/EK: Kredit ökar, Debet minskar
            const effect = isDebet ? -amount : amount;
            liabilities.push({ account: entry.account, name: accountName, amount: effect });
        } else if (accountNum >= 3000 && accountNum < 4000) {
            // Intäkter: Kredit ökar resultatet
            yearResult += isDebet ? -amount : amount;
        } else if (accountNum >= 4000 && accountNum < 9000) {
            // Kostnader (inkl finansiella): Debet minskar resultatet
            yearResult += isDebet ? -amount : amount;
        }
    });

    // Konsolidera poster på samma konto
    const consolidate = (items) => {
        const map = {};
        items.forEach(item => {
            if (!map[item.account]) {
                map[item.account] = { ...item };
            } else {
                map[item.account].amount += item.amount;
            }
        });
        return Object.values(map).filter(item => Math.abs(item.amount) > 0.01);
    };

    return {
        assets: consolidate(assets),
        liabilities: consolidate(liabilities),
        yearResult: yearResult
    };
}

// Visa mini-balansräkningen med animation
function showMiniBalance(entries) {
    const miniBalance = document.getElementById('mini-balance');
    const assetsContainer = document.getElementById('balance-assets');
    const liabilitiesContainer = document.getElementById('balance-liabilities');
    const sumAssets = document.getElementById('sum-assets');
    const sumLiabilities = document.getElementById('sum-liabilities');

    if (!miniBalance) return;

    // Rensa tidigare innehåll
    assetsContainer.innerHTML = '';
    liabilitiesContainer.innerHTML = '';

    // Beräkna balanseffekten
    const balance = calculateBalanceEffect(entries);

    // Visa balansräkningen (initialt tom)
    miniBalance.style.display = 'block';

    // Hämta positioner för animation
    const bookingTable = document.querySelector('.booking-table');
    const tableRect = bookingTable.getBoundingClientRect();

    let delay = 0;
    const delayIncrement = 200;

    // Animera tillgångar
    balance.assets.forEach((item, index) => {
        const balanceItem = createBalanceItem(item);
        assetsContainer.appendChild(balanceItem);

        // Hitta källelement i tabellen
        const sourceRow = findSourceRowForAccount(item.account);
        if (sourceRow) {
            animateToBalance(item, sourceRow, balanceItem, delay);
        }
        delay += delayIncrement;

        // Visa posten efter delay
        setTimeout(() => {
            balanceItem.classList.add('visible');
        }, delay + 400);
    });

    // Animera skulder
    balance.liabilities.forEach((item, index) => {
        const balanceItem = createBalanceItem(item);
        liabilitiesContainer.appendChild(balanceItem);

        const sourceRow = findSourceRowForAccount(item.account);
        if (sourceRow) {
            animateToBalance(item, sourceRow, balanceItem, delay);
        }
        delay += delayIncrement;

        setTimeout(() => {
            balanceItem.classList.add('visible');
        }, delay + 400);
    });

    // Lägg till årets resultat om det finns resultatpåverkan
    if (Math.abs(balance.yearResult) > 0.01) {
        const resultItem = createBalanceItem({
            account: 'result',
            name: 'Beräknat årets resultat',
            amount: balance.yearResult
        }, true);
        liabilitiesContainer.appendChild(resultItem);

        // Hitta källa för resultatposter (första intäkts-/kostnadskontot)
        const resultEntry = entries.find(e => {
            const num = parseInt(e.account);
            return num >= 3000 && num < 9000;
        });
        if (resultEntry) {
            const sourceRow = findSourceRowForAccount(resultEntry.account);
            if (sourceRow) {
                animateToBalance({ amount: balance.yearResult }, sourceRow, resultItem, delay);
            }
        }
        delay += delayIncrement;

        setTimeout(() => {
            resultItem.classList.add('visible');
        }, delay + 400);
    }

    // Beräkna och visa summor efter alla animationer
    setTimeout(() => {
        const totalAssets = balance.assets.reduce((sum, item) => sum + item.amount, 0);
        const totalLiabilities = balance.liabilities.reduce((sum, item) => sum + item.amount, 0) + balance.yearResult;

        sumAssets.textContent = formatAmount(totalAssets);
        sumLiabilities.textContent = formatAmount(totalLiabilities);
    }, delay + 500);
}

// Skapa ett balansräkningselement
function createBalanceItem(item, isResult = false) {
    const div = document.createElement('div');
    div.className = 'balance-item' + (isResult ? ' result-item' : '');
    div.dataset.account = item.account;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'account-name';
    nameSpan.textContent = item.name;

    const amountSpan = document.createElement('span');
    amountSpan.className = 'amount';
    amountSpan.textContent = formatAmount(item.amount);

    div.appendChild(nameSpan);
    div.appendChild(amountSpan);

    return div;
}

// Formatera belopp
function formatAmount(amount) {
    const sign = amount >= 0 ? '+' : '';
    return sign + amount.toLocaleString('sv-SE') + ' kr';
}

// Hitta tabellrad för ett visst konto
function findSourceRowForAccount(accountNumber) {
    const rows = document.querySelectorAll('#booking-entries tr');
    for (const row of rows) {
        const select = row.querySelector('select');
        if (select && select.value === accountNumber) {
            return row;
        }
    }
    return null;
}

// Animera flygande siffra från källa till mål
function animateToBalance(item, sourceElement, targetElement, delay) {
    setTimeout(() => {
        const sourceRect = sourceElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        // Skapa flygande element
        const flyingEl = document.createElement('div');
        flyingEl.className = 'flying-number';
        flyingEl.textContent = Math.abs(item.amount).toLocaleString('sv-SE') + ' kr';

        // Startposition (mitt av källraden)
        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;

        flyingEl.style.left = startX + 'px';
        flyingEl.style.top = startY + 'px';
        flyingEl.style.transform = 'translate(-50%, -50%)';

        document.body.appendChild(flyingEl);

        // Animera till målet
        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        // Använd requestAnimationFrame för smidig animation
        requestAnimationFrame(() => {
            flyingEl.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            flyingEl.style.left = targetX + 'px';
            flyingEl.style.top = targetY + 'px';

            // Ta bort elementet efter animationen
            setTimeout(() => {
                flyingEl.style.animation = 'flyToBalance 0.3s ease-out forwards';
                setTimeout(() => {
                    flyingEl.remove();
                }, 300);
            }, 600);
        });
    }, delay);
}

// Starta spelet när sidan laddas
window.addEventListener('DOMContentLoaded', init);
