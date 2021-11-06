import './App.css';
import { useState } from 'react';
import MyButton from './components/button';


function App() {
  const [calc, setCalc] = useState('');
  const [complexcalc, setComplexcalc] = useState(false)
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState(false);
  const [corr, setCorr] = useState(true);
  const mainoperators = ['√', '(', ')', '÷', '×', '+', '-', '.', 'log', 'ln',]
  const operators = ['/', '*', '+', '-', '.'];
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const others = ['mc', 'mr', 'm+', 'm-', 'DEL'];

  const parsecalc = (value) => {
    if (value === 'AC') {
      setCalc('');
      setComplexcalc('');
      setOperator(false);
    }

    else if (calc && value === 'DEL') {
      if (calc[calc.length - 1] === '.')
        setOperator(false);
      let C = calc.slice(0, -1);
      //let C1 = complexcalc.slice(0, -1);
      setCalc(C);
      //setComplexcalc(C1);
    }
    else if (calc.length === 14 || (operators.includes(value) && !calc && value !== '-'))
      return;

    else if (value !== '.' && operators.includes(value) && operators.includes(calc[calc.length - 1])) {
      let C = calc.slice(0, -1) + value;
      //let C1 = complexcalc.slice(0, -1) + value;
      setCalc(C);
    }
    else if (!others.includes(value)) {
      if (operators.includes(value)) {
        if (value === '.') {
          if (operator === true) {
            return;
          }
          else {

            setOperator(true);
          }

        }
        else
          setOperator(false);

      }
      if (value === 'log' || value === 'ln') {
        setComplexcalc(true);
      }

      setCalc(calc + value);
    }
    setCorr(true);
  }
  const equal = (_non) => {
    if (calc) {
      try {
        setCorr(false);
        let tmp = calc.replace(/log/gi, 'Math.log10');
        tmp = tmp.replace(/ln/gi, 'Math.log')
        tmp = tmp.replace(/√/gi, 'Math.sqrt');
        let re = eval(tmp).toExponential();
        if (re.length > 15) {
          let where = re.indexOf('e');
          if (where !== -1) {
            let forward = re.length - where
            re = re.slice(0, where - forward - 1) + re.slice(where);
            console.log(re.slice(0, where - forward));
            console.log(re.slice(where));
          }

        }
        setResult(re);
        //setResult(eval(''));
        setCalc('');
        setComplexcalc(false);
      }
      catch (e) {
        alert('ERRRRRROR!!!!!')
        setCalc('');
      }
    }



  }

  const buttonrow = (_name) => {
    const butt = [];
    for (let i = 0; i < 4; ++i) {
      butt.push(<MyButton name={_name[i]} func={() => parsecalc(_name[i])} />)
    }
    return (
      <div className='buttonrow'>
        {butt}
      </div>
    )
  }
  return (
    <div className="App">
      <div className='main'>
        <div className='display'>{corr ? (calc ? calc : 0) : (result ? result : 0)}</div>
        {/* {console.log()} */}
        <div className='buttonarea'>
          {buttonrow(['log', 'ln', '√', 'DEL'])}
          {buttonrow(['mc', 'mr', 'm+', 'm-'])}
          {buttonrow(['AC', '(', ')', '/'])}
          {buttonrow(['7', '8', '9', '*'])}
          {buttonrow(['4', '5', '6', '-'])}
          {buttonrow(['1', '2', '3', '+'])}
          <div className='bottomrow'>
            <MyButton name={'0'} func={() => parsecalc('0')} />
            <MyButton name={'.'} func={() => parsecalc('.')} />
            <MyButton name={'='} func={() => equal('=')} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
