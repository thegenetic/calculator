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



function expression(eq) {
    i=0;
    st=[];
    flag = true;
    a="";
    while (i<eq.length) {
        if (OPERATORS.includes(eq[i])) {
            flag = false;
        }

        if (flag) {
            a+=eq[i];
        }

        else{
            st.push(a);
            a="";
            flag=true;
            st.push(eq[i]);
        }
        if (flag && i == eq.length - 1) {
            st.push(a);
        }
        i++;
    }
    return st;
}


function calculate(exp) {
        var a = '';
    // console.log(exp);
    while (exp.length > 1) {


        if (exp.includes('*') || exp.includes('/')) {
            a = exp.includes('*') ? exp.indexOf('*') : exp.indexOf('/');
        }
        else{
            if (exp.includes('+') || exp.includes('-')) {
                a = exp.includes('+') ? exp.indexOf('+') : exp.indexOf('-');
            }
            else{
                if (exp.includes('^') || exp.includes('%')) {
                    a = exp.includes('^') ? exp.indexOf('^') : exp.indexOf('%');
                }
            }


        }

        op1 = exp[a-1]==""? 0:Number(exp[a-1])
        op2 = Number(exp[a+1])
        op = exp[a];
        var c = performOperation(op1,op2,op)
        if (exp.length == 3) {
            exp = [c];
        }
        else{
            exp = [...exp.slice(0, a-1), c, ...exp.slice(a + 2)];
        }
    }
    return exp.pop()

}

function performOperation(a, b, op) {
    // performing the single operations
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            // console.log(a+b);
            return a+b
            break;
        case '-':
            // console.log(a-b);
            return a-b
            break;
        case '*':
            // console.log(a*b);
            return a*b
            break;
        case '/':
            // console.log(a/b);
            return a/b
            break;
        case '%':
            // console.log(a%b);
            return a%b
            break;
        case '^':
            // console.log(a**b);
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
        var t = expression(equation);

        var final_result = calculate(t);
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
