import { useState, useEffect } from 'react';
import { NavBar, List, Popup, Button, Toast, Input, Footer } from 'antd-mobile'

import { getMatchDetail ,getMatch} from '../../../tool/api';
import { getUrlParams } from '../../../tool/tool';
import './index.less';
const currentUrlParams = getUrlParams(window.location.href);
const matchDetail = () => {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false)
    const [tips, setTips] = useState('')
    const [cost, setCost] = useState('')
    const [profit, setProfit] = useState(0)
    const [preProfit, setPreProfit] = useState(0)
    const [matchInfo, setMatchInfo] = useState({})
    useEffect(() => {
        const fetchDetail = async () => {
            const res1 = await getMatchDetail(currentUrlParams);
            const res2 = await getMatch(currentUrlParams);
            console.log(res1.data,res2.data);
            setUsers(res1.data);
            setMatchInfo(res2.data)
        }
        fetchDetail();
    }, [])
    useEffect(() => {
        setPreProfit(Math.round(((cost * (profit * 0.01)) * 0.95) * 100) / 100)
    }, [cost])

    const callModal = (profit) => {
        console.log('callModal');
        setVisible(!visible)
        setTips(profit)
        setProfit(Number(profit.replace('%', '')))
    }


    return (
        <div className="matchDetailWrapper">
            <NavBar back='返回' onBack={() => { window.history.go(-1) }}            >
                列表详情
            </NavBar>

            <img className="detailImg" src="https://ue5933.cn/static/footer/qiubg.jpg" alt="" />

            <List className='list' header='bogdan' mode='card'>
                {users.map(user => (
                    <List.Item
                        className='listItem'
                        clickable
                        extra='无限制'
                        key={user.id}
                        description={`预计： ${user.profit}`}
                        onClick={() => { callModal(user.profit) }}
                    >
                        选项：{user.options}
                    </List.Item>
                ))}
            </List>
            <>
                <Popup
                    showCloseButton
                    visible={visible}
                    onMaskClick={() => {
                        setVisible(false), setCost(0)
                    }}
                    onClose={() => {
                        setVisible(false), setCost(0)
                    }}
                    position='top'
                    bodyStyle={{ height: '40vh' }}
                >

                    <div className="popContent">
                        <div className="title">
                            这是标题
                        </div>
                        <div className="tips">
                            {`BBB ${tips}`}
                        </div>
                        <div className="popBox">
                            <div className="top">
                                <span>number</span>
                                <span>get</span>
                                <span>will</span>
                            </div>
                            <div className="mid">
                                <Input
                                    className='costInput'
                                    placeholder='输入'
                                    type='number'
                                    value={cost}
                                    onChange={val => {
                                        setCost(val)
                                    }}
                                />
                                <span>{profit}%</span>
                                <span>{preProfit}</span>
                            </div>
                            <div className="commission">
                                手续5%
                            </div>
                            <div className="bottom">
                                <Button type='primary'
                                    color='primary'
                                    onClick={() => { setCost(100) }} >
                                    100
                                </Button>
                                <Button type='primary'
                                    color='primary'
                                    onClick={() => { setCost(200) }} >
                                    200
                                </Button>
                                <Button type='primary'
                                    color='primary'
                                    onClick={() => { setCost(300) }} >
                                    300
                                </Button>
                            </div>
                        </div>
                        <div className="popConfirm">
                            <Button className='popConfirmBtn' type='primary'
                                color='primary'
                                onClick={() => { }} >
                                确认
                            </Button>
                        </div>
                    </div>
                </Popup>
            </>


            <Footer label='没有更多了'></Footer>
        </div>
    )
}


export default matchDetail