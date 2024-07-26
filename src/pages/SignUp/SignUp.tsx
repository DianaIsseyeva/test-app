import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { useRegisterMutation } from '../../services';

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
    },
    offset: 8,
  },
};

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { username, email, password } = values;
      const result = await register({ username, email, password }).unwrap();
      if (result && result.jwt) {
        localStorage.setItem('token', result.jwt);
        message.success('Registration successful!');
        navigate('/');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='Register-bg'>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{ prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name='username'
          label='Username'
          tooltip='What do you want others to call you?'
          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

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
            {
              min: 6,
              message: 'Password must be at least 6 characters long!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
