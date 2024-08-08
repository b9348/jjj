import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { NavTitle } from "../../components/navTitle";
import { signUp, logIn } from "../../tool/api"
import "./index.less";


const Loginmint = () => {
  const [visible, setVisible] = useState(false)
  const [signTips, setSignTips] = useState("　")


  const [loginId, setLoginId] = useState("")
  const [loginPwd, setLoginPwd] = useState("")

  const [signId, setSignId] = useState("")
  const [signPwd, setSignPwd] = useState("")


  const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);
  const [signBtnDisabled, setSignBtnDisabled] = useState(true);

  // const navigate = useNavigate()
  const register = () => {
    // localStorage.setItem("token", "rem432412341324");
    // navigate("/")
  }
  const phoneRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  const pwdRegex = /^(?![\s\S]*[\s])[\w]{6,}$/

  const loginIdCheck = (e) => {
    setLoginId(e);
  };
  const signIdCheck = (e) => {
    console.log('注册账号：', e);
    setSignId(e);
  }
  useEffect(() => {
    setSignTips(`${loginId.length == 0 ? "请输入手机号" : `将使用手机号${loginId}`}`);
    if (phoneRegex.test(loginId) && pwdRegex.test(loginPwd)) {
      setLoginBtnDisabled(false);
    } else {
      setLoginBtnDisabled(true);
    }
  }, [loginId, loginPwd])

  useEffect(() => {
    setSignTips(`${signId.length == 0 ? "请输入手机号" : `将使用手机号${signId}`}`);
    if (phoneRegex.test(signId) && pwdRegex.test(signPwd)) {
      setSignBtnDisabled(false);
    } else {
      setSignBtnDisabled(true);
    }
  }, [signId, signPwd])

  const handleLogin = async () => {
    const obj = {}
    obj.username = loginId
    obj.password = loginPwd
    Toast.show({
      icon: 'loading',
      content: '登录中…',
    })
    const res = await logIn(obj)
    console.log(res);
    if (res.message === "登录成功") {
      Toast.show({
        duration: 300,
        icon: 'success',
        content: res.message,
        afterClose: () => {
          const _user = res.user
          console.log('after')
          localStorage.setItem("token", "rem432412341324");
          localStorage.setItem("username", _user.username);
          localStorage.setItem("id", _user.id);
          localStorage.setItem("avatar", _user.avatar);
          window.location.href = '/';

        },
      })
    }
  }
  const handleSign = async () => {
    const obj = {}
    obj.username = signId
    obj.password = signPwd
    Toast.show({
      icon: 'loading',
      content: '注册中…',
    })
    const res = await signUp(obj)
    console.log(res);
    console.log("signup", signId, signPwd);
  }
  const loginPwdCheck = (e) => {
    setLoginPwd(e);
  }
  const signPwdCheck = (e) => {
    setSignPwd(e);
  }


  return (
    <div className="loginPage">
      <div className="loginWrapper">
        <NavTitle title='请先登录' />
        <div className="signWrapper">
          <Tabs defaultActiveKey='login'   >
            <Tabs.Tab title='登录' key='login' >
              <div>
                <Form layout='horizontal'>
                  <Form.Item onClick={register}
                    style={{ backgroundColor: '#f3f0e6' }}
                    label='手机号'
                    name='username'
                    rules={[
                      { required: true, message: '请输入手机号!' },
                      { pattern: new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/), message: '手机号格式不正确!' }
                    ]}
                  >
                    <Input
                      type="number"
                      onClear={() => setLoginId("")}
                      onChange={loginIdCheck}
                      value={loginId}
                      placeholder='请输入手机号'
                      maxLength={11}
                      clearable
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ backgroundColor: '#f3f0e6' }}
                    label='密码'
                    name='password'
                    rules={[
                      { required: true, message: '请输入密码!' },
                      { min: 6, message: '密码长度不能少于6位!' },
                      { pattern: /^[^\s]+$/, message: '密码不能包含空格等非法字符' }
                    ]}
                    extra={
                      <div className='eye'>
                        {!visible ? (
                          <EyeInvisibleOutline onClick={() => setVisible(true)} />
                        ) : (
                          <EyeOutline onClick={() => setVisible(false)} />
                        )}
                      </div>
                    }
                  >
                    <Input
                      placeholder='请输入密码'
                      clearable
                      type={visible ? 'text' : 'password'}
                      onChange={loginPwdCheck}
                      value={loginPwd}
                    />
                  </Form.Item>
                </Form>
              </div>
              <p className="signTips">{signTips}</p>
              <Button color="primary"
                className="signBtn" type='primary' disabled={loginBtnDisabled} onClick={() => { handleLogin() }}>登录</Button>
            </Tabs.Tab>
            <Tabs.Tab title='注册' key='signup'>
              <div>
                <Form layout='horizontal'>
                  <Form.Item
                    style={{ backgroundColor: '#f3f0e6' }}
                    label='手机号'
                    name='username'
                    rules={[
                      { required: true, message: '请输入手机号!' },
                      { pattern: new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/), message: '手机号格式不正确!' }
                    ]}
                  >
                    <Input
                      type="number"
                      onClear={() => setSignId("")}
                      onChange={signIdCheck}
                      value={signId}
                      placeholder='请输入手机号'
                      maxLength={11}
                      clearable
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ backgroundColor: '#f3f0e6' }}
                    label='密码'
                    name='password'
                    rules={[
                      { required: true, message: '请输入密码!' },
                      { min: 6, message: '密码长度不能少于6位!' },
                      { pattern: /^[^\s]+$/, message: '密码不能包含空格等非法字符' }
                    ]}
                    extra={
                      <div className='eye'>
                        {!visible ? (
                          <EyeInvisibleOutline onClick={() => setVisible(true)} />
                        ) : (
                          <EyeOutline onClick={() => setVisible(false)} />
                        )}
                      </div>
                    }
                  >
                    <Input
                      placeholder='请输入密码'
                      clearable
                      value={signPwd}
                      onChange={signPwdCheck}
                      type={visible ? 'text' : 'password'}
                    />
                  </Form.Item>
                </Form>
              </div>

              <p className="signTips">{signTips}</p>
              <Button className="signBtn" type='primary' color="primary"
                disabled={signBtnDisabled} onClick={() => { handleSign() }}>注册</Button>
            </Tabs.Tab>
          </Tabs>
        </div>

      </div>
    </div>
  )
}

export default Loginmint;
