// Tác giả : Ngô Thanh Phương - B2004803

//dang ky
var inputname = document.getElementById('dk_inputname');
var inputemail = document.getElementById('dk_inputemail');
var inputpass = document.getElementById('dk_inputpass');
var inputpass2 = document.getElementById('dk_inputpass2');

var messName = document.getElementById('messName');
var messEmail = document.getElementById('messEmail');
var messPass = document.getElementById('messPass');
var messPass2 = document.getElementById('messPass2')
var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var nameCheck = /^[\p{L}]{2,}(?: [\p{L}]+){0,}$/u;
var passCheck = /^.{3,}$/;

inputname.onblur = function () {
     if (inputname.value == "") {
         messName.textContent = "This field is required"
         messName.style.color = "red"
     }
     else if (!nameCheck.test(inputname.value)) {
         messName.textContent = "Error"
         messName.style.color = "red"
     }
     else {
         messName.textContent = "Passed"
         messName.style.color = "green"
     }
}

inputemail.onblur = function () {
     if (inputemail.value == "") {
          messEmail.textContent = "This field is required"
          messEmail.style.color = "red"
     }
     else if (!emailCheck.test(inputemail.value)) {
          messEmail.textContent = "Error"
          messEmail.style.color = "red"
     }
     else {
          messEmail.textContent = "Passed"
         messEmail.style.color = "green"
     }
}

inputpass.onblur = function () {
     if (inputpass.value == "") {
          messPass.textContent = "This field is required"
          messPass.style.color = "red"
     }
     else if (!passCheck.test(inputpass.value)) {
          messPass.textContent = "Error"
          messPass.style.color = "red"
     }
     else {
          messPass.textContent = "Passed"
          messPass.style.color = "green"
     }
}

inputpass2.onblur = function () {
     if (inputpass.value == "") {
          messPass2.textContent = "This field is required"
          messPass2.style.color = "red"
     }
     else if (inputpass2.value != inputpass.value) {
          messPass2.textContent = "Error"
          messPass2.style.color = "red"
     }
     else {
          messPass2.textContent = "Passed"
          messPass2.style.color = "green"
     }
}

var btn_Dangky = document.getElementById('btn_dangky');
btn_Dangky.addEventListener('click', function(){
     if(messName.innerHTML=="Passed" && messEmail.innerHTML=="Passed" && messPass.innerHTML=="Passed" && messPass2.innerHTML=="Passed") {
          localStorage.setItem("inputName", inputemail.value);
          localStorage.setItem("inputPass", inputpass.value);
          alert('Đăng ký thành công.');
          window.location.href="DangNhap.html";
     }
     else {
          alert('Vui lòng nhập đầy đủ thông tin.')
     }
});
