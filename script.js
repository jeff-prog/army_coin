let coinCount = 0;
let energy = 100;
let energyInterval;
let gainPerHour = 0;
let xp = 0;
let level = 1;
let xpToLevelUp = 1000; // XP inicial para subir de nível
const xpIncreaseFactor = 1.5; // Fator de aumento do XP para cada novo nível

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
        energy += 0.1;
        document.getElementById("energy-level").style.width = energy + "%";
    }
}

function clickCoin() {
    if (energy > 0) {
        coinCount++;
        xp += 10; // Ganha 10 XP por moeda
        document.getElementById("coinCount").textContent = coinCount;

        // Verifica se o jogador subiu de nível
        if (xp >= xpToLevelUp) {
            level++;
            xpToLevelUp = Math.floor(xpToLevelUp * xpIncreaseFactor); // Aumenta o XP necessário para o próximo nível
            
            // Atualiza a patente e a imagem correspondente
            if (level <= ranks.length) {
                document.getElementById("level").textContent = level;
                document.getElementById("rankTitle").textContent = ranks[level - 1].title; // Atualiza o título da patente
                document.getElementById("coin").src = ranks[level - 1].image; // Troca a imagem
            }
        }

        document.getElementById("xp").textContent = xp; // Mostra o XP acumulado
        energy -= 2;
        document.getElementById("energy-level").style.width = energy + "%";
    }
}

function upgradeCoinsPerHour() {
    gainPerHour += 10;
    document.getElementById("gainPerHour").textContent = gainPerHour;
}

window.onload = function() {
    energyInterval = setInterval(recoverEnergy, 100);
    document.getElementById("coinsPerHour").textContent = gainPerHour;
    document.getElementById("coinCount").textContent = coinCount; // Atualiza o contador de moedas no topo
    document.getElementById("rankTitle").textContent = ranks[0].title; // Exibe a patente inicial
    document.getElementById("coin").src = ranks[0].image; // Define a imagem inicial
};
