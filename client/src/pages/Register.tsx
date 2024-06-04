import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client'

const Register = () => {
  type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const { register, watch, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("register success");
    },
    onError: (error: Error) => {
      console.log(error.message);
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 text-font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 text-font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 text-font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 text-font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 text-font-normal"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) => {
              if (!value) {
                return "Password must be at least 6 characters";
              } else if (watch("password") !== value) {
                return "Passwords do not match";
              }
            },
          })}
        ></input>
        {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
      </label>
      <span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
