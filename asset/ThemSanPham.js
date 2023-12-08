// Tác giả : Ngô Thanh Phương - B2004803
// Tài liệu tham khảo : Tham khảo các tài liệu và ví dụ của thầy gửi.

function isExistedInCart(item, arrCart){
    let myIndex = -1;
    arrCart.forEach((itemCart, index)=>{
        if(item.id == itemCart.id)  myIndex = index;
    });
    return myIndex;

}

function loadShoppingCart(){
    let products = [] ;
    const selectedItems = (evt) => {
        const linkClicked = evt.target;
        if(typeof Storage !== undefined){

            let newItem = {
                id: linkClicked.parentElement.children[0].textContent, 
                name: linkClicked.parentElement.children[1].textContent, 
                price: linkClicked.parentElement.children[2].textContent,
                quantity: 1 
            };
            if(JSON.parse(localStorage.getItem('cartItems')) === null){
                products.push(newItem); 
                localStorage.setItem('cartItems', JSON.stringify(products)); 
                window.location.reload();
            }
            else{
                const products = JSON.parse(localStorage.getItem('cartItems'));
                let index = isExistedInCart(newItem,products);
                if(index >=0){
                    products[index].quantity++; 
                    localStorage.setItem('cartItems', JSON.stringify(products));
                    window.location.reload();
                }
                else products.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(products));
                window.location.reload();
            }
        }else{
            alert( "Localstorage is not working on your browser !");
            // window.location.reload();
        }
    }
    const attachingEvent = evt => evt.addEventListener('click',selectedItems);
    const addToCart = document.getElementsByClassName('add__cart');
    Array.prototype.forEach.call(addToCart,attachingEvent); 

    const shoppingCard = document.querySelector('.shopping__cart');
    shoppingCard.addEventListener('click', function(){
        location.href = 'GioHang.html';
    });

    if(localStorage.getItem('cartItems') != undefined){
        const numberOrderedItems = document.querySelector('.shopping__cart .no__order-item');
        let numberOfItems = 0;
        let customerOrdered = JSON.parse(localStorage.getItem('cartItems'));
        customerOrdered.forEach(item => {
            numberOfItems += item.quantity;
        })
        numberOrderedItems.innerHTML = numberOfItems;
    }
}

function showCart(){
    if(localStorage.getItem('cartItems') == undefined){
        alert("Your cart is empty. Please go back home to order items");
        window.location.href = "SanPham.html";
    }
    else{
        let customerCart = JSON.parse(localStorage.getItem('cartItems'));
        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblFoot = document.getElementsByTagName('tfoot')[0];

        let headColumns = bodyRows = footColumns = '';
        headColumns += '<tr><th>No</th><th>Item ID</th><th>Item Name</th><th>Quantity</th><th>Item price</th><th>Delete</th></tr>';
        tblHead.innerHTML = headColumns;
        vat = total = amoutPaid = 0;
        no = 0;
        if(customerCart[0] === null){
            bodyRows += '<tr><td colspan="5">No items found</td></tr>';
        }else{
            customerCart.forEach(item => {
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g,""));
                bodyRows += '<tr><td>'+ ++no+'</td><td>'+ item.id+'</td><td>'+ item.name+'</td><td><input onblur="getInputValue(this)" id="sl-sp" type="number" value="' + item.quantity + '" min="1" max="100"/></td>'+'<td>'+ formatCurrency(item.price.replace(/[^0-9]/g,"")) +'</td><td><a href="#" onclick=deleteCart(this);>Delete</a></td></tr>';
                //new
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g,""));
            })
        }
        tblBody.innerHTML = bodyRows;
        footColumns += '<tr><td colspan="4">Total: </td> <td>'+formatCurrency(total) +'</td><td rowspan="3"></td></tr>';
        footColumns += '<tr><td colspan="4">VAT (10%):</td> <td>'+formatCurrency(Math.floor(total*0.1)) +'</td></tr>';
        footColumns += '<tr><td colspan="4">Amount paid:</td> <td>'+formatCurrency(Math.floor(total*1.1)) +'</td></tr>';
        
        tblFoot.innerHTML = footColumns;
    }
}
// xoa san pham
function deleteCart(evt){
    let updateProducts = [];
    let customerCart = JSON.parse(localStorage.getItem('cartItems'));
    customerCart.forEach(item => {
        if(item.id != evt.parentElement.parentElement.children[1].textContent){
            updateProducts.push((item));
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(updateProducts));
    window.location.reload();
}

//them san pham
function getInputValue(inputElement) {
    var value = parseInt(inputElement.value, 10); // Chuyển giá trị thành số
    // console.log("Giá trị input: " + value);
    var row = inputElement.parentNode.parentNode;
    var rowIndex = row.rowIndex;
    var customerCart = JSON.parse(localStorage.getItem('cartItems'));
    customerCart[rowIndex - 1].quantity = value;
    localStorage.setItem('cartItems', JSON.stringify(customerCart));
    window.location.reload();
}
  
const formatCurrency = (amount, locale="vi-VN") => {
    return new Intl.NumberFormat(locale,{
        style:'currency',
        currency: 'VND',
        minimumFractionDigits:0,
        maximumFractionDigits:2
    }).format(amount);
}

//tai lai gio hang
function reload() {
    window.location.reload();
}