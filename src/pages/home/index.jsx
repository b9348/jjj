import { useState } from 'react'
import { Swiper, Toast, NoticeBar, Footer, Popup, Button, Space } from 'antd-mobile'
import { ReceivePaymentOutline, HandPayCircleOutline, SmileOutline, SoundOutline } from 'antd-mobile-icons'
import { NavTitle } from "../../components/navTitle";
import { useGoto } from '../../tool/tool';
import './index.less'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={index}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      <br /><br />
      <p>{index + 1}</p>
      <br /><br />
    </div>
  </Swiper.Item>
))


const homeBtnList = [
  { icon: ReceivePaymentOutline, content: '充值', url: '/mine/charge' },
  { icon: HandPayCircleOutline, content: '提现' },
  { icon: SmileOutline, content: '测试3' },
  { icon: SoundOutline, content: '公告' },
]

function App() {
  const goto = useGoto()
  const openUrl = (url) => {
    goto(url)
  }
  const [count, setCount] = useState(0)

  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const testClick = (val) => {
    console.log('click');
    console.log(count);
    if (val === '公告') {
      setVisible1(true)

    }
  }
  return (
    <div className="homeWrapper">

      <NavTitle title='首页' />

      <div className='homeSwiper'>
        <Swiper
          loop
          autoplay
          onIndexChange={i => {
            console.log(i, 'onIndexChange1')
          }}
        >
          {items}
        </Swiper>
      </div>

      <NoticeBar
        content='适用于当前页面内信息的通知，是一种较醒目的页面内通知方式'
        wrap
        color='alert'
      />
      <div className="homeBtn">
        {homeBtnList.map((item, index) => {
          return <div className="homeBtnIcon"
            key={index} onClick={() => { openUrl(item.url) }}>
            <item.icon fontSize={40} />
            <div className="homtBtnTxt">
              {item.content}
            </div>
          </div>

        })}
        <Popup
          visible={visible1}
          onMaskClick={() => {
            setVisible1(false)
          }}
          bodyStyle={{ height: '40vh', overflowY: 'scroll' }}
        >
          <div style={{ padding: '24px', overflowY: 'scroll' }}>
            <Space direction='vertical'>
              <Button
                onClick={() => {
                  setVisible2(true)
                }}
              >
                展开第二个弹出层
              </Button>

              <div>11</div>
            </Space>
          </div>
        </Popup>
        <Popup
          visible={visible2}
          onMaskClick={() => {
            setVisible2(false)
          }}
          bodyStyle={{ height: '30vh', overflowY: 'scroll', padding: '20px 0' }}
        >
          <div style={{ overflowY: 'scroll', padding: '20px' }}>
            22
          </div>
        </Popup>
      </div>
      <div className="workingList">
        <div className="workingItem">
          <div className="workingLeft">
            <div className="workingTop">
              2024年7月23日20:51:19
            </div>
            <div className="workingHead">
              测试标题
            </div>
            <div className="workingBody">
              <li>123</li>
              <li>456</li>
            </div>
            <span>——————————————</span>
            <div className="workingFoot">
              掀起波澜
            </div>
            <div className="workingBottom">
              2024-7-23 20:51:50
            </div>
          </div>
          <div className="workingRight">
            <span className='workingRightTxt'>working</span>
            <div className="round1"></div>
            <div className="round2"></div>
            <div className="round3"></div>
          </div>
        </div>
      </div>

      <Footer label='没有更多了'></Footer>
    </div>
  )
}

export default App
