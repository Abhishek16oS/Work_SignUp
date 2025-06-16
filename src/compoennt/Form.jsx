import React, { useActionState, useState } from 'react'

const Form = () => {

 const allData ={

    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

 const [errors, setErrors] = useState({
    firstName: "",
     lastName: "",
    email: "",
    password: "",
  });

    const allowedProviders = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'protonmail.com',

  ];


    const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    const domain = email.split('@')[1];
    if (!allowedProviders.includes(domain)) {
      return { valid: false, message: 'Only Gmail, Yahoo, Outlook, and Hotmail and protonmail are allowed' };
    }
    return { valid: true, message: '' };
  };




 
async  function handleForm(state,formData){
    let isValid = true;
    const newErrors = { firstName: "",lastName:"", email: "", password: "" };
    const firstName=formData.get('firstName');
    const lastName=formData.get('lastName');
    const email=formData.get('email');
    const password=formData.get('password');

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    // Last name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }


    const emailValidation = validateEmail(email);
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailValidation.valid) {
      newErrors.email = emailValidation.message;
      isValid = false;
    }





    await new Promise((res)=>setTimeout(res,2000))
        // console.log('handleSubmit called',firstName,lastName,email);
        if(firstName && lastName && email  && password ) {
            return {message:'Data Submitted',firstName,lastName,email,password}
        }
        else{
            return{error:'failed to Submit:Input fields cannot be empty'}
        }
    

  }  


  const [data,formAction,pending]=useActionState(handleForm,allData);
    

    
    
    return(   <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center font-primary">Sign Up</h2>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={data?.firstName}
            
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.firstName && (
            <p className="text-red-500 mt-1">{errors.firstName}</p>
          )} */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="firstName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={data?.lastName}
            
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.lastName && (
            <p className="text-red-500 mt-1">{errors.lastName}</p>
          )} */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={data?.email}
            
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>} */}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={data?.password}
            
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.password && (
            <p className="text-red-500 mt-1">{errors.password}</p>
          )} */}
        </div>
        <button
        className='w-full py-2 px-4 rounded text-white font-medium bg-blue-400 p-3 cursor-pointer' disabled={pending} type='submit'
          
        >
          {pending?'Submitting':'Sign Up'}
        </button>
      </form>
    </div>)
}

export default Form
