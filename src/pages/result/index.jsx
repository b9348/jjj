import { useState } from 'react'

import { NavTitle } from "../../components/navTitle";
import './index.less'

function App() {
  const [count, setCount] = useState(0)

  const testClick = () => {
    console.log('click');
    console.log(count);
    setCount((count) => count + 1)
  }
  return (
    <div className="resultWrapper">

      <NavTitle title='结果' />
      <div className="resultCount">
        <div className="resultBox">
          <p>总计</p>
          <p>0.00</p>
        </div>
        <div className="resultBox">
          <p>总数</p>
          <p>0次</p>
        </div>
      </div>
    </div>
  )
}

export default App
