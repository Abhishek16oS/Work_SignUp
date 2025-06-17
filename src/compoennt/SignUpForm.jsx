


// "use client";

// import React, { useState } from "react";

// const SignUpForm = () => {
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const validateForm = (formData) => {
//     const errors = {};
//     const firstName = formData.get("firstName")?.trim();
//     const lastName = formData.get("lastName")?.trim();
//     const email = formData.get("email")?.trim();
//     const password = formData.get("password")?.trim();
//     const number= formData.get("number")?.trim();

//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "protonmail.com",
//     ];
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//     if (!firstName) errors.firstName = "First name is required";
//     if (!lastName) errors.lastName = "Last name is required";
//     if (!number) errors.number = "Phone Number is required";

//     if (!email) {
//       errors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//       errors.email = "Invalid email format";
//     } else {
//       const domain = email.split("@")[1];
//       if (!allowedDomains.includes(domain)) {
//         errors.email = `Email provider must be one of: ${allowedDomains.join(", ")}`;
//       }
//     }

//     if (!password) {
//       errors.password = "Password is required";
//     } else if (!passwordRegex.test(password)) {
//       errors.password =
//         "Password must include uppercase, lowercase, number, special character and be 8+ characters long";
//     }

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess(false);
   

//     const formData = new FormData(e.target);
//     const validationErrors = validateForm(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       setLoading(false);
//       return;
//     }

//     // If valid, send to PHP

//      setTimeout(async () => {
//     try {
//       const res = await fetch("http://localhost/react-signup/signup.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName: formData.get("firstName"),
//           lastName: formData.get("lastName"),
//           email: formData.get("email"),
//           password: formData.get("password"),
//         }),
//       });

//       const result = await res.json();

//       if (result.status === "success") {
//         setSuccess(true);
//         e.target.reset();
//         setErrors({});

//         // Hide success message after 3 seconds
//         setTimeout(() => {
//           setSuccess(false);
//         }, 3000);
//       } else {
//         setErrors({ server: result.message || "Signup failed" });
//       }
//     } catch (err) {
//       setErrors({ server: "Connection to server failed" });
//     } finally {
//       setLoading(false);
//     }
//   }, 2000);
// };


//   return (
//     <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto p-4 shadow rounded bg-white">
//       <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//        <fieldset disabled={loading} className={loading ? "opacity-50" : ""}>

      
//       <div className="mb-4">
//         <label className="block mb-1">First Name</label>
//         <input disabled={loading}  name="firstName" type="text" className="w-full p-2 border rounded" />
//         {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Last Name</label>
//         <input disabled={loading} name="lastName" type="text" className="w-full p-2 border rounded" />
//         {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Number</label>
//         <input disabled={loading} name="number" type="text" className="w-full p-2 border rounded" />
//         {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Email</label>
//         <input disabled={loading} name="email" type="email" className="w-full p-2 border rounded" />
//         {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Password</label>
//         <input disabled={loading} name="password" type="password" className="w-full p-2 border rounded" />
//         {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//       </div>

//       {errors.server && (
//         <p className="text-red-500 text-sm mb-4">{errors.server}</p>
//       )}

//       {success && (
//         <p className="text-green-600 text-sm mb-4 text-center">Signup successful!</p>
//       )}

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         disabled={loading}
//       >
//         {loading ? "Signing Up..." : "Sign Up"}
//       </button>
//  </fieldset>


//     </form>
//   );
// };

// export default SignUpForm;


"use client";

import React, { useState } from "react";

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Validation Function ---
  const validateForm = (formData) => {
    const errors = {};
    const firstName = formData.get("firstName")?.trim();
    const lastName = formData.get("lastName")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();
    const number = formData.get("number")?.trim();

    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "protonmail.com",
    ];
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // First & Last Name
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";

    // Phone Number Validation
    if (!number) {
      errors.number = "Phone number is required";
    } else if (!/^\d+$/.test(number)) {
      errors.number = "Phone number must contain only digits";
    } else if (number.length < 10 || number.length > 15) {
      errors.number = "Phone number must be between 10 and 15 digits";
    }

    // Email Validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
    } else {
      const domain = email.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        errors.email = `Email provider must be one of: ${allowedDomains.join(", ")}`;
      }
    }

    // Password Validation
    if (!password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must include uppercase, lowercase, number, special character and be 8+ characters long";
    }

    return errors;
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    // If valid, send to PHP
    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost/react-signup/signup.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            number: formData.get("number"),
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        });

        const result = await res.json();

        if (result.status === "success") {
          setSuccess(true);
          e.target.reset();
          setErrors({});
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setErrors({ server: result.message || "Signup failed" });
        }
      } catch (err) {
        setErrors({ server: "Connection to server failed" });
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  // --- Render ---
  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <fieldset disabled={loading} className={loading ? "opacity-50" : ""}>
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input disabled={loading} name="firstName" type="text" className="w-full p-2 border rounded" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Last Name</label>
          <input disabled={loading} name="lastName" type="text" className="w-full p-2 border rounded" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input disabled={loading} name="number" type="text" className="w-full p-2 border rounded" />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input disabled={loading} name="email" type="email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input disabled={loading} name="password" type="password" className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        {errors.server && (
          <p className="text-red-500 text-sm mb-4">{errors.server}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">Signup successful!</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </fieldset>
    </form>
  );
};

export default SignUpForm;
