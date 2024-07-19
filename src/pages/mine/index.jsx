import { useState } from 'react'
import { Button } from 'antd-mobile'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './index.less'

function App() {
  document.title = 'mine';
  const [count, setCount] = useState(0)

  const testClick = () => {
    console.log('click');
    console.log(count);
    setCount((count) => count + 1)
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      <Button block color='primary' size='large'>
          Block Button
        </Button>
        <button onClick={() => testClick()}>
          count is {count}
        </button>
        count is {count}
        <p>
          Edit 1<code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
