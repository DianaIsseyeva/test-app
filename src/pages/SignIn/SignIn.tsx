import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { email, password } = values;
      const result = await login({ identifier: email, password }).unwrap();
      if (result && result.jwt) {
        localStorage.setItem('token', result.jwt);
        message.success('Login successful!');
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <div className='Register-bg'>
      <Form
        {...formItemLayout}
        form={form}
        name='login'
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
