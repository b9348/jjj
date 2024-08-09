import { useState } from 'react';
import { NavBar, Button, Toast, Form, Input, ImageUploader } from 'antd-mobile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { charge } from '../../../tool/api';
import './index.less';

const Charge = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const handleCopy = () => Toast.show({ duration: 500, content: '已复制！' });

    // 处理文件上传的函数
    const handleUpload = async (file) => {
        // 这里只是处理文件的函数，返回的对象用于显示图片等目的
        setFileList([file]); // 更新fileList
        return { url: URL.createObjectURL(file) };  // 返回一个临时的预览URL，但不实际使用
    };

    const goCharge = async () => {
        const values = form.getFieldsValue();  // 获取表单所有值
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('id'));

        // 将表单的所有字段值都追加到 FormData 中
        Object.keys(values).forEach(key => { if (key !== 'file') formData.append(key, values[key]) });
        // 添加文件数据到 FormData 
        if (fileList.length > 0) formData.append('file', fileList[0]); // 将文件的二进制数据追加到formData中        
        const res = await charge(formData);        
        if (res.code === 0) {
            form.resetFields();  // 清空表单
            setFileList([]); // 清空文件列表
            Toast.show({ duration: 1000, content: '充值申请已提交' });
        }
    };
    return (
        <div className="charge">
            <NavBar back='返回' onBack={() => { window.history.go(-1); }}>
                充值方式
            </NavBar>
            <div className="chargeWrapper">
                <CopyToClipboard text={123} onCopy={handleCopy}>
                    <div className="chargeCopy">
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
                                upload={handleUpload}  // 传递自定义的upload函数
                                maxCount={1}
                                multiple={false}
                                onChange={(files) => form.setFieldValue('file', files)}  // 绑定到Form的字段中
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button className="chargeBtn" type='primary' htmlType='submit' size='large' block color='primary'>
                                确认充值
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Charge;
