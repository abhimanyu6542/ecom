/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import pawdRegExp from '../../../../utils/PasswordValidation/validation';

// craete schema validation

const userProfileSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is Required')
    .matches(
      pawdRegExp,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmNewPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), 'string'], "Password doesn't match"),
});

function ResetForm() {
  
  const [passwordType, setPasswordType] = useState('password');
  const [cpasswordType, setcPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const [cpasswordIcon, setcPasswordIcon] = useState(<FaEyeSlash />);

  const handelToggle = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setPasswordIcon(FaEye);
    } else {
      setPasswordType('password');
      setPasswordIcon(FaEyeSlash);
    }
  };

  const chandelToggle = () => {
    if (cpasswordType === "password") {
      setcPasswordType("text");
      setcPasswordIcon(FaEye);
    } else {
      setcPasswordType("password");
      setcPasswordIcon(FaEyeSlash);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(userProfileSchema),
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data.newPassword);
    console.log(data.confirmNewPassword)
    reset();
  };

  return (
    <div className="mx-auto mt-2 mb-12 w-96 sm:mx-auto sm:w-80 md:m-1 md:mx-auto md:mb-0 md:px-5 lg:my-24 lg:w-96">
      <h1 className="flex justify-center mx-auto mt-2 text-3xl font-bold font-['Inter'] text-[#202A44]">
        Reset Your Password
      </h1>
      <form className="mx-0 my-24" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 ml-0">
          <label
            htmlFor="newPassword"
            className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
          >
            New Password
          </label>
          <div className="flex justify-between w-full px-4 mx-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96">
            <input
              type={passwordType}
              className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white rounded bg-clip-padding focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
              id="newPassword"
              {...register('newPassword')}
            />
            <span className="mt-3 cursor-pointer" onClick={handelToggle}>
              {' '}
              {passwordIcon}{' '}
            </span>
          </div>
          <p className="font-medium text-rose-600">{errors.newPassword?.message}</p>
        </div>
        <div className="mb-6 ml-0">
            <label
              htmlFor="confirmPassword"
              className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
            >
              Confirm Password
            </label>
            <div className="flex justify-between w-full px-4 mx-0 text-xl font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96">
              <input
                type={cpasswordType}
                className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-white rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
                id="confirmPassword"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("confirmNewPassword")}
              />
              <span className="mt-3 cursor-pointer" onClick={chandelToggle}>
                {" "}
                {cpasswordIcon}{" "}
              </span>
            </div>
            <p className="font-medium text-rose-600">
              {errors.confirmNewPassword?.message}
            </p>
          </div>

        <div className="text-center lg:text-left">
          <input
            type="submit"
            className="inline-block w-full py-3 mx-0 mr-3 text-sm font-medium leading-snug text-white uppercase rounded shadow-md cursor-pointer bg-[#202A44] px-7 transition duration-150 ease-in-out hover:bg-[#c8815f] hover:shadow-lg focus:bg-[#c8815f] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-96"
            value="Reset Password"
          />
        </div>
        <div className="text-center lg:text-left">
          <p className="inline-block w-full py-3 mx-0 my-2 mr-3 text-sm font-medium leading-snug text-center text-white uppercase transition duration-150 ease-in-out rounded shadow-md cursor-pointer bg-rose-500 px-7 hover:bg-white hover:text-red-600 hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-96">
            <Link href="/login"> Cancel</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ResetForm;
