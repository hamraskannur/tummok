export const validateForm = (setErrors,signupData) => { 
    const newErrors = {};

    if (!signupData.fullName?.trim()) {
      newErrors.fullName = "required";
    } else if (!/^[A-Za-z ]+$/.test(signupData.fullName)) {
      newErrors.fullName = "Alphabetic characters only";
    } else if (signupData.fullName.length > 50) {
      newErrors.fullName = "Maximum 50 characters long";
    }

    if (!signupData.emailAddress?.trim()) {
      newErrors.emailAddress = "required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.emailAddress)) {
      newErrors.emailAddress = "Email Address is not valid";
    }

    if (!signupData.password?.trim()) {
      newErrors.password = "required";
    } else if (signupData.password?.length < 8) {
      newErrors.password = "Minimum 8 characters long";
    } else if (
      !/[A-Z]/.test(signupData.password) ||
      !/\d/.test(signupData.password)
    ) {
      newErrors.password = "Atleast one uppercase and one digit";
    }

    if (!signupData.confirmPassword?.trim()) {
      newErrors.confirmPassword = "required";
    } else if (signupData.confirmPassword !== signupData.password) {
      newErrors.confirmPassword = "Password mismatch";
    }

    if (!signupData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "required";
    } else if (!/^\d{10}$/.test(signupData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10 digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  export const EditProfileValidate = (setErrors,signupData) => { 
    const newErrors = {};
            console.log(signupData);
    if (!signupData?.userName?.trim()) {
      newErrors.userName = "required";
    } else if (!/^[A-Za-z ]+$/.test(signupData.userName)) {
      newErrors.userName = "Alphabetic characters only";
    } else if (signupData.userName.length > 50) {
      newErrors.userName = "Maximum 50 characters long";
    }

    if (!signupData.emailAddress?.trim()) {
      newErrors.emailAddress = "required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.emailAddress)) {
      newErrors.emailAddress = "Email Address is not valid";
    }
    if (!signupData.phoneNumber) {
      newErrors.phoneNumber = "required";
    } else if (!/^\d{10}$/.test(signupData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10 digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };