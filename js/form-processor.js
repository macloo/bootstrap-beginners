// Get all data from all form elements and show them in an alert.
// 
// this script processes your form data locally only - no server
// good for testing your form
//
// this works with a form for which the opening tag is:
// <form id="myForm" action="/echo/html/" method="post">
// and include this script at the bottom of the file, before </body>
// after all other SCRIPT tags 

var data;
var form = document.getElementById("myForm");
form.onsubmit = checkAnswers;

function checkAnswers() {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
        case 'INPUT':
            switch (form.elements[i].type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'url':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
                q.push(form.elements[i].name + "=" + form.elements[i].value);
                break;
            case 'checkbox':
            case 'radio':
                if (form.elements[i].checked) {
                    q.push(form.elements[i].name + "=" + form.elements[i].value);
                }
                break;
            }
            break;
        case 'file':
            break;
        case 'TEXTAREA':
            q.push(form.elements[i].name + "=" + form.elements[i].value);
            break;
        case 'SELECT':
            switch (form.elements[i].type) {
            case 'select-one':
                q.push(form.elements[i].name + "=" + form.elements[i].value);
                break;
            case 'select-multiple':
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                    if (form.elements[i].options[j].selected) {
                        q.push(form.elements[i].name + "=" + form.elements[i].options[j].value);
                    }
                }
                break;
            }
            break;
        case 'BUTTON':
            switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
                q.push(form.elements[i].name + "=" + form.elements[i].value);
                break;
            }
            break;
        }
    }
    data = q.join("&");
    alert(q.join("\n"));
    
    return false;
}
