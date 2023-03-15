import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


// craete schema validation

const userProfileSchema = yup.object({
  email: yup.string().required("Email is Required").email(),
});

function ForgotPasswordForm() {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(userProfileSchema),
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data.email);

    reset();
  };

  return (
    <div className="mx-auto mt-2 mb-12 w-96 sm:mx-auto sm:w-80 md:m-1 md:mx-auto md:mb-0 md:px-5 lg:my-24 lg:w-96">
      <h1 className="flex justify-center mx-auto mt-2 text-3xl font-bold font-['Inter'] text-[#202A44]">
        Forgot Password
      </h1>

      <form className="mx-0 my-24" onSubmit={handleSubmit(onSubmit)}>
        <p
          className={
            successMsg
              ? "block w-full px-4 py-2 mx-0 mb-5 text-xl font-normal text-gray-700 bg-green border border-gray-300 border-solid rounded bg-clip-padding transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:mx-auto sm:mr-4 lg:w-96"
              : "hidden"
          }
        >
          {successMsg}
        </p>
        <div className="mb-6 ml-0">
          <label
            htmlFor="email"
            className="text-lg font-normal font-['Inter] leading-5 text-[#606060]"
          >
            Enter Your Registered Email
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

        <div className="text-center lg:text-left">
          <input
            type="submit"
            className="inline-block w-full py-3 mx-0 mr-3 text-sm font-medium leading-snug text-white uppercase rounded shadow-md cursor-pointer bg-[#202A44] px-7 transition duration-150 ease-in-out hover:bg-[#c8815f] hover:shadow-lg focus:bg-[#c8815f] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-96"
            value="Sent Verification E-Mail"
          />
        </div>
        <div className="text-center lg:text-left">
          <p className="inline-block w-full py-3 mx-0 my-2 mr-3 text-sm font-medium leading-snug text-center text-white uppercase rounded shadow-md cursor-pointer bg-rose-500 px-7 transition duration-150 ease-in-out hover:bg-white hover:text-red-600 hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-96">
            <Link href="/login"> Cancel</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
