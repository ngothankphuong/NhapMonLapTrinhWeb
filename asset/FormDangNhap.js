// Tác giả : Ngô Thanh Phương - B2004803

//dang nhap
var check = document.getElementById('showpass');
var show = document.getElementById('show')
var inputPass = document.getElementById('inputPass');
var inputEmail = document.getElementById('inputEmail');

var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var nameCheck = /^[\p{L}]{2,}(?: [\p{L}]+){0,}$/u;
var passCheck = /^.{3,}$/;

var messEmail = document.getElementById('messEmail');
var messPass = document.getElementById('messPass');

show.addEventListener('click', function(){
     if(check.checked) {
          inputPass.type="text"
     }
     else inputPass.type="password"
});

inputEmail.onblur = function(){
     if(inputEmail.value == "") {
          messEmail.innerHTML = "This field is required"
          messEmail.style.color = "red";
     }
     else if(!emailCheck.test(inputEmail.value)){
          messEmail.innerHTML = "Error"
          messEmail.style.color = "red";
     }
     else {
          messEmail.innerHTML = "Passed"
          messEmail.style.color = "green";
     }
}

inputPass.onblur = function(){
     if(inputPass.value == ""){
          messPass.innerHTML = "This field is required"
          messPass.style.color = "red";
     }
     else {
          messPass.innerHTML=null;
     }
}

var tendangnhap = false;
var matkhau = false;
var username = document.getElementById('username');
var btn_dangnhap = document.getElementById('btn-dangnhap');
btn_dangnhap.addEventListener('click', function(event){
     for(const key in localStorage) {
          console.log(`${key} : ${localStorage.getItem(key)}`);
          if(inputEmail.value == localStorage.getItem(key)){
               tendangnhap=true;
               break;
          }
     }
     for(const key1 in localStorage) {
          if(inputPass.value == localStorage.getItem(key1)) {
               matkhau=true;
               break;
          }
     }
     if(messEmail.innerHTML=="Passed" && tendangnhap && matkhau ) {
          alert('Đăng nhập thành công!');
          window.location.href="SanPham.html";
     }
     else alert('Nhập sai tài khoản hoặc mật khẩu!')
})
