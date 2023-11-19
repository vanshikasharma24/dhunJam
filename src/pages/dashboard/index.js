import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { getAdminDetails } from "../api/api";
import { Buttoncomponent } from "@/components";
import ReactApexChart from "react-apexcharts";
import { updatePrice } from "../api/api";

const Index = () => {
  const [adminData, setAdminData] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(null);
  const [customSongAmount, setCustomSongAmount] = useState("");
  const [regularAmounts, setRegularAmounts] = useState({
    category_7: "",
    category_8: "",
    category_9: "",
    category_10: "",
  });

  const getAdmindetails = async () => {
    const admin_data = localStorage.getItem("admin_data");
    const parsedData = JSON.parse(admin_data);
    const res = await getAdminDetails(parsedData?.token, parsedData?.id);
    setAdminData(res);
    setChargeCustomers(res?.charge_customers);
    setCustomSongAmount(res?.amount?.category_6);
    setRegularAmounts({
      category_7: res?.amount?.category_7,
      category_8: res?.amount?.category_8,
      category_9: res?.amount?.category_9,
      category_10: res?.amount?.category_10,
    });
    console.log(res, "res in use");
  };

  useEffect(() => {
    getAdmindetails();
  }, []);

  const handleRadioChange = (event) => {
    setChargeCustomers(event.target.value === "yes");
  };

  const isSaveButtonEnabled = () => {
    return (
      chargeCustomers &&
      customSongAmount > 99 &&
      regularAmounts.category_7 >= 79 &&
      regularAmounts.category_8 >= 59 &&
      regularAmounts.category_9 >= 39 &&
      regularAmounts.category_10 >= 19
    );
  };
  const handleSaveButtonClick = async () => {
    const updatedData = {
      category_6: customSongAmount,
    };
    try {
      const result = await updatePrice(adminData?.id, updatedData);
      if (result && result.status === 200) {
        alert("Price update successful");
      } else {
        alert("Price update failed");
      }
    } catch (error) {
      console.error("Error updating price", error);
    }
  };
  return (
    <div className=" w-[50%] mx-auto flex flex-col gap-2 items-center justify-center h-screen">
      <p className="text-2xl font-poppins font-medium p-2 items-center">
        {adminData?.name}, {adminData?.location} on Dhun Jam
      </p>
      <div className="grid grid-cols-2 gap-8 w-[600px]">
        <div className="flex flex-col gap-4 ml-8">
          <p className="text-sm font-poppins mt-2">
            Do you want to charge your customers for requesting songs?
          </p>
          <p className="text-sm font-poppins mt-3">
            Custom song request amount-
          </p>
          <p className="text-sm font-poppins mt-3">
            Regular song request amounts, from high to low-
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={chargeCustomers ? "yes" : "no"}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel
                value="other"
                disabled
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <input
            type="number"
            value={customSongAmount || ""}
            onChange={(e) => setCustomSongAmount(e.target.value)}
            className={`border-2 border-white rounded-md text-white w-[200px] font-poppins font-medium p-2 text-sm ${
              !chargeCustomers ? "bg-gray-500 cursor-not-allowed" : "bg-[#030303]"
            }`}
            disabled={!chargeCustomers}
          />
          <div className="flex gap-2 w-[200px]">
            {/* all these are regular song request amounts from high to low */}
            {/* category_7 */}

            <input
              // type="number"
              value={regularAmounts?.category_7 || ""}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_7: e.target.value,
                })
              }
              className={`border-2 border-white rounded-md text-white  w-full font-poppins font-medium p-2 text-sm ${
                !chargeCustomers ? "bg-gray-500 cursor-not-allowed" : "bg-[#030303]"
              }`}
              disabled={!chargeCustomers}
            />
            <input
              // type="number"
              value={regularAmounts?.category_8 || ""}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_8: e.target.value,
                })
              }
              className={`border-2 border-white rounded-md text-white font-poppins w-full font-medium p-2 text-sm ${
                !chargeCustomers ? "bg-gray-500 cursor-not-allowed" : "bg-[#030303]"
              }`}
              disabled={!chargeCustomers}
            />
            <input
              // type="number"
              value={regularAmounts?.category_9 || ""}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_9: e.target.value,
                })
              }
              className={`border-2 border-white rounded-md text-white font-poppins w-full font-medium p-2 text-sm ${
                !chargeCustomers ? "bg-gray-500 cursor-not-allowed" : "bg-[#030303]"
              }`}
              disabled={!chargeCustomers}
            />
            <input
              // type="number"
              value={regularAmounts?.category_10 || ""}
              onChange={(e) =>
                setRegularAmounts({
                  ...regularAmounts,
                  category_10: e.target.value,
                })
              }
              className={`border-2 border-white rounded-md text-white font-poppins w-full font-medium p-2 text-sm ${
                !chargeCustomers ? "bg-gray-500 cursor-not-allowed" : "bg-[#030303]"
              }`}
              disabled={!chargeCustomers}
            />
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: "600px" }}>
          <ReactApexChart
            options={{
              chart: {
                type: "bar",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: [
                  "Custom",
                  "Category 7",
                  "Category 8",
                  "Category 9",
                  "Category 10",
                ],
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "30%", // Adjust the width of the bars as needed
                  endingShape: "rounded", // You can use "flat" for flat ends
                },
              },
              colors: ["#F0C3F1"], // Change the color of the bars
            }}
            series={[
              {
                name: "Song Request Amounts",
                data: [
                  customSongAmount,
                  regularAmounts.category_7,
                  regularAmounts.category_8,
                  regularAmounts.category_9,
                  regularAmounts.category_10,
                ],
              },
            ]}
            type="bar"
            height={350}
          />
        </div>
        <Buttoncomponent
          buttonText="Save Button"
          buttonStyles={`bg-[#6741D9] rounded-md font-poppins font-medium p-2 text-sm w-[600px] hover:border-[1px] hover:border-[#F0C3F1] ${
            isSaveButtonEnabled() ? "" : "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={
            isSaveButtonEnabled()
              ? handleSaveButtonClick
              : () => alert("You can not save!!")
          }
          disabled={!isSaveButtonEnabled()}
        />
      </div>
    </div>
  );
};

export default Index;
