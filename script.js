let coinCount = parseInt(localStorage.getItem('coinCount')) || 0; // Recupera do localStorage ou começa em 0
let energy = 100;
let gainPerHour = parseInt(localStorage.getItem('gainPerHour')) || 0; // Recupera do localStorage ou começa em 0
let xp = parseInt(localStorage.getItem('xp')) || 0; // Recupera do localStorage ou começa em 0
let level = parseInt(localStorage.getItem('level')) || 1; // Recupera do localStorage ou começa em 1

const xpToLevelUpBase = 1000; // XP base para o primeiro nível
let xpToLevelUp = xpToLevelUpBase + (level - 1) * 200; // XP aumenta a cada nível

// Lista de patentes e suas respectivas imagens
const ranks = [
    { title: "Private", image: "img/private.jpg" },
    { title: "Corporal", image: "img/corporal.jpg" },
    { title: "Sergeant", image: "img/sergeant.jpg" },
    { title: "Staff Sergeant", image: "img/staff_sergeant.jpg" },
    { title: "Sergeant Major", image: "img/sergeant_major.jpg" },
    { title: "Warrant Officer", image: "img/warrant_officer.jpg" },
    { title: "Second Lieutenant", image: "img/second_lieutenant.jpg" },
    { title: "First Lieutenant", image: "img/first_lieutenant.jpg" },
    { title: "Captain", image: "img/captain.jpg" },
    { title: "Major", image: "img/major.jpg" },
    { title: "Lieutenant Colonel", image: "img/lieutenant_colonel.jpg" },
    { title: "Colonel", image: "img/colonel.jpg" },
    { title: "Brigadier General", image: "img/brigadier_general.jpg" },
    { title: "Major General", image: "img/major_general.jpg" },
    { title: "Lieutenant General", image: "img/lieutenant_general.jpg" },
    { title: "General", image: "img/general.jpg" },
];

function recoverEnergy() {
    if (energy < 100) {
        energy += 0.5;
        document.getElementById("energy-level").style.width = energy + "%";
    }
}

function clickCoin() {
    if (energy > 0) {
        coinCount++;
        xp += 50; // Ganha 10 XP por moeda
        document.getElementById("coinCount").textContent = coinCount;

        // Verifica se o jogador subiu de nível
        if (xp >= xpToLevelUp) {
            level++;
            xpToLevelUp += 200; // Aumenta a dificuldade de subir de nível
        }

        // Atualiza a patente e a imagem correspondente
        if (level <= ranks.length) {
            document.getElementById("level").textContent = level;
            document.getElementById("rankTitle").textContent = ranks[level - 1].title; // Atualiza o título da patente
            document.getElementById("coin").src = ranks[level - 1].image; // Troca a imagem
        }

        document.getElementById("xp").textContent = xp;

        // Salvar os dados no localStorage
        saveGameData();

        energy -= 2;
        document.getElementById("energy-level").style.width = energy + "%";
    }
}

function saveGameData() {
    // Salvar as variáveis principais no localStorage
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('gainPerHour', gainPerHour);
}

function upgradeCoinsPerHour() {
    gainPerHour += 10;
    document.getElementById("gainPerHour").textContent = gainPerHour;
    saveGameData(); // Salva os dados atualizados
}

window.onload = function() {
    // Restaurar as informações do localStorage
    document.getElementById("coinsPerHour").textContent = gainPerHour;
    document.getElementById("coinCount").textContent = coinCount;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;
    document.getElementById("rankTitle").textContent = ranks[level - 1].title;
    document.getElementById("coin").src = ranks[level - 1].image;
    
    // Iniciar a recuperação de energia
    energyInterval = setInterval(recoverEnergy, 100);
};

function resetLevel() {
    level = 1; // Reseta o nível para 1
    xp = 0; // Reseta o XP
    updateLevelDisplay(); // Atualiza a exibição do nível
}

function updateLevelDisplay() {
    // Atualize aqui a parte da interface que mostra o nível do jogador
    document.getElementById("level-display").innerText = "Nível: " + level;
}