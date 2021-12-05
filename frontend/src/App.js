import logo from './logo.svg';
import './App.css';
import { useState , useEffect , useRef} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import mainlogo from './MSB.png';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Steps} from 'antd';
import { UploadOutlined, UserOutlined, FormOutlined, BookOutlined } from '@ant-design/icons';
import Write_letter from './write_letter.js';
import Push from './Upload.js';
import Alldone from './Alldone.js';
import {Cover, get_choice, last_choice} from './Cover.js';
/* https://ant.design/components/button/ */

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { Step } = Steps;
const back = "https://thumbs.dreamstime.com/b/bottle-message-24928711.jpg"

function App() {
const [article, setArticle] = useState("");
const [choice, setChoice] = useState(0);
var ch = -1;
  var page = 
  (<Layout style={{height:'100vh', width:'100vw'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{width:'30vw'}}
      >
        <div className="logo" >
          <img src={mainlogo} width={100}/>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<BookOutlined />} onClick={() => setChoice(0)}>
            letter cover
          </Menu.Item>
          <Menu.Item key="2" icon={<FormOutlined />} onClick={() => setChoice(1)}>
            content
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => setChoice(2)}>
            accessories
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />} onClick={() => setChoice(3)}>
            check & send
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 5, height: '18vh' }}>
      <Steps current={choice} className="step">
        <Step title="Choosing material" description="Design letter profile." className="step1"/>
        <Step title="Write letter" description="Share something with others." className="step2"/>
        <Step title="Add up accessories" description="Select files to attach." className="step3"/>
        <Step title="Pack up and send!" description="Review your letter and choose tag." className="step4"/>
      </Steps>
      </Header>
      <div style={{ 
        width: "100%",
        height: "100%",
      backgroundImage: `url("https://thumbs.dreamstime.com/b/bottle-message-24928711.jpg")`,
      backgroundSize: 'cover'
    }}>
      {choice == 0 ? <Cover step={choice} onstep={setChoice}/> : <div/>}
      {choice == 1 ? <Write_letter step={choice} onstep={setChoice}/> : <div/>}
      {choice == 2 ? <Push step={choice} onstep={setChoice}/> : <div/>}
      {choice == 3? <Alldone/> : <div/>}
      <div style={{ textAlign: 'center' }}>Designed by J.T. Hsu ©2021 Web programming final</div>
      </div>
      </Layout>
    </Layout>)

  return (
    <div className="write">
      {page}
    </div>
  );
}

export default App;
