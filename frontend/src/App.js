import logo from './MSB.png';
import Page1 from "./container/Page1.js"
import 'antd/dist/antd.css';
import music from './music.mp3'
import { Form, Input, Button, Checkbox, message } from 'antd';
import './App.css';
import { useState, useCallback } from 'react';
import {find_account, create_account} from './axios'

function App() {

  const [init, setInit] = useState(0);
  const [init2, setInit2] = useState(0);
  const [init3, setInit3] = useState(0);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [checkpass, setCheckpass] = useState("");
  const [part, setPart] = useState(0);
  const [mode, setMode] = useState(0);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const submit = async() => {
    const response = await find_account(account, password);
    if(response != "fail"){
      setInit2(1);
      message.success(`${account} login successfully`)
    }
    else{
        console.log("wrong account");
        message.error(`Wrong account or password`);
    }
}

const addacc = async() => {
  const response = await create_account(account, password);
    if(response != "fail"){
      console.log(response);
      setInit3(0);
      message.success(`${account} create successfully`)
    }
    else{
        console.log("wrong account");
        message.error(`Username already exist, please try another one`);
    }
}

  const backmusic = (
    <audio src={music} autoPlay controls loop/>
  )

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
        <Input value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
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
        <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
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
        <Button type="primary" htmlType="submit" onClick={()=>{submit()}}>
          Submit
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{
          offset: 8,
          span: 16,
        }} className="ask" onClick={()=>{setInit3(1)}}><div>first time? create account</div></Form.Item>
    </Form>
    </div>
  );

  const set = (
    <div>
      <div className="Begin">Create Account</div>
      <p/>
      <Form
      name="basic"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 20,
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
        <Input value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
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
        <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        label="Password confirm"
        name="password confirm"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password value={checkpass} onChange={(e)=>{setCheckpass(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={()=>{addacc()}}>
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
      <div className="block" onClick={()=>{setMode(1);console.log("hi")}} >Write Letter</div>
      <div className="block">Explore the Sea</div>
      <div className="block">Mail Box</div>
    </div>
    {backmusic}
    </div>
  );

  const page = (
    <div>{mode === 0 ? main : <Page1 mode={mode} onmode={setMode} usr={account}/>}</div>
  )

  const log = (
    <div>{init3 === 0 ? home :set}</div>
  )

  const login = (
    <div>{init2 === 0 ? log : page}</div>
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
