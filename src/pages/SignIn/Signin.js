import React, { useState } from "react";
import { CustomInput } from "@/components";
import { Buttoncomponent } from "@/components";
import { loginAPI } from "../api/api";
import { useRouter } from "next/router";
const Signin = () => {
  const router=useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(username, password, "wnk");
  const handleSignIn = async () => {
    const res = await loginAPI(username, password);
    console.log(res?.data,"res")
    if(res)
    {
        alert("login sucessfull!")
        localStorage.setItem("admin_data",JSON.stringify(res?.data))
        router.push("/dashboard")
    }
    else{
        alert("Either Username or Password id wrong, Please Try again!!")
    }
  };
  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center">
      <p className="text-2xl font-poppins font-medium mb-4">
        Venue Admin Login
      </p>
      <CustomInput
        defaultValue="Username"
        password={username}
        setPassword={setUsername}
      />
      <CustomInput
        defaultValue="Password"
        password={password}
        setPassword={setPassword}
      />
      <Buttoncomponent
        buttonText="Sign In"
        buttonStyles="bg-[#6741D9] text-white font-poppins font-medium p-2 rounded-md text-sm rounded-md w-[500px]"
        onClick={handleSignIn}
      />
      <p className="text-sm font-poppins">New Registration?</p>
    </div>
  );
};

export default Signin;
