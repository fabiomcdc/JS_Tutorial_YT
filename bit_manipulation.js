function getBit(num, i){
    console.log(`O ${i}-ézimo digito de ${num} (${num.toString(2)}) é ${( num & (1 << i))}`)
}

function op(num1,num2,operation){
    b1 = parseInt(num1,2);
    b2 = parseInt(num2,2);
    switch (operation) { 
        case "+":
            b = b1 + b2;
            break;
        case "*":
            b = b1 * b2;
            break;        
        case "^":
            b = b1 ^ b2;
            break;
        case "&":
            b = b1 & b2;
            break;
        case ">>":
            b = b1 >> b2;
            break;
        case "<<>>>>":
            b = b1 << b2;
            break;
    }
    console.log(`${num1} ${operation} ${num2} = ${b.toString(2)}`);
}

var num1 = "1000000001";
var num2 = "10101";
console.log(insert(num1, num2, 6, 1));

function insert(num1, num2, j, i){  // exercício 5.1
    b1 = parseInt(num1,2);
    b2 = parseInt(num2,2);
    var x = (1 << j) - 1;
    var y = (1 << i) - 1;
    x = (x - y) ^ ((1 << 10)-1);
    x = b1 & x;
    y = b2 << i;
    return (x | y).toString(2) ;

}

console.log(module);