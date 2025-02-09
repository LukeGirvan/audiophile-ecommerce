import '../styles/checkout.scss'
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types/cartTypes';
import { useEffect, useState, useMemo } from 'react';
import Footer from './footer';


type Validation = {
    selector: string;
    pattern: RegExp;
    errorClass: string;
};

type Validations = {
    [ValidationKey: string]: Validation;
};

interface FormData{
    name:string;
    email:string;
    phoneNum:string;
    address:string;
    zip:string;
    city:string;
    country:string;
    eMoneyPin:string;
    eMoneyNum:string;

}


function CheckoutForm(){

    const location = useLocation()


    const { items, totalPrice,clearCart} = useCart()

    const [eMoneyChecked, setEmoneyChecked] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [cashChecked, setCashChecked] = useState(false)
    const [showROC, setShowROC] = useState(false)
    const [hideROC, sethideROC] = useState(false)
    
   
    const [formData, setFormData] =useState<FormData>({
        name:"",
        email:"",
        phoneNum:"",
        address:"",
        zip:"",
        city:"",
        country:"",
        eMoneyNum:"",
        eMoneyPin:"",
    })

    const formValidations = useMemo<Validations>(() => ({
        name: {
            selector: '.name-input',
            pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
            errorClass: '.name-error',
        },
        email: {
            selector: '.email-input',
            pattern: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
            errorClass: '.email-error',
        },
        phoneNum: {
            selector: '.phone-input',
            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            errorClass: '.phone-error',
        },
        address: {
            selector: '.address-input',
            pattern: /\w+(\s\w+){2,}/,
            errorClass: '.address-error',
        },
        zip: {
            selector: '.zip-input',
            pattern: /^[0-9]{6}$/,
            errorClass: '.zip-error',
        },
        city: {
            selector: '.city-input',
            pattern: /^[a-zA-Z]{1,20}\s?[a-zA-Z]{1,20}$/,
            errorClass: '.city-error',
        },
        country: {
            selector: '.country-input',
            pattern: /^[a-zA-Z]{1,20}\s?[a-zA-Z]{1,20}$/,
            errorClass: '.country-error',
        },
        eMoneyPin: {
            selector: '.e-money-pin-input',
            pattern: /^[0-9]{4}$/,
            errorClass: '.e-money-pin-error',
        },
        eMoneyNum: {
            selector: '.e-money-num-input',
            pattern: /^[0-9]{9}$/,
            errorClass: '.e-money-num-error',
        }
    }), []);
    

    const formChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        console.log(name)
        setFormData((prev)=>({
            ...prev, [name]:value
        }))
        const errorSpan = document.querySelector(`${formValidations[name].errorClass}`) as HTMLSpanElement
        const currentInput = document.querySelector(`${formValidations[name].selector}`) as HTMLInputElement

        
        if(!value.match(formValidations[name].pattern) ){
            showFormError(formValidations[name].selector, formValidations[name].errorClass)
        }
        if(value.match(formValidations[name].pattern) && !errorSpan.classList.contains('hidden') && currentInput.classList.contains('error')){
            errorSpan.textContent = ''
            errorSpan.classList.toggle('hidden')
            currentInput.classList.remove('error')
        }
    }


    const changeRadioButtons =(e:React.MouseEvent) => {
        if((e.target as HTMLElement).classList.contains('e-money-radio')){
            setEmoneyChecked(true)
            setCashChecked(false)
        }else{
            setEmoneyChecked(false)
            setCashChecked(true)
        }
    }


    const showSuccessModal = ( ) =>{
        document.body.classList.toggle('scroll-lock')
        setShowModal(true)
    }



    const validateForm = (e:React.MouseEvent) => {
        e.preventDefault()
        
        let errors = false;
        
        const valiationArr = [formValidations.name,formValidations.email, formValidations.address, formValidations.phoneNum,
            formValidations.city, formValidations.zip, formValidations.country,  formValidations.eMoneyPin,  formValidations.eMoneyNum
        ];
        const checkoutForm = document.querySelector('.checkout') as HTMLFormElement
        valiationArr.some(({ selector, pattern, errorClass }) => {
            const input = checkoutForm.querySelector(selector) as HTMLInputElement;
            console.log(selector)
            if((selector === '.e-money-pin-input' || selector === '.e-money-num-input') && !eMoneyChecked && !errors){
                showSuccessModal()
            }
            if (!input.value.match(pattern)) {
                showFormError(selector, errorClass);
                errors = true;
            }
        });
        if(!errors){
            showSuccessModal()
            
        }
    }

  

    const showFormError= (formClass:string, errorClass:string)=> {
        const input = document.querySelector(`${formClass}`) as HTMLElement 
        const errorSpan = document.querySelector(`${errorClass}`)
        if(input && !input.classList.contains('error')){
            input.classList.add('error')
        }
        if(errorSpan && errorSpan.classList.contains('hidden')){
            errorSpan.textContent += 'Wrong format'
            errorSpan.classList.toggle('hidden')

        }
    }



    const showmore = ( ) =>{
        setShowROC(true)
        sethideROC(false)

    }

    const showLess =  () => {
        sethideROC(true)
        setShowROC(false)
    }

    useEffect(()=>{
        if(document.body.classList.contains('scroll-lock')){
        document.body.classList.toggle('scroll-lock')
    }
},[])

    return(<>
    <div className={`background-blur ${showModal ? '' : 'hide'}` }>

    </div>
        <div className="modal-wrapper">
            <div className= {`checkout-modal ${showModal ? '' : 'hide'}`}>
                <div className="checkout-modal-content">
                    <img src='src/assets/shared/desktop/icon-check-mark.svg' alt="" className='checkmark' />
                    <h2 className="thank-you">
                        THANK YOU
                    </h2>
                    <span className='for-order'> FOR YOUR ORDER</span>
                    <p className="order-complete">
                        You will receive a confirmation email shortly
                    </p>
                    <div className="checkout-holder">
                            <div className="checkout-cart">
                                <div className="cart-item">
                                    <div className="image-holder">
                                        <img src={items[0].image.desktop} alt="" />
                                        <div className="product-details">
                                            <h3 className="product-title">
                                            {items[0].cartName} 
                                            </h3>
                                            <p className="price">
                                            $  {    items[0].price.toLocaleString()}
                                            </p>
                                            
                                        </div>
                                    </div>
                                    <div className="quantity"> x{items[0].quantity}</div>
                                </div>
                                <div className={`line-div ${showROC? 'hide' : ''}`}></div>
                                <a onClick={showmore} className={`show-more ${showROC? 'hide' : ''}`}>and {items.length -1 } other item(s)</a>
                                <div className={`rest-of-cart ${showROC? '': 'hide'}`}>
                                    {items.slice(1).map((item:CartItem) => (
                                        <div className="cart-item">
                                            <div className="image-holder">
                                            <img src={item.image.desktop} alt={`image of ${item.name}`} className="cart-image" />
                                            <div className="product-details">
                                            <h3 className="product-title">
                                                {item.cartName}
                                            </h3>
                                            <p className="price">
                                            $ {item.price.toLocaleString()}
                                            </p>
                                            </div>
                                            </div>
                                            <div className="quantity">
                                            x{item.quantity}
                                            </div>
                                        </div>  
                                    ))}




                                    <div className={`line-div ${hideROC? 'hide' : ''}`}></div>
                                    <a onClick={showLess} className={`show-less ${hideROC? 'hide' : ''}`}>
                                        Show less

                                    </a>
                                    
                                </div>
                            </div>
                            <div className="grand-total">
                                <div className="price-holder">
                                    <span className="grand">
                                        GRAND TOTAL
                                    </span>
                                  <span className="price">
                                      $  {totalPrice.toLocaleString()}
                                  </span>
                                </div>
                            </div>
                    </div>
                    <Link to='/'><button className="button1 full-width" onClick={clearCart}>BACK TO HOME</button></Link>
                </div>
            </div>
        </div>
        <div className="wrapper" id="checkout">
            
        <div className="go-back">
            <Link to={location.state.from} state={{from: location.pathname}}>Go Back</Link>
        </div>
            <div className="checkout-holder">
                <div className="checkout-form-holder">
                    <h1 className='checkout-title'>
                        CHECKOUT
                    </h1>
                <form action="checkout" className="checkout">
                    <div className="billing-details">
                        <p className="orange-font">
                            BILLING DETAILS
                        </p>
                        <div className="input-holder">
                            <div className="label-holder">
                            <label htmlFor="name-input" >Name</label>
                            <span className='name-error hidden'></span>
                            </div>
                            
                            <input type="text" className='name-input'  name='name' placeholder='Alexei Ward' onChange={formChange} value={formData.name}/>
                        </div>
                        <div className="input-holder">
                            
                            <div className="label-holder">
                            <label htmlFor="email-input">Email address </label>
                            <span className='email-error hidden'></span>
                            </div>
                            <input type="text" className='email-input' name='email' placeholder='alexeiward@mail.com' onChange={formChange} value={formData.email}/>
                        </div>
                        <div className="input-holder">
                            
                            <div className="label-holder">
                            <label htmlFor="phone-input">Phone number</label>
                            <span className='phone-error hidden'></span>
                            </div>
                            <input type="text" className='phone-input' name='phoneNum' placeholder='+1 202-555-0136'onChange={formChange} value={formData.phoneNum}/>
                        </div>
                       
                    </div>

                    <div className="shipping-details">
                        <p className="orange-font">
                            SHIPPING INFO 
                        </p>
                        <div className="input-holder long">
                           
                            <div className="label-holder">
                            <label htmlFor="adress-input"> Address</label>
                            <span className='address-error hidden'></span>
                            </div>
                            <input type="text" className='address-input'name='address' placeholder='1137 Williams Avenue'onChange={formChange} value={formData.address}/>
                        </div>
                        <div className="input-holder">
                            
                            <div className="label-holder">
                            <label htmlFor="zip-input">Zip Code</label>
                            <span className='zip-error hidden'></span>
                            </div>
                            <input type="text" className='zip-input'name='zip' placeholder='100001' onChange={formChange} value={formData.zip}/>
                        </div>
                        <div className="input-holder">
                            
                            <div className="label-holder">
                            <label htmlFor="city-input">City</label>
                            <span className='city-error hidden'></span>
                            </div>
                            <input type="text" className='city-input'name='city' placeholder='New York' onChange={formChange} value={formData.city}/>
                        </div>
                        <div className="input-holder">
                            <div className="label-holder">
                            <label htmlFor="country-input">Country</label>
                            <span className='country-error hidden'></span>
                            </div>
                            <input type="text" className='country-input' name='country' placeholder='United States' onChange={formChange} value={formData.country}/>
                        </div>
                       
                    </div>

                    <div className="payment-details">
                        <p className="orange-font">
                            PAYMENT DETAILS
                        </p>
                    <div className="radio-options">
                        <div className="label-holder">
                        <label htmlFor="
                        ">
                            PAYMENT OPTIONS
                        </label>
                        </div>
                        <div className="radio-button-holder">
                            
                       <div className={`div-that-ll-input ${eMoneyChecked ? 'orange-border' : ''}`}>
                       <input type="radio" 
                        name='radio2' 
                        value='' 
                        checked={eMoneyChecked}
                        onClick={changeRadioButtons}
                        className="e-money-radio" />
                        <span className='e-money-span'>
                            e-Money
                        </span>
                       </div>
                        
                       <div className={`div-that-ll-input ${cashChecked ? 'orange-border' : ''}`}>
                       <input type="radio" 
                        name='radio3' 
                        value='' 
                        checked={cashChecked}
                        onClick={changeRadioButtons}
                        className="cash-payment" />
                        <span className='cash-payment-span'>
                            Cash on Delivery
                        </span>
                       </div>
                       
                    </div>

                        
                    </div>
                   <div className={`emoney-details ${eMoneyChecked ? '' : 'hidden'}`}>
                   <div className="input-holder">
                            <div className="label-holder">
                            <label htmlFor="e-money-num-input">e-Money Number</label>
                            <span className='e-money-num-error hidden'></span>

                            </div>
                            <input type="text" className='e-money-num-input' name='eMoneyNum' placeholder='238521993' onChange={formChange} value={formData.eMoneyNum}/>
                        </div>
                        <div className="input-holder">
                            <div className="label-holder">
                            <label htmlFor="e-money-input">e-Money Pin</label>
                            <span className='e-money-pin-error hidden'></span>

                            </div>
                            <input type="text" className='e-money-pin-input' name='eMoneyPin'  placeholder='6891' onChange={formChange} value={formData.eMoneyPin}/>
                        </div>
                    </div>
                   </div>

                    </form>
                </div>
                
            <div className='checkout-cart' >
                <div className="cart-content">
                <div className="top-div">
                <h1 className="title">
                   SUMMARY
                </h1>
                
                </div>
                {items.map((item:CartItem) => (
                    <div className="cart-item">
                        <div className="image-holder">
                        <img src={item.image.desktop} alt={`image of ${item.name}`} className="cart-image" />
                        <div className="product-details">
                        <h3 className="product-title">
                            {item.cartName}
                        </h3>
                        <p className="price">
                        $ {item.price.toLocaleString()}
                        </p>
                        </div>
                        </div>
                        <span className="quantity">x{item.quantity}</span>
                    </div>
                ))}
                </div>
                <div className="bottom-div">
                    <div className="price-details">
                    <p>
                        TOTAL
                    </p>

                    <p className="total-price">
                    $ {
                            totalPrice.toLocaleString()
                        }
                    </p>
                    
                    </div>

                    <div className="shipping-details">
                    <p>
                        SHIPPING
                    </p>

                    <p className="total-price">
                    $ {
                            50
                        }
                    </p>
                    
                    </div>

                    <div className="vat-details">
                        <p>
                            VAT (INCLUDED)
                        </p>

                        <p className="total-price">
                        $ {
                                (totalPrice * .2).toLocaleString()
                            }
                        </p>
                    
                    </div>

                    <div className="grand-total ">
                        <p>
                            GRAND TOTAL
                        </p>

                        <p className="total-price orange-font">
                        $ {
                                (totalPrice + 50).toLocaleString()
                            }
                        </p>
                    
                    </div>










                    <Link to={'/checkout'} state={{from:location.pathname}}>
                    <button className="button1 full-width" onClick={validateForm} >
                        CHECKOUT
                    </button>
                    </Link>
                </div>
    </div>
    </div>
    </div>
    <Footer/>
    </>)
}

export default CheckoutForm;