import { Input, Select, Option, Button } from "@material-tailwind/react";
import UseFetch from "./UseFetch";
import { useState } from "react";
import {BanknotesIcon} from "@heroicons/react/24/outline"
const Hero = () => {
    const [amount, setAmount] = useState("");
    const [to, setTo] = useState("");
    const [exchangeRate, setExchangeRate] = useState(null)
    const app_id = "babb87059af1475a9106416414a9b676"
    const url = `https://openexchangerates.org/api/latest.json?app_id=${app_id}`
    const { currency, loading, error } = UseFetch(url);
    console.log(currency);

    
    if (loading) return (
      <Button variant="text" loading={true} className="text-[20px] p-12">
        Loading
      </Button>
    );
    if (error) return <p className="text-[20px] mt-6 text-red-900 p-12">Error: {error.message}</p>;


    const handleAmountChange = (e) =>{
      
      const amountValue = e.target.value
      if (amountValue < 0 ) {
        return <p className="text-red-500">Please enter a positive value</p>;
      }
      setAmount(amountValue);
    }

    const handleConvert = (to) => {
      const rate = currency.rates[to]
      setExchangeRate(rate)

      const convertedAmount = amount * exchangeRate

      return `<div className="mt-8 p-12 bg-purple-300 text-[16px]">
              <p>
                <strong>Converted Amount</strong>: ${to} ${convertedAmount}
              </p>
            </div>`;
    };

  return (
    <>
      <div className=" bg-gray-100 w-[80%] m-auto rounded-lg h-[80vh] mt-6 p-10 ">
        <p className="text-purple-900 text-[34px] font-bold mb-14">
          Exchange Rate Today
        </p>
        <div className="flex flex-wrap items-center gap-3 ">
          <div className="md:w-[300px]">
            <Input
              variant="outlined"
              type="number"
              label="Amount"
              placeholder="Amount"
              className="w-full"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="md:w-[300px]">
            <Select
              size="md"
              label="From (Currency)"
              className="w-full"
              disabled
              value={currency.base || ""}
            >
              <Option value={currency.base || ""}>
                {" "}
                {currency.base || "Loading ....."}{" "}
              </Option>
            </Select>
          </div>
          <div className="md:w-[300px]">
            <Select
              size="md"
              label="To (Currency)"
              className="w-full"
              value={to}
              onChange={(e) => {
                setTo(e);
              }}
            >
              {currency.rates &&
                Object.keys(currency.rates).map((key) => (
                  <Option key={key} value={key}>
                    {key}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        {amount !== "" && parseFloat(amount) <= 0 && (
          <p className="text-red-500 mt-4">Please enter a positive value</p>
        )}
        <div className="mt-12 md:flex md:justify-center">
          <Button className="flex items-center gap-2 hover:bg-green-400 px-8" onClick={handleConvert}>
            <p>Convert</p>
            <BanknotesIcon  className="w-5 h-4"/>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
