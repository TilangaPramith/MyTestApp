import Card from "./Card"
import IconSuccess from "../assets/icon-success.svg";
import '../styles/Success.css'

const Success = () => {
  return(
    <Card>
      <div className="text_box success_container">
        <img className="icon_success" src={IconSuccess} alt="" />
        <h1 className="title">Welcome to the application</h1>
      </div>
    </Card>
  );
}

export default Success;