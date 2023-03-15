import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import pawdRegExp from "../../../../utils/PasswordValidation/validation";

// craete schema validation

const userProfileSchema = yup.object({
  email: yup.string().required("Email is Required").email(),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      pawdRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

function LoginForm() {
  //   const navigate = useNavigate();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);
  const [errorMsg, setErrorMsg] = useState("");

  const handelToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
      setPasswordIcon(FaEyeSlash);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkfield: false,
    },
    resolver: yupResolver(userProfileSchema),
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data.email);
    console.log(data.password);

    reset();
  };

  return (
    <div className="items-center mx-auto mt-2 mb-12 w-96 sm:mx-auto sm:w-80 sm:items-center md:m-1 md:mx-auto md:mb-0 md:px-5 lg:my-24 lg:w-96">
      <h1 className="flex justify-center mx-auto mt-2 text-3xl font-bold font-['Inter'] text-[#202A44]">
        Log In
      </h1>
      <p className="flex justify-center mx-auto mt-3 mb-6 text-[#606060]">
        Dont have a account? <Link href="/register"> Signup</Link>
      </p>
      <form className="mx-0" onSubmit={handleSubmit(onSubmit)}>
        <p
          className={
            errorMsg
              ? "block w-full px-4 py-2 mx-0 h-10 text-xl font-normal text-gray-700 bg-red-500 border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
              : "hidden"
          }
        >
          {errorMsg}
        </p>
        <div className="mb-6 ml-0">
          <label
            htmlFor="email"
            className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
          >
            Email
            <input
              type="email"
              className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
              id="email"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("email")}
            />
          </label>

          <p className="font-medium text-rose-600">{errors.email?.message}</p>
        </div>
        <div className="mb-6 ml-0">
          <label
            htmlFor="password"
            className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
          >
            Password
            <div className="flex justify-between w-full px-4 mx-0 text-xl font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96">
              <input
                type={passwordType}
                className="block w-full px-4 py-2 mx-0 text-xl font-normal text-gray-700 bg-white rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
                id="password"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("password")}
              />
              <span
                className="mt-3 cursor-pointer"
                onKeyPress={handelToggle}
                role="button"
                tabIndex={0}
                onClick={handelToggle}
              >
                {" "}
                {passwordIcon}{" "}
              </span>
            </div>
            <p className="font-medium text-rose-600">
              {errors.password?.message}
            </p>
          </label>
        </div>

        <div className="flex items-center justify-between w-full mb-6 ml-0">
          <label
            htmlFor="checkbox"
            className="inline-block ml-0 font-semibold font-['Inter] text-[#606060] sm:ml-0"
          >
            Remember me
            <input
              type="checkbox"
              className="float-left w-4 h-4 mr-2 mt-1 align-top bg-center bg-no-repeat border border-gray-300 rounded-sm cursor-pointer bg-[#202A44] transition duration-200 checked:bg-[#202A44] focus:outline-none"
              id="checkbox"
            />
          </label>

          <Link
            href="/forgot-password"
            className="pr-0 mr-0 font-semibold font-['Inter] text-[#606060] sm:mr-2 lg:ml-24 lg:-mr-10"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-center lg:text-left">
          <input
            type="submit"
            className="inline-block w-full py-3 mx-0 mr-3 text-sm font-medium leading-snug text-white uppercase rounded shadow-md cursor-pointer bg-[#202A44] px-7 transition duration-150 ease-in-out hover:bg-[#c8815f] hover:shadow-lg lg:w-96"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
