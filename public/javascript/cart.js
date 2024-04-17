  const plusButton = document.getElementById('plus');
  const minusButton = document.getElementById('minus');
  const plusButton2 = document.getElementById('plus2');
  const minusButton2 = document.getElementById('minus2');
  const updateButton = document.getElementById('update');
  const subtotal = document.getElementById('subtotal');
  const sales = document.getElementById('sales');
  const grand = document.getElementById('grand');
  const qty = document.getElementById('qty');
  const qty2 = document.getElementById('qty2');
  const total = document.getElementById('total');
  const total2 = document.getElementById('total2');
  price = total.innerHTML;
  price2 = total2.innerHTML;
  val = 1;
  val2 = 1;

  function increment() {
    val = val+1;
    qty.innerHTML = val;
    total.innerHTML = price * val;
  }

  function decrement() {
    if(val>1){
    val = val-1;
    qty.innerHTML = val;
    total.innerHTML = price * val;
    }
  }

  function increment2() {
    val2 = val2+1;
    qty2.innerHTML = val2;
    total2.innerHTML = price2 * val2;
  }

  function decrement2() {
    if(val2>1){
    val2 = val2-1;
    qty2.innerHTML = val2;
    total2.innerHTML = price2 * val2;
    }
  }

  function updateNum() {
    subtotal.innerHTML = parseInt(total.innerHTML) + parseInt(total2.innerHTML);
    sales.innerHTML = subtotal.innerHTML * 0.08;
    grand.innerHTML = parseInt(sales.innerHTML) + parseInt(subtotal.innerHTML)
  }
  // add event listener to the buttons
  plus.addEventListener('click', increment);
  minus.addEventListener('click', decrement);
  plus2.addEventListener('click', increment2);
  minus2.addEventListener('click', decrement2);
  update.addEventListener('click', updateNum);