function priority(c) {
    // calculate priority of the operators
    if (c == '^')
        return 3;
    else if (c == '/' || c == '*')
        return 2;
    else if (c == '+' || c == '-')
        return 1;
    else
        return -1;
}

function infixToPostfix(s) {
    // converting the equation to a postfix expression for ease in calculation
    let st = [];
    let result = "";
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (c>='0' && c<='9') {
            result+=c;
        }
        else{
            while (st.length!=0 && priority(s[i]) <= priority(st[st.length - 1])) {
                result += st[st.length - 1];
                st.pop();
            }
            st.push(c);
        }
    }

    while(st.length!=0){
        result += st[st.length-1];
        st.pop();
    }

    return result;
}

function calculate (exp) {
    // performing the final calculation
    var stack = [];
    var temp = "";
    for (let i = 0; i < exp.length; i++) {
        if (OPERATORS.includes(exp[i])) {
            op2 = stack.pop();
            op1 = stack.pop();
            temp = performOperation(op1, op2, exp[i])
            stack.push(temp);
        }
        else{
            stack.push(exp[i]);
        }

    }
    return stack.pop()
}

function performOperation(a, b, op) {
    // performing the single operations
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            return a+b
            break;
        case '-':
            return a-b
            break;
        case '*':
            return a*b
            break;
        case '/':
            return a/b
            break;
        case '%':
            return a%b
            break;
        case '^':
            return a**b
            break;

        default:
            break;
    }
}

$(document).ready(function () {
    $('.mode').click(function () {
        $('body').toggleClass('dark light');
    });
});

var eq = "";
const OPERATORS = ['/', '*', '-', '+','^','%'];
var final_result = 0;
var flag=true;



function display_equation(ele) {
    // displays the equation on the screen
    // if (flag) {
    //     $('.result').html(0)
    //     $('.equation').html(0)
    // }
    if (ele === "") {
        eq=eq.slice(0,-1);
    }
    if (ele === "AC") {
        eq="0";
        $('.result').html(0)

        return eq
    }
    if (OPERATORS.includes(ele)) {
        if (OPERATORS.includes(eq.slice(-1))){
            eq = eq.slice(0, -1)+ele;
        }
        else{
            eq+=ele
        }
    }
    else{
        if (ele !== '=') {
            eq+=ele;
        }
    }
    if (eq.substring(0,1) == "0") {
        eq = eq.slice(1,eq.length)
    }

    return eq;
}

$('.key').on("click", function (e) {
    var ele = e.target.id;
    var equation = display_equation(ele)
    $('.equation').html(equation);


    if (ele === "=") {

        if (OPERATORS.includes(equation.charAt(equation.length - 1))) {
            equation = equation.slice(0,-1);
        }

        var a = infixToPostfix(equation);

        var final_result = calculate(a);
        $('.result').html(final_result);

        // reset the equation after calculation of one expression
        eq = "0";
        $('.equation').html(equation);
    }
    else{
        final_result = 0;
        $('.result').html(final_result);
    }

});
