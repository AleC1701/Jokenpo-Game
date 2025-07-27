const userScoreSpan = document.getElementById('user-score');
const compScoreSpan = document.getElementById('comp-score');
const resultText = document.getElementById('result-text');
const userChoiceImg = document.getElementById('user-choice-img');
const cpuChoiceImg = document.getElementById('cpu-choice-img');
const actionMessage = document.getElementById('action-message');

const choices = ['pedra', 'papel', 'tesoura'];

let userScore = 0;
let compScore = 0;

function getCpuChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function atualizarPlacar() {
  userScoreSpan.textContent = userScore;
  compScoreSpan.textContent = compScore;
}

function mostrarEscolhas(userChoice, cpuChoice) {
  userChoiceImg.src = `imagens/${userChoice}.png`;
  userChoiceImg.alt = userChoice;

  cpuChoiceImg.src = `imagens/${cpuChoice}.png`;
  cpuChoiceImg.alt = cpuChoice;
}

function exibirResultado(mensagem) {
  resultText.textContent = mensagem;
}

function jogar(userChoice) {
  // Colocar imagens girando
  userChoiceImg.classList.add('spinning');
  cpuChoiceImg.classList.add('spinning');

  actionMessage.textContent = 'CPU está escolhendo...';

  // Delay para simular “pensar”
  setTimeout(() => {
    const cpuChoice = getCpuChoice();

    // Parar de girar e mostrar as imagens finais
    userChoiceImg.classList.remove('spinning');
    cpuChoiceImg.classList.remove('spinning');

    mostrarEscolhas(userChoice, cpuChoice);

    if (userChoice === cpuChoice) {
      exibirResultado('Empate!');
    } else if (
      (userChoice === 'pedra' && cpuChoice === 'tesoura') ||
      (userChoice === 'papel' && cpuChoice === 'pedra') ||
      (userChoice === 'tesoura' && cpuChoice === 'papel')
    ) {
      userScore++;
      exibirResultado('Você venceu!');
    } else {
      compScore++;
      exibirResultado('Você perdeu!');
    }

    atualizarPlacar();
    actionMessage.textContent = 'Faça o seu movimento';

  }, 800); // 800ms de “pensar”
}

function inicializar() {
  const escolhas = document.querySelectorAll('.choice');
  escolhas.forEach(escolha => {
    escolha.addEventListener('click', () => {
      jogar(escolha.id);
    });
  });
}

inicializar();