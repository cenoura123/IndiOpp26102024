const container = document.getElementById("chat");
const inputMessage = document.getElementById("prompt");
const leaveButton = document.getElementById("sair");
const btn_mobile  = document.getElementById("send-mobile");
const icon_btn_mobile  = document.getElementById("sendIcon");
const Icon_loading = document.getElementById("sendIcon-pc");
const apiKey = "7dd0fbad3e1279a247c82d64cfab9e38";

// Mensagem de boas-vindas ao carregar a página
document.body.style.opacity = 0;
setTimeout(() => {
    document.body.style.opacity = 1;
    botResponse("Olá! No que posso ajudar hoje?", container);
}, 1000);

// Função para obter a data atual
function PegarDia() {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;
    const ano = hoje.getFullYear();
    return `Hoje é ${dia}/${mes}/${ano}`;
}

// Função para obter resposta da IA
async function ResponseIa(texto) {
    try {
        const response = await fetch('https://apiindia-cenoura123s-projects.vercel.app/?vercelToolbarCode=8ozReGBsXz_O3C-', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: texto })
        });
        return await response.text();
    } catch (error) {
        console.error('Erro na requisição:', error);
        return "Desculpe, ocorreu um erro ao processar sua solicitação.";
    }
}

// Função para obter o horário atual
function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

// Função para digitar o texto gradualmente
function typeText(text, element, callback) {
    const paragraph = document.createElement("p");
    paragraph.classList.add('chat-mgs');
    element.appendChild(paragraph);
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            paragraph.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 10);
        } else if (callback) {
            callback();
        }
    }

    typeCharacter();
}

// Função para adicionar mensagem do usuário e processar resposta da IA
function addMessage() {
    const messageText = inputMessage.value.trim();
    if (messageText) {
        inputMessage.value = "";
        typeText(`Você: ${messageText}`, container, async () => {
            if (window.innerWidth <= 730){
                icon_btn_mobile.classList.replace("bx-send", "bx-cube-alt"); // Altera o ícone para "bx-cube-alt"
                icon_btn_mobile.classList.add("animation-360");
                const responseText = await ResponseIa(messageText);
                icon_btn_mobile.classList.replace("bx-cube-alt", "bx-send"); // Altera o ícone para "bx-send"
                icon_btn_mobile.classList.remove("animation-360");
                botResponse(responseText, container);
            }else{
                Icon_loading.classList.add("animation-360");
                const responseText = await ResponseIa(messageText);
                Icon_loading.classList.remove("animation-360");
                botResponse(responseText, container);
            }
        });
    }
}

// Função para exibir resposta do bot
function botResponse(message, element) {
    const paragraph = document.createElement("p");
    paragraph.classList.add("chat-mgs");

    const botWord = document.createElement("span");
    botWord.textContent = "Indi: ";
    botWord.classList.add("bot-word");

    paragraph.appendChild(botWord);
    element.appendChild(paragraph);
    typeText(message, paragraph);
}


// Evento para enviar a mensagem ao pressionar Enter
inputMessage.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addMessage();
    }
});

// Envento para quando o btn da tela mobile for clicado

// Adiciona o evento de clique ao botão

btn_mobile.addEventListener("click", function() {
    addMessage();
});

// Função para sair da página com efeito de transição
function sairdapage() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.backgroundColor = '#292927';
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }, 1000);
}

leaveButton.addEventListener('click', sairdapage);

// Função para buscar a temperatura de uma cidade
async function buscarCidade(cidade) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`);
        const dados = await response.json();
        
        if (dados.main) {
            botResponse(`A temperatura em ${cidade} é ${Math.floor(dados.main.temp)}°C`, container);
        } else {
            botResponse("Cidade não encontrada. Verifique o nome e tente novamente.", container);
        }
    } catch (error) {
        console.error('Erro ao buscar a temperatura:', error);
        botResponse("Erro ao verificar a temperatura.", container);
    }
}


