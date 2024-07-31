import { useState } from 'react';
import { NavTitle } from "../../../components/navTitle";
import './index.less';

const matchDetail = () => {

    return (
        <div className="matchDetailWrapper">

            <NavTitle title='match详情列表' />
            <img className="detailImg" src="https://ue5933.cn/static/footer/qiubg.jpg" alt="" />

        </div>
    )
}


export default matchDetail