import {
  useNavigate
} from "react-router-dom";

const Loginmint = () => {
  const navigate = useNavigate()
  const register = () => {
    localStorage.setItem("token", "rem432412341324");
    navigate("/")
  }
  return (
    <div>
      <div onClick={() => register()}>登录</div>
    </div>
  )
}

export default Loginmint;
