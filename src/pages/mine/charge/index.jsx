import { useState } from 'react';
import { NavBar, Button, Toast, Form, Input, ImageUploader } from 'antd-mobile'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { charge } from '../../../tool/api'
import './index.less';

const Charge = () => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [value, setValue] = useState(123);
    const handleCopy = () => Toast.show({ duration: 500, content: '已复制！', })

    const goCharge = async () => {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('id'));
        formData.append('charge_address', '上海市浦东新区');
        formData.append('moment', 123);
        formData.append('file', file);
        const res = await charge(formData);
        console.log('Response:', res);
        if (res.code === 0) {
            // 清空Form表单
            form.resetFields();
            setFile
            // 显示成功Toast
            Toast.show({ duration: 1000, content: '充值申请已提交', });
        }
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
                    <Form form={form} onFinish={goCharge} className='chargeForm' layout='horizontal'>
                        <Form.Item label='充值账号' name='account' rules={[{ required: true, message: '请输入充值账号！' }]}>
                            <Input placeholder='请输入充值账号' clearable />
                        </Form.Item>
                        <Form.Item label='金额' name='cost' rules={[{ required: true, message: '请输入充值金额！' }]}>
                            <Input placeholder='请输入充值金额' clearable type='number' />
                        </Form.Item>
                        <Form.Item label='上传图片' name='file' rules={[{ required: true, message: '请上传充值凭证！' }]}>
                            <ImageUploader
                                upload={async (file) => {
                                    setFile(file);
                                    return { url: URL.createObjectURL(file) };
                                }}
                                maxCount={1}
                                multiple={false}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button className="chargeBtn" type='primary' htmlType='submit' size='large' block color='primary' >确认充值</Button>
                        </Form.Item>
                    </Form>
                    <div className="chargeAddress"></div>
                    <div className="chargeCost"></div>
                    <div className="chargeUpload"></div>
                </div>
            </div>
        </div>

    );
};

export default Charge;