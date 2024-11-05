setTimeout(() => {
    document.body.style.opacity=1
}, 1550)

const text_1 = "Sua Jornada Começa";

const text_2 = "Com um Clique!";

const text1 = document.querySelector('.text-1');
const text2 = document.querySelector('.text-2');
let index1 = 0;

let index2 = 0;

function Escrevetext1() {
    if (index1 < text_1.length) {
      text1.innerHTML += text_1.charAt(index1);
      index1++;
      setTimeout(Escrevetext1, 100); // Velocidade da digitação
    }
  }

function Escrevetext2() {
if (index2 < text_2.length) {
    text2.innerHTML += text_2.charAt(index2);
    index2++;
    setTimeout(Escrevetext2, 100); // Velocidade da digitação
}
}

setTimeout(() => {
    Escrevetext1()
}, 1600)

setTimeout(() => {
    Escrevetext2()
}, 1700)



// ENTRADA PARA PAGE MAIN


const btn = document.querySelector('#enterpage');
const input_1 = document.querySelector('#input-1');
const input_2 = document.querySelector('#input-2');

function EntrarPageMain() {
    // Verifica se os campos de entrada têm valor
    if (input_1.value && input_2.value) { 
        // Verifica se o valor do primeiro campo é igual ao email esperado
        if (input_1.value === "admin@opp.com") {
            // Verifica se o valor do segundo campo é igual à senha esperada
            if (input_2.value === "999") {
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = "main.html"
                },900)
            } else {
                console.log("SENHA INCORRETA"); // Mensagem caso a senha esteja errada
            }
        } else {
            console.log("EMAIL INCORRETO"); // Mensagem caso o email esteja errado
        }
    } else {
        console.log("PREENCHA OS CAMPOS"); // Mensagem opcional para campos vazios
    }
}


// Corrigir a adição do evento
btn.addEventListener('click', EntrarPageMain);


// PARA ENTRA NA PAGE CREATEACOUNT 

const ca = document.querySelector("#Createcont");

function EnterPageCA(){
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = "createacount.html"
    },900)
}

ca.addEventListener('click', EnterPageCA);


input_2.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        EntrarPageMain();
    }
});
input_1.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        EntrarPageMain();
    }
});