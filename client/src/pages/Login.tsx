import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client'

const Login = () => {
  type LoginFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const { register, handleSubmit, formState: {errors} } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.login, {
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
      <h2 className="text-3xl font-bold">Login to your Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
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
      <span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
