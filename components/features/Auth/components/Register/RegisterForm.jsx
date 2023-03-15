/* eslint-disable no-console */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import pawdRegExp from "../../../../utils/PasswordValidation/validation";
// import Image from "next/image";

// craete schema validation

const userProfileSchema = yup.object({
  fullName: yup.string().min(3).required("Full Name Required"),
  email: yup.string().required("Email is Required").email(),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      pawdRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), "string"], "Password doesn't match"),
});

function RegisterForm() {
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [cpasswordType, setcPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const [cpasswordIcon, setcPasswordIcon] = useState(<FaEyeSlash />);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handelToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(userProfileSchema),
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data.fullName);
    console.log(data.email);
    console.log(data.password);
    console.log(data.confirmPassword);

    reset();
  };

  return (
    <>
      <div className="mx-auto mt-2 mb-12 w-96 sm:mx-auto sm:w-80 md:m-1 md:mx-auto md:mb-0 md:px-5 lg:my-24 lg:w-96">
        <h1 className="flex justify-center mx-auto mt-2 text-3xl font-bold font-['Inter'] text-[#202A44]">
          Sign Up
        </h1>
        <p className="flex justify-center mx-auto mt-3 mb-6 text-[#606060]">
          have an account? <Link href="/login"> Log In</Link>
        </p>

        <form className="mx-0" onSubmit={handleSubmit(onSubmit)}>
          <p
            className={
              errorMsg
                ? "block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-red-500 border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
                : "hidden"
            }
          >
            {errorMsg}
          </p>
          <p
            className={
              successMsg
                ? "block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-green border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
                : "hidden"
            }
          >
            {successMsg}
          </p>

          <div className="mb-6 ml-0">
            <label
              htmlFor="fullName"
              className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
            >
              Full Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
              id="fullName"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("fullName")}
            />
            <p className="font-medium text-rose-600">
              {errors.fullName?.message}
            </p>
          </div>
          <div className="mb-6 ml-0">
            <label
              htmlFor="email"
              className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
            >
              Email
            </label>

            <input
              type="email"
              className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
              id="email"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("email")}
            />

            <p className="font-medium text-rose-600">{errors.email?.message}</p>
          </div>
          <div className="mb-6 ml-0">
            <label
              htmlFor="password"
              className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
            >
              Password
            </label>
            <div className="flex justify-between w-full px-4 mx-0 text-xl font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96">
              <input
                type={passwordType}
                className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-white rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
                id="password"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("password")}
              />
              <span className="mt-3 cursor-pointer" onClick={handelToggle}>
                {" "}
                {passwordIcon}{" "}
              </span>
            </div>

            <p className="font-medium text-rose-600">
              {errors.password?.message}
            </p>
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
                {...register("confirmPassword")}
              />
              <span className="mt-3 cursor-pointer" onClick={chandelToggle}>
                {" "}
                {cpasswordIcon}{" "}
              </span>
            </div>
            <p className="font-medium text-rose-600">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <div className="text-center lg:text-left">
            <input
              type="submit"
              className="inline-block w-full py-3 mx-0 mr-3 text-sm font-medium leading-snug text-white uppercase rounded shadow-md cursor-pointer bg-[#202A44] px-7 transition duration-150 ease-in-out hover:bg-[#c8815f] hover:shadow-lg focus:bg-[#c8815f] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-96"
              value="Sign Up"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
