import React, { useContext } from 'react'
import { auth } from '../../auth/firebase';
import CartContext from '../../auth/store/cart-context';
import Header from '../../components1/Header'
import Footer from '../../examples/Footer'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import CartItem from '../../sub-components/Cart'


function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function Cart() {
  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const {items} = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

  const clearCart= () => {
    window.localStorage.removeItem('Python1');
    window.localStorage.removeItem('Python');
    window.location.reload();
  }


  return (
    <div>
    <DashboardNavbar />
    <div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:5,borderBottom:'2px solid #2152ff'}}>
    <span style={{padding:4,borderRadius:8,fontWeight:'bold',color:'#2152ff',fontSize:18,cursor:'pointer'}} onClick={clearCart}><a className="cart-checkout-btn hover-btn">Clear</a></span>
    <span style={{fontWeight:'bold',color:'#2152ff'}}>Total(Ksh): {numberWithCommas(totalAmount)}</span>
    <span>
    {cartCtx.items.length > 0 &&(
      <>
      {auth?.currentUser?.uid ?(
                <a href="/check-out" className="cart-checkout-btn hover-btn">Checkout</a>
      ):(
        <a onClick={() => alert('progress...')} className="cart-checkout-btn hover-btn">Checkout</a>
      )}
              
      </>
  )}
    </span>
    </div>
      <div
      style={{
        maxHeight: 'calc(100vh - 210px)',
        overflowY: 'auto'
       }}
      >
      <CartItem />
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default Cart