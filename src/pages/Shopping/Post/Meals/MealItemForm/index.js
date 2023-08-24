import swal from '@sweetalert/with-react';
import {useRef, useState} from 'react';
import { toast } from 'react-toastify';
import SoftButton from '../../../../../components/SoftButton';

// import classes from './MealItemForm.module.css';
import Input from '../Input';

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (enteredAmount > 10
			
		) {
			swal("Please enter a valid amount (1-10).")
			return;
		}
		props.onAddToCart(enteredAmountNumber);
		toast.success(`Added to cart: ${enteredAmount} item(s)`)
	};

	return (
		<form onSubmit = {submitHandler} >
			<Input
				ref = {amountInputRef}
				style={{display:'none'}}
				label = "Amount" 
				input = {{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '10',
					step: '1',
					defaultValue: '1'
				}} 
			/>	
			<SoftButton 
		onClick={submitHandler}
      style={{backgroundColor:'#2152ff',color:'#fff',marginTop:-30}}>
	  ADD TO CART
	  </SoftButton>	
		</form>
	);
};

export default MealItemForm;