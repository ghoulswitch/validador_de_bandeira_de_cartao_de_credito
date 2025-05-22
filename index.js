function validarCartao(numero) {
    //remove todos os espaços e traços
    const num = numero.replace(/[\s-]/g, '');

    //implementação do algoritmo de Luhn
    let soma = 0;
    let alternar = false;
    for (let i = num.length - 1; i >= 0; i--) {
        //conversão em número inteiro
        let n = parseInt(num[i]);
        //se 'alternar' for true, o dígito é multiplicado por 2
        if (alternar) {
            n *= 2;
            //caso o resultado seja maior que 9, subtrai-se 9 desse valor, o que equivale a somar os dígitos do resultado (12 vira 1 + 2 = 3, que é o mesmo que 12 - 9 = 3)
            if (n > 9) n -= 9;
        }
        //o dígito processado é somado ao total acumulado (soma)
        soma += n;
        alternar = !alternar;
    }
    const valido = soma % 10 === 0;

    //identificação da bandeira
    let bandeira = 'Desconhecida';
    if (
        /^4\d{12}(\d{3})?$/.test(num) ||
        /^4[0-9]{12}(?:[0-9]{3})?$/.test(num)
    ) {
        bandeira = 'Visa';
    } else if (
        (/^5[1-5]\d{14}$/.test(num)) ||
        (/^2(2[2-9][1-9]|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/.test(num))
    ) {
        bandeira = 'MasterCard';
    } else if (
        /^4011\d{12}$/.test(num) ||
        /^4312\d{12}$/.test(num) ||
        /^4389\d{12}$/.test(num)
    ) {
        bandeira = 'Elo';
    } else if (/^3[47]\d{13}$/.test(num)) {
        bandeira = 'American Express';
    } else if (
        /^6011\d{12}$/.test(num) ||
        /^65\d{14}$/.test(num) ||
        /^64[4-9]\d{13}$/.test(num)
    ) {
        bandeira = 'Discover';
    } else if (/^6062\d{12}$/.test(num)) {
        bandeira = 'Hipercard';
    } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(num)) {
        bandeira = 'Diners Club'
    } else if (/^2014\d{11}$|^2149\d{11}$/.test(num)) {
        bandeira = 'EnRoute';
    } else if (
        /^35(2[89]|[3-8][0-9])\d{12}$/.test(num) || 
        /^(?:2131|1800|35\d{3})\d{11}$/.test(num)
    ) {
        bandeira = 'JCB'
    } else if (/^8699\d{11}$/.test(num)) {
        bandeira = 'Voyager'
    } else if (/^50\d{14}$/.test(num)) {
        bandeira = 'Aura'
    }

    return { valido, bandeira };
}

const resultado = validarCartao('5088 5407 5551 2752');
console.log(resultado); 