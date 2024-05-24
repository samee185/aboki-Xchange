import { Input, Select, Option } from "@material-tailwind/react";
import UseFetch from "./UseFetch";
import { useState } from "react";

const Hero = () => {
    const [amount, setAmount] = useState("");
    const [to, setTo] = useState("");
    const app_id = "babb87059af1475a9106416414a9b676"
    const url = `https://openexchangerates.org/api/latest.json?app_id=${app_id}`
    const { currency, loading, error } = UseFetch(url);
    console.log(currency);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleAmountChange = (e) =>{
      const amountValue = e.target.value
      if (amountValue < 0 ) {
        return
      }
      setAmount(amountValue);
    }
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
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            {amount !== "" && parseFloat(amount) <= 0 && (
              <p className="text-red-500">Please enter a positive value</p>
            )}
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
                {currency.base || "Loading ...."}{" "}
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
      </div>
    </>
  );
};

export default Hero;
