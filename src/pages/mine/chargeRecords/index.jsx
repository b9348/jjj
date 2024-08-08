import { useState } from 'react';
import { NavBar, Button, Toast, Form, Input, ImageUploader } from 'antd-mobile'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './index.less';

const Charge = () => {
    const [fileList, setFileList] = useState([]);
    const [value, setValue] = useState(123);
    const handleCopy = () => {
        Toast.show({ duration: 500, content: '已复制！', })
    }
    return (
        <div className="charge">

            <NavBar back='返回' onBack={() => { window.history.go(-1) }}            >
                充值方式
            </NavBar>
            <div className="chargeWrapper">
                <CopyToClipboard text={value} onCopy={handleCopy}>
                    <div className="chargeCopy" onClick={() => { handleCopy() }}>
                        <p>点击此区域即可一键复制：
                            <br />
                            若无法一键复制，请长按手动选中并复制
                            <br /><br />
                            1. 支付宝支付</p>
                    </div>
                </CopyToClipboard>

                <div className="chargeInput">
                    <Form className='chargeForm' layout='horizontal'>
                        <Form.Item label='充值账号' name='account'>
                            <Input placeholder='请输入充值账号' clearable />
                        </Form.Item>
                        <Form.Item label='金额' name='cost'>
                            <Input placeholder='请输入充值金额' clearable type='password' />
                        </Form.Item>
                        {/* 上传图片表单 */}

                        <Form.Item label='上传图片' name='image'>
                            {/* <Input placeholder='请上传充值凭证' clearable type='file' accept='image/*' multiple /> */}
                            <ImageUploader
                                multiple={false}
                                maxCount={1}
                                value={fileList}
                                onChange={setFileList}
                            />
                        </Form.Item>

                    </Form>
                    <div className="chargeAddress"></div>
                    <div className="chargeCost"></div>
                    <div className="chargeUpload"></div>
                </div>
                <Button className="chargeBtn" color='primary' >确认充值</Button>
            </div>
        </div>

    );
};

export default Charge;