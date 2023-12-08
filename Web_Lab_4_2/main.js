
function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    } else {
        return 2;
    }
}


function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}

function isDigit(str) {
    return /^\d{1}$/.test(str);
}

function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        }
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        }
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}

function compile(str) {
    let out = [];
    let stack = [];
    for (token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            while (stack.length > 0 &&
                isOperation(stack[stack.length - 1]) &&
                priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            stack.push(token);
        } else if (token == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join(' ');
}

function evaluate(str) {
    let screen = document.querySelector('span');
    let postfix = compile(str).split(' ');
    let stack = [];

    for (let i = 0; i < postfix.length; ++i) {
        if (isOperation(postfix[i])) {
            let two = stack.pop();
            let one = stack.pop();
            switch(postfix[i]) {
                case '+':
                    stack.push(one + two);
                    break;
                case '-':
                    stack.push(one - two);
                    break;
                case '*':
                    stack.push(one * two);
                    break;
                case '/':
                    stack.push(one / two);
                    break;
            }
        }
        else {
            stack.push(+postfix[i]);
        }
    }

    screen.textContent = stack.pop();
}

function clickHandler(event) {
    let target = event.currentTarget;
    let screen = document.querySelector('span');

    if (isDigit(target.textContent) || target.textContent == '(' || target.textContent == ')') {
        if (screen.textContent == '0') {
            screen.textContent = '';
        }

        screen.textContent += target.textContent;
    }
    else if (isOperation(target.textContent) || target.textContent == '.') {
        screen.textContent += target.textContent;
    }
    else if (target.textContent == '=') {
        evaluate(screen.textContent);
    }
    else if (target.textContent == 'C') {
        screen.textContent = '0';
    }

    let container = document.getElementsByClassName('calc-container')[0];
    if (screen.textContent.length > 14) {
        container.style.width = `${350 + 25 * (screen.textContent.length - 14)}px`;
    }
    else {
        container.style.width = '350px';
    }
}

window.onload = function () {
    document.getElementsByTagName('span')[0].textContent = 0;
    let keys = document.getElementsByClassName('key');
    for (let i = 0; i < keys.length; ++i) {
        keys[i].addEventListener('click', clickHandler);
    }
};
