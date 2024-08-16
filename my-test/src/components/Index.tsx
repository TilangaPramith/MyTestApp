import React, { useEffect, useState } from "react";

import ImgMobile from '../assets/illustration-sign-up-mobile.svg';
import ImgDesktop from '../assets/illustration-sign-up-desktop.svg';
import '../styles/Subscribe.css';
import '../styles/Loader.css';
import Card from "./Card";
import ToggleButton from "./ToggleButton";
import SignIn from "./Signin";
import SignUp from "./Signup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loader from "./Loader";
import Success from "./Success";

const Index = () => {
  const isLoading = useSelector((state: RootState) => state?.userReducer?.isLoading)
  const isLogged = useSelector((state: RootState) => state?.userReducer?.isLogged);
  const isRegistered = useSelector((state: RootState) => state?.userReducer?.isRegistered)
  const [isOn, setIsOn] = useState(isRegistered ? true : false);

  useEffect(() => {
    setIsOn(isRegistered ? true : false)
  }, [isRegistered])

  return (
    <>
      {isLoading && <Loader />}
      <div className={isLoading ? "blur_background" : ""}>
        {isLogged ? (
          <Success/>
        ) : (
          <Card>
            <div className="img_container">
              <img className="img_mobile" src={ImgMobile} alt="" />
              <img className="img_desktop" src={ImgDesktop} alt="" />
            </div>

            <div className="text_box">
              <h1 className="title">Easy Generator</h1>
              <h2 className="text">E-Learning platfrom</h2>

              <div className="list_item">
                <div className="label_container">
                  <label 
                    className="email_label" 
                  >Already have an account
                  </label>
                </div>
                <ToggleButton setIsOn={setIsOn} isOn={isOn} />
              </div>
              {isOn ? (
                <React.Fragment>
                  <SignIn/>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <SignUp/>
                </React.Fragment>
              )}
              
            </div>
          </Card>
        )}
        
      </div>
    </>
    
  );
}

export default Index;
