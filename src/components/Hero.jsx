import { Input, Select, Option, Button } from "@material-tailwind/react";
import UseFetch from "./UseFetch";
import { useState } from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
const Hero = () => {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const app_id = "babb87059af1475a9106416414a9b676";
  const url = `https://openexchangerates.org/api/latest.json?app_id=${app_id}`;
  const { currency, loading, error } = UseFetch(url);
  console.log(currency);

  if (loading)
    return (
      <Button variant="text" loading={true} className="text-[28px] p-12 text-center">
        Loading
      </Button>
    );
  if (error)
    return (
      <p className="text-[20px] mt-6 text-red-900 p-12">
        Error: {error.message}
      </p>
    );

  const handleAmountChange = (e) => {
    const amountValue = parseFloat(e.target.value);
    if (amountValue < 0 || isNaN(amountValue)) {
      return;
    }
    setAmount(amountValue);
  };

  const handleCurrencyChange = (value) => {
    setTo(value);
    if (currency.rates) {
      const rate = currency.rates[value];
      setExchangeRate(rate);
    }
  };

  const handleConvert = () => {
    if (amount && exchangeRate) {
      setConvertedAmount(amount * exchangeRate);
    }

    setAmount("");
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
              type="text"
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
                {currency.base || "Loading ......"}{" "}
              </Option>
            </Select>
          </div>
          <div className="md:w-[300px]">
            <Select
              size="md"
              label="To (Currency)"
              className="w-full"
              value={to}
              onChange={handleCurrencyChange}
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
          <Button
            className="flex items-center gap-2 bg-purple-800
             hover:bg-purple-300 px-8 transition ease-in-out duration-1000"
            onClick={handleConvert}
          >
            <p>Convert</p>
            <BanknotesIcon className="w-6 h-4" />
          </Button>
        </div>

        {convertedAmount !== null && (
          <div className="md:w-1/2 mt-10 bg-purple-100 py-8 px-6 rounded-xl">
            <p className="text-purple-900 md:text-[18px] ">
              Converted Amount: 
              <span>
                {" "}
                {to} {convertedAmount.toFixed(2)}
              </span>
            </p>
          </div>

        )}

        {convertedAmount !== null &&(
          <p className="mt-4 text-[18px]">
           <strong>Rate:</strong> <span>1 {currency.base} = {exchangeRate} {to}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default Hero;
