import { useCallback, useState } from "react";
import ListIcon from '../assets/icon-list.svg'
import '../styles/Subscribe.css';
import Card from "./Card";
import { emailValidator, passwordValidator } from "../utils/helper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SignupProps } from "../types/index.types";
import { RootState } from "../redux/store";
import { userSignUpAsync } from "../redux/user/userAsync";

const SignUp = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector((state: RootState) => state?.userReducer?.isLoading)
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isMatchPassword, setIsMatchPassword] = useState(true);
  const [showFormError, setShowFromError] = useState(false);

  const signUpHandler = useCallback((info: SignupProps) => {
    dispatch(userSignUpAsync(info))
  }, [dispatch])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (userPassword.length === 0 || !isValidEmail|| !isMatchPassword || !isValidPassword || name.length === 0 || userEmail.length === 0 ) {
      setShowFromError(true)
    } else {
      setShowFromError(false)
      signUpHandler({
        email: userEmail,
        password: userPassword,
        name: name,
      })
    }
  };

  const handleEmailChange = (event: any) => {
    if (showFormError)
      setShowFromError(false)
    setUserEmail(event.target.value);
    setIsValidEmail(emailValidator(event.target.value));
  };

  const handlePasswordChange = (event: any) => {
    if (showFormError)
      setShowFromError(false)
    setUserPassword(event.target.value);
    setIsValidPassword(passwordValidator(event.target.value));
  }

  const handleConfrimPasswordChange = (event: any) => {
    if (showFormError)
      setShowFromError(false)
    // setUserPassword(event.target.value);
    setIsMatchPassword(userPassword === (event.target.value) ? true : false);
  }

  return (
    <Card>
      <div className="text_box">
        <h4 className="text">Password Policy</h4>
        <ul className="list_container">
          <li className="list_item">
            <img className="list_icon" src={ListIcon} alt="" />
            <p className="list_text">Product discovery and building what matters</p>
          </li>

          <li className="list_item">
            <img className="list_icon" src={ListIcon} alt="" />
            <p className="list_text">Measuring to ensure updates are a success</p>
          </li>

          <li className="list_item">
            <img className="list_icon" src={ListIcon} alt="" />
            <p className="list_text">And much more! </p>
          </li>
        </ul>
        <form className="subscribe_form">
        <div className="label_container">
            <label 
              className="email_label" 
              htmlFor="user_email_valid">Name *
            </label>
            {/* <label 
              className={!isValid ? "error_label_active" : "error_label_inactive"}
              htmlFor="user_email_invalid">Valid email required
            </label> */}
          </div>

          <input
            className={"user_email_valid"} // !isValid ? "user_email_invalid" : 
            type="text" 
            placeholder="Jhon" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          <div className="label_container">
            <label 
              className="email_label" 
              htmlFor="user_email_valid">Email address *
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
              htmlFor="user_email_valid">Password *
            </label>
            <label 
              className={!isValidPassword ? "error_label_active" : "error_label_inactive"}
              htmlFor="user_email_invalid">
                Valid password required
            </label>
          </div>

          <input
            className={!isValidPassword ? "user_email_invalid" : "user_email_valid"}
            type="password" 
            placeholder="Password" 
            value={userPassword} 
            onChange={handlePasswordChange}
          />

          <div className="label_container">
            <label 
              className="email_label" 
              htmlFor="user_email_valid">Confirm Password
            </label>
            <label 
              className={!isMatchPassword ? "error_label_active" : "error_label_inactive"}
              htmlFor="user_email_invalid">Not match
            </label>
          </div>

          <input
            className={!isValidPassword ? "user_email_invalid" : "user_email_valid"}
            type="password" 
            placeholder="Password" 
            // value={userEmail} 
            onChange={handleConfrimPasswordChange}
          />

          <button 
            onClick={handleSubmit}>
            Sign Up
          </button>
          {showFormError && (
            <label 
              className={showFormError ? "error_label_active" : "error_label_inactive"}
              htmlFor="user_email_invalid">Fill the form correctly!
            </label>
          )}
        </form>
      </div>
    </Card>
  );
}

export default SignUp;
