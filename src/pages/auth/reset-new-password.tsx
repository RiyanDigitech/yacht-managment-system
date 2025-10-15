import { ChangePasswordType, errorType } from "@/lib/types";
import { Form, Input, Spin } from "antd";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import "../../index.css";
import { useLocation } from "react-router-dom";
import { ChangePasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth.service";


export default function ResetNewPassword() {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  // ✅ Extract token and email from query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const safeToken = searchParams.get("token") || "";
  const safeEmail = searchParams.get("email") || "";

  const { useHandleResetPassword } = AuthService();

  // ✅ pass both safeToken and safeEmail
  const { mutate, isPending } = useHandleResetPassword(reset, safeToken, safeEmail);

  const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
    console.log("Submitting form:", data);
    mutate(data); // ✅ this will now include email
  };
  const onError: SubmitErrorHandler<errorType> = (errors) => {
    console.log(errors);
  };

  return (
    <div className="h-screen bg-[url('/auth-bg.png')] bg-cover bg-center flex md:items-center justify-center font-manrope">
      <div className="my-auto md:my-5 flex-1 md:max-w-150 bg-white bg-opacity-40 rounded-2xl py-12 px-8 md:px-16">
        <img src="/smartchoice.png" alt="Smart Choice" width={250} />
        <h1 className="text-lg text-center md:text-2xl font-bold text-[#18120F] mt-6">
          Reset new password
        </h1>
        <p className="text-[#6b6b6b] text-center text-sm mb-5">
          Type your new password
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col mt-3">

          {/* New Password Field */}
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Form.Item className="w-full mb-4">
                <label
                  htmlFor="newPassword"
                  className="text-[14px] text-[#6B6B6B] font-semibold"
                >
                  New Password
                </label>
                <Input.Password
                  {...field}
                  id="newPassword"
                  placeholder="New Password"
                  className="h-[44px] w-full bg-white border border-[#EBF0ED] mt-1"
                />
              </Form.Item>
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Form.Item className="w-full mb-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-[14px] text-[#6B6B6B] font-semibold"
                >
                  Confirm New Password
                </label>
                <Input.Password
                  {...field}
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  className="h-[44px] w-full bg-white border border-[#EBF0ED] mt-1"
                />
              </Form.Item>
            )}
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-[#00a1b3] font-manrope text-white py-2 rounded-md text-[14px] mt-6 w-full hover:bg-[#0093a4] transition-all"
          >
            {isPending ? <Spin /> : "Reset New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}


// import { ChangePasswordType, errorType } from "@/lib/types";
// import { Form, Input, Spin } from "antd";
// import {
//   Controller,
//   SubmitErrorHandler,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// import "../../index.css";
// import { useParams } from "react-router-dom";
// import { ChangePasswordSchema } from "@/lib/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import AuthService from "@/services/auth.service";
// export default function ResetNewPassword() {
//   const {
//     control,
//     handleSubmit,
//     // formState: { errors },
//     reset,
//   } = useForm<ChangePasswordType>({
//     resolver: zodResolver(ChangePasswordSchema),
//   }); // const navigate = useNavigate();
//   const { token } = useParams<{ token: string | undefined }>();
//   const safeToken = token || ""; // Provide an empty string as a default value

//   const { useHandleResetPassword } = AuthService();

//   const { mutate, isPending } = useHandleResetPassword(reset, safeToken);

//   const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
//     mutate(data);
//   };
//   const onError: SubmitErrorHandler<errorType> = (errors) => {
//     console.log(errors);
//   };
//   return (
//     <div className="h-screen bg-[url('/auth-bg.png')] bg-cover bg-center  relative flex md:items-center justify-center font-manrope">
//       <div className="font-manrope my-auto md:my-5 flex-1 md:max-w-150 bg-white bg-opacity-40 rounded-2xl py-12 px-8 md:px-16 h-fit ">
//         {/* <h2 className="text-xl font-bold text-[#00a1b3]">App Name / logo</h2> */}
//         <img src="/smartchoice.png" alt="Smart Choice" width={250} />
//         <h1 className="text-lg text-center md:text-2xl font-bold text-[#18120F] mt-6 font-manrope">
//           Reset new password
//         </h1>
//         <p className="text-[#6b6b6b] text-center font-manrope text-sm mb-5">
//           Type your new password
//         </p>
//         <form
//           onSubmit={handleSubmit(onSubmit, onError)}
//           className="font-manrope w-full flex flex-col mt-3 "
//         >
//           <Controller
//             name="newPassword"
//             control={control}
//             render={({ field }) => (
//               <Form.Item className="w-full sm:w-full  mb-4">
//                 <label
//                   htmlFor="newPassword"
//                   className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem]"
//                 >
//                   New Password
//                 </label>
//                 <Input.Password
//                   {...field}
//                   id="newPassword"
//                   placeholder="New Password"
//                   className="h-[44px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
//                 />
//               </Form.Item>
//             )}
//           />
//           <Controller
//             name="confirmPassword"
//             control={control}
//             render={({ field }) => (
//               <Form.Item className="w-full sm:w-full  mb-1">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="text-[14px] text-[#6B6B6B] font-manrope font-semibold leading-[1.125rem] flex"
//                 >
//                   Confirm New Password{" "}
//                 </label>
//                 <Input.Password
//                   {...field}
//                   id="confirmPassword"
//                   placeholder="Confirm New Password"
//                   className="h-[44px] w-full bg-white border-[1px] border-[#EBF0ED] mt-1"
//                 />
//               </Form.Item>
//             )}
//           />

//           <button
//             type="submit"
//             className={`bg-[#00a1b3] font-manrope w-11/12 sm:w-6/12 lg:w-full text-white py-2 rounded-md text-[14px] mt-6 "
//             }`}
//           >
//             {isPending ? <Spin /> : "Reset New Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
