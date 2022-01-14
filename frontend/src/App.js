import logo from './MSB.png';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import './App.css';
import { useState } from 'react';

function App() {

  const [init, setInit] = useState(0);
  const [init2, setInit2] = useState(0);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const beginning = (
    <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Begin">Click on to Begin</div>
    </div>
  )

  const home = (
    <div>
      <div className="Begin">Login to Begin</div>
      <p/>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        style={{color: 'white'}}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={()=>{setInit2(1)}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );

  const main = (
    <div className="mainpage" style={{ 
      width: "100%",
      height: "100%",
    backgroundImage: `url("https://d25tv1xepz39hi.cloudfront.net/2020-06-01/files/natural-light-sunset-beach_2044-tb.jpg")`,
    backgroundSize: 'cover'
  }}>
    <div className="blocks">
      <div className="block">Write Letter</div>
      <div className="block">Explore the Sea</div>
      <div className="block">Mail Box</div>
    </div>
    </div>
  );

  const login = (
    <div>{init2 === 0 ? home : main}</div>
  )

  return (
    <div className="App" onClick={()=>{setInit(1)}}>
      <header className="App-header">
        {init === 0 ? beginning : login}
      </header>
    </div>
  );
}

export default App;
