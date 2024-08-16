import { useCallback, useState } from "react";
import '../styles/Subscribe.css';
import Card from "./Card";
import { emailValidator } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAsync } from "../redux/user/userAsync";
import { RootState } from "../redux/store";
import { SigninProps } from "../types/index.types";

const SignIn = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector((state: RootState) => state?.userReducer?.isLoading)
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showFormError, setShowFromError] = useState(false);

  const signInHandler = useCallback((info: SigninProps) => {
    dispatch(userSignInAsync(info))
  }, [dispatch])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (userPassword.length === 0 || !isValidEmail|| userEmail.length === 0 ) {
      setShowFromError(true)
    } else {
      setShowFromError(false)
      signInHandler({
        email: userEmail,
        password: userPassword,
      })
    }
  };

  const handleEmailChange = (event: any) => {
    if (showFormError)
      setShowFromError(false)
    setUserEmail(event.target.value);
    setIsValidEmail(emailValidator(event.target.value));
  };

  return (
    <Card>
      <div className="text_box">
        <form className="subscribe_form">
          
          <div className="label_container">
            <label 
              className="email_label" 
              htmlFor="user_email_valid">Email address
            </label>
            <label 
              className={!isValidEmail ? "error_label_active" : "error_label_inactive"}
              htmlFor="user_email_invalid">Valid email required
            </label>
          </div>

          <input
            className={!isValidEmail ? "user_email_invalid" : "user_email_valid"}
            type="email" 
            placeholder="email@company.com" 
            value={userEmail} 
            onChange={handleEmailChange}
          />

          <div className="label_container">
            <label 
              className="email_label" 
              htmlFor="user_email_valid">Password
            </label>
          </div>

          <input
            className={"user_email_valid"}
            type="password" 
            placeholder="Password" 
            value={userPassword} 
            onChange={(e) => {
              setUserPassword(e.target.value)
              if (showFormError)
                setShowFromError(false)
            }}
          />

          <button 
            onClick={handleSubmit}>
            Sign In
          </button>
          {showFormError && (
            <label 
              className={showFormError ? "error_label_active" : "error_label_inactive"}
              htmlFor="user_email_invalid">Fill the required fields
            </label>
          )}
          
        </form>
      </div>
    </Card>
  );
}

export default SignIn;
