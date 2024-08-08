import { useState, useEffect } from 'react';
import { NavBar, List, Popup, Button, Toast, Input, Footer, DotLoading } from 'antd-mobile'

import { getMatchDetail, getMatch, apiBuy } from '../../../tool/api';
import { getUrlParams } from '../../../tool/tool';
import './index.less';
const matchDetail = () => {
    const currentUrlParams = getUrlParams(window.location.href);
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false)
    const [tips, setTips] = useState('')
    const [cost, setCost] = useState('')
    const [profit, setProfit] = useState(0)
    const [preProfit, setPreProfit] = useState(0)
    const [matchInfo, setMatchInfo] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchDetail = async () => {
            const res1 = await getMatchDetail(currentUrlParams);
            const res2 = await getMatch(currentUrlParams);
            console.log(res1.data, res2.data);
            setUsers(res1.data);
            setMatchInfo(res2.data)
            setLoading(false)
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
    const buy = async () => {
        const userId = localStorage.getItem('id');
        const info = {
            user_id: userId,
            moment: cost,
            match_id: currentUrlParams.match_id,
            options: matchInfo.options,
            rate: profit * 0.01,
            predict_rate: preProfit,

        }
        const res = await apiBuy(info);
        console.log(res);
        if (res.code === 200) {
            Toast.success('购买成功', 1);
            setVisible(false)
            setCost(0)
        } else {
            Toast.fail('购买失败', 1);
        }
    }


    return (
        <div className="matchDetailWrapper">
            <NavBar back='返回' onBack={() => { window.history.go(-1) }}            >
                列表详情
            </NavBar>

            {loading ? <DotLoading /> : <div className="matchInfo">
                <div className="matchTitle">
                    {matchInfo.match_name}
                </div>
                <div className="matchContent">
                    <div className="left">{matchInfo.term_a}</div>
                    <div className="vs"><span>𝙑𝙎</span></div>
                    <div className="right">{matchInfo.term_b}</div>

                </div>
                <div className="matchTime">
                    {matchInfo.start_time}
                </div>
            </div>}
            <img className="detailImg" src="https://ts1.cn.mm.bing.net/th/id/R-C.a258d340510ee42d72f1e672a4eeced3?rik=DdqlC0xl0J18tg&riu=http%3a%2f%2fimg.netbian.com%2ffile%2f20110223%2f84b6e00fd9a42303f8ce9646060a7f99.jpg&ehk=hVvRHFTaUnfBzccL0uoX7vvQjH5qB0howflhJDlWqm8%3d&risl=&pid=ImgRaw&r=0" alt="" />

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
                                <span>交易金额</span>
                                <span>获利</span>
                                <span>预计</span>
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
                                onClick={() => { buy() }} >
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