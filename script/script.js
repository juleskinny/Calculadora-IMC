const peso = document.querySelector('#peso')
const altura = document.querySelector('#altura')
const button = document.querySelector('#button')
const optionF = document.querySelector('#feminino')
const optionM = document.querySelector('#masculino')

const resultadoImc = document.querySelector('#resultado-Imc')
const imgImc = document.querySelector('#imgImc')
const imcClasse = document.querySelector('#imc-classe')

const divErro = document.createElement('div')
const iconInfo = document.createElement('img')
const textError = document.createElement('p')

function classificacaoImc(imc) { 
    /* função que retorna uma classificação baseada no resultado do calculo de imc */

    let resultadoClasse
    if(imc < 18.5) { 
        resultadoClasse = 'MAGREZA'
    } else if (imc >= 18.5 && imc < 25) {
        resultadoClasse = 'NORMAL'
    } else if (imc >= 25  && imc <30){
        resultadoClasse = 'SOBREPESO'
    } else if(imc >=30 && imc < 40) {
       resultadoClasse = 'OBESIDADE'
    } else {
       resultadoClasse = 'OBESIDADE GRAVE'
    } 

    return resultadoClasse
}

function getImgGender(classificacao, siglaGenero) { 
    /* funcção que retorna o src da imagem baseada na classificação do imc, e na sigla inicial do genero:
        siglaGenero = F ou M, o parâmetro recebe o resultado de optionM.checked ou optionF.checked
    */

    switch (classificacao) {
        case 'MAGREZA' :
            return `assets/silhueta-${siglaGenero}-abaixo-do-peso.png`
            break;

        case 'NORMAL':
             return `assets/silhueta-${siglaGenero}-peso-ideal.png`
             break
        
        case 'SOBREPESO':
             return `assets/silhueta-${siglaGenero}-acima-do-peso.png`
            break
        
        case 'OBESIDADE':
            return `assets/silhueta-${siglaGenero}-obesidade.png`
            break
        
        case 'OBESIDADE GRAVE':
           return `assets/silhueta-${siglaGenero}-obesidade-morbida.png`
    
        default:
            break;
    }
}

button.addEventListener('click', () => {
    try {
        if(!peso.value || !altura.value || !optionF.checked && !optionM.checked) {
            throw new Error('Preencha todos os campos')
        } 

    }catch(erro) {
        iconInfo.src = 'assets/icons/info-icon.svg'
        const painelResultado = document.querySelector('.painel-resultado')
        textError.textContent = erro.message
        divErro.append(iconInfo, textError)
        divErro.classList.add('mensagem-erro')
        painelResultado.append(divErro)
        resultadoImc.innerText = ''
        return
    }

    let calculoImc = peso.value / (altura.value * altura.value) // calculo de imc

    resultadoImc.innerText = `IMC: ${calculoImc.toFixed(2)}`
    imcClasse.innerText = classificacaoImc(calculoImc)
    
    let optionGender

    if(optionM.checked) { // checa qual opção de gênero foi marcada
        optionGender = 'M'
    } else if (optionF.checked) {
        optionGender = 'F'
    }

    imgImc.src = getImgGender(classificacaoImc(calculoImc), optionGender)
})


// adicionar tela de carregamento
// adicionar tabela de imc
// adicionar um reade me no git hub


