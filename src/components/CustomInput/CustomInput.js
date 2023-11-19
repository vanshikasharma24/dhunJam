import { useState, useEffect } from 'react';

const CustomInput = ({ password,setPassword,defaultValue }) => {

const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          backgroundColor: 'transparent',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '500px',
        }}
        placeholder={defaultValue}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={togglePasswordVisibility}
      >
        <img
          src={`${showPassword ? 'open-eye.svg' : 'hidden-eye.svg'}`}
          alt={showPassword ? 'Show Password' : 'Hide Password'}
        />
      </div>
    </div>
  );
};

export default CustomInput;
