import logo from './logo.svg';
import './App.css';
import Choose_letter from "./mailbox";
import { Button } from 'antd';
import {useState} from "react";
import Read_Reply from "./read";
import Read_letter from "./mailbox";




function App() {

    const [step, setStep] = useState(1);

    function next(){
        setStep(prev => prev + 1);
    }
    function back(){
        setStep(prev => prev - 1);
    }

    var info = {
        content: 'haha',
        title: 'hello',
        texture: 'texture',
        attr: 'Job'
    }

    var page = (<div>
            {step == 0 ? <Choose_letter /> : <div/>}
            {step == 1 ? <Read_Reply info={info}/> : <div/>}
    </div>
    );

  return (
      <div>
          {page}
      </div>

  );
}

export default App;
