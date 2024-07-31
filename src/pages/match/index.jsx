import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, JumboTabs, List, NoticeBar } from 'antd-mobile'
import { NavTitle } from "../../components/navTitle";
import { getMatchList } from "../../tool/api"
import './index.less'

function App() {
  const [matchList, setMatchList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMatchList();
      console.log(res);
      setMatchList(res.data);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mine');
  };
  const [count, setCount] = useState(0)

  const testClick = () => {
  }

  const dayCount = [
    { title: '全部', value: 0, content: matchList.length ||'全部' },
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
        <div title='日期切换' >
          <JumboTabs defaultActiveKey='0'>
            {dayCount.map((item) => {
              return <JumboTabs.Tab title={item.title} description={item.content} key={item.value}>
                {/* {item.content} */}
                {/* {`共计:${matchList.length}` } */}
              </JumboTabs.Tab>
            })}
          </JumboTabs>
        </div>
      </div>
      
      <NoticeBar
        content='适用于当前页面内信息的通知，是一种较醒目的页面内通知方式'
        wrap
        color='alert'
      />
      <div className="matchDown">
        <List>
          {matchList.map((item, index) => {
            return <List.Item title={item.start_time} description={item.match_name} key={index} clickable>
              <li>{item.term_a}</li>
              <li>{item.term_b}</li>
            </List.Item>
          })}
        </List>

      </div>
    </div>
  )
}

export default App
