import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, JumboTabs, List } from 'antd-mobile'
import { NavTitle } from "../../components/navTitle";
import { getMatchList } from "../../tool/api"
import './index.less'

function App() {
  useEffect(() => {
    getMatchList().then(res => {
      console.log(res)
    })
  }, [])
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mine');
  };
  const [count, setCount] = useState(0)

  const testClick = () => {
  }

  const dayCount = [
    { title: '全部', value: 0, content: '全部' },
    { title: '今天', value: 1, content: '今天' },
    { title: '明天', value: 2, content: '明天' },
  ]
  const matchInfo = [
    { time: '2024年7月22日21:38:32', content: 'match内容A', aa: '曹叡', bb: '曹芳' },
    { time: '2024年7月23日21:38:32', content: 'match内容B', aa: '曹叡', bb: '曹芳' },
    { time: '2024年7月24日21:38:32', content: 'match内容C', aa: '曹叡', bb: '曹芳' },
  ]

  return (
    <div className="matchWrapper">
      <div className="matchTitle">
        <NavTitle title='match' />
      </div>
      <div className="matchUp">
        <div title='基础用法' >
          <JumboTabs defaultActiveKey='0'>
            {dayCount.map((item) => {
              return <JumboTabs.Tab title={item.title} description={item.title} key={item.value}>
                {item.content}
              </JumboTabs.Tab>
            })}
          </JumboTabs>
        </div>
      </div>
      <div className="matchDown">
        <List>
          {matchInfo.map((item, index) => {
            return <List.Item title={item.time} description={item.content} key={index} clickable>
              <li>{item.aa}</li>
              <li>{item.bb}</li>
            </List.Item>
          })}
        </List>

      </div>
    </div>
  )
}

export default App
