import { useState } from 'react'
import { Swiper, Toast } from 'antd-mobile'
import { NavTitle } from "../../components/navTitle";
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

function App() {
  const [count, setCount] = useState(0)

  const testClick = () => {
    console.log('click');
    console.log(count);
    setCount((count) => count + 1)
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
    </div>
  )
}

export default App
