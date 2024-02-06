import { useState } from 'react';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { InputBox } from './components/index.js';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [previousAmount, setPreviousAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo);

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to])
    }

    const swap = () => {
        setFrom(to)
        setTo(from)
        setAmount(convertedAmount)
        convert()
      }

    return (
        <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(https://images.pexels.com/photos/251287/pexels-photo-251287.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }}>
            <div className='w-full'>
                <div className='w-full max-w-md mx-auto p-5 border border-gray-60 rounded-lg backdrop-blur-sm bg-white/30'>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        convert()
                    }}>
                        <div className='w-full mb-1'>
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                onAmountChange={(amount) => setAmount(amount)}
                                selectedCurrency={from}
                            />
                        </div>

                        <div className='relative w-full h-0.5'>
                            <button className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-1 '
                            onClick={swap}
                            >
                                Swap
                            </button>
                        </div>

                        <div className='w-full mb-1'>
                            <InputBox
                            label="to"
                            currencyOptions={options}
                            amount={convertedAmount}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectedCurrency={to}
                            amountDisabled
                            />
                        </div>

                        <button
                        type="submit"
                        className="w-full py-3 mt-3 bg-blue-500 text-white rounded-lg"
                        > 
                            Convert <span className="uppercase">{from}</span> to <span className="uppercase">{to}</span>
                        </button>


                    </form>
                </div>
            </div>

        </div>
    )
}

export default App
