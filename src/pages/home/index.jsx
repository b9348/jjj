import {
  useNavigate,
} from "react-router-dom";

const Index = () => {
  const navigate = useNavigate()
  const fallback = () => {
    navigate("/login")
  }
  const logOff = () => {
    localStorage.setItem("token", "");
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <div>
      欢迎来到本系统
      <br />
      <br />
      <div onClick={() => navigate("/mine")}>navigate(/mine)</div>
      <br /><br />
      <div onClick={() => fallback()}>点击登录</div>
      <br />
      <div onClick={() => logOff()}>注销</div>
    </div>
  )
}

export default Index;
