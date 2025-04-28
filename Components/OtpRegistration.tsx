/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
// import { useRouter } from "next/router";
import { randomString } from "@/utils/helpers";
import CustomButton from "./CustomButton";

const validationSchema = Yup.object({
  mobileNumber: Yup.string()
    .required("Please enter a valid 10-digit mobile number!")
    .min(10, "Please enter a valid 10-digit mobile number!")
    .max(10, "Please enter a valid 10-digit mobile number!"),
  otp: Yup.string().length(6).required("OTP is required"),
});

const OtpRegisterForm = () => {
  const [timer, setTimer] = useState<number>(0);
  const [otpLoading, setOtpLoading] = useState(false);

  // const trackRegistration = async (phone: string, referral: string) => {
  //   try {
  //     await axios.post("https://indi131.com/registrations_tracking.php", {
  //       phone: phone,
  //       referral: referral,
  //       url: window.location.href,
  //     });
  //   } catch (error) {
  //     console.error("Error  registration:", error);
  //   }
  // };

  // const trackEvent = (
  //   eventName: string,
  //   params: Record<string, any>,
  //   callback?: () => void
  // ) => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof (window as any).gtag === "function"
  //   ) {
  //     (window as any).gtag("event", eventName, {
  //       ...params,
  //       event_callback: callback || (() => {}), // Callback ensures GA processes data before redirect
  //     });
  //   } else {
  //     if (callback) callback(); // Proceed with redirect even if GA4 is unavailable
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      otp: "",
      password: "",
    },
    validationSchema,
    onSubmit: async () => {
      // const referral = (router.query.referral as string) || "LPWITHNOREFF";
      // const urlParams = new URLSearchParams(window.location.search);
      // urlParams.delete("referral");
      // //Register an user
      // axios
      //   .post(
      //     `https://www.indibet.in/frontend/api/register/landing?region=India&mobile=${
      //       values.mobileNumber
      //     }&currencyCode=INR&name=${randomString() + "i"}&password=${
      //       values.password
      //     }&referral=${referral}&smsCode=${values.otp}`
      //   )
      //   .then(async (res) => {
      //     console.log(res);
      //     if (res.data.status === 500) {
      //       toast.error(res.data.message ?? "You're successfully logged in.", {
      //         className: "!bg-[#27992e] text-sm !shadow  !shadow-slate-300",
      //       });
      //       return;
      //     }
      //     const autoLoginToken = res.data.data.autoLoginToken;
      //     await trackRegistration(values.mobileNumber, referral);
      //     trackEvent(
      //       "registration_success",
      //       {
      //         page_path: window.location.href,
      //         referral: referral,
      //       },
      //       () => {
      //         console.log("GA4 event processed, redirecting...");
      //         localStorage.setItem("loggedIn", "1");
      //         setPermanentCookie("loggedIn", "1", 10);
      //         urlParams.delete("referral");
      //         const queryParamsString = urlParams.toString();
      //         const game =
      //           (typeof router.query.game === "string" &&
      //             router.query.game?.toLowerCase()) ||
      //           "live";
      //         const availablePaths: { [key: string]: string } = {
      //           home: "home",
      //           live: "casino",
      //           slot: "slot",
      //           indigames: "indigames",
      //           sports: "sports",
      //           footballbook: "footballbook",
      //         };
      //         const path = availablePaths[game] || "live";
      //         router.push(
      //           `https://www.indibet.in/frontend/api/member/autoLoginRedirect?autoLoginToken=${autoLoginToken}&path=/${path}&${queryParamsString}`
      //         );
      //       }
      //     );
      //   })
      //   .catch(() => {
      //     toast.error("Network Error. Please try again later.", {
      //       className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
      //       // icon: <BsShieldFillExclamation size={35} />,
      //     });
      //   })
      //   .finally(() => {
      //     formik.setSubmitting(false);
      //   });
    },
  });

  // const handleSubmit = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   const errors = await formik.validateForm();

  //   if (errors.mobileNumber) {
  //     toast.error(errors.mobileNumber, {
  //       className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
  //       // icon: <BsShieldFillExclamation size={35} />,
  //     });
  //   } else if (errors.otp) {
  //     toast.error(errors.otp, {
  //       className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
  //       // icon: <BsShieldFillExclamation size={35} />,
  //     });
  //   } else if (errors.password) {
  //     toast.error(errors.password, {
  //       className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
  //       // icon: <BsShieldFillExclamation size={35} />,
  //     });
  //   } else {
  //     formik.handleSubmit();
  //   }
  // };

  const handleOtp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOtpLoading(true);
    // const uuid = uuidv4();

    const errors = await formik.validateForm();

    if (errors.mobileNumber) {
      toast.error(errors.mobileNumber, {
        className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
        // icon: <BsShieldFillExclamation size={35} />,
      });

      setOtpLoading(false);
    } else {
      //Send OTP

      axios
        .post(
          `https://www.indibet.in/frontend/api/register/landing?region=India&mobile=${
            formik.values.mobileNumber
          }&currencyCode=INR&name=${randomString() + "-123"}&password=${
            formik.values.password
          }`
        )
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("OTP Sent Successfully!", {
              className: "!bg-[#27992e] text-sm !shadow !shadow-slate-300",
            });
            setTimer(60);
          } else
            toast.error(
              res?.data?.message ??
                "Error while sending otp, Please try again later",
              {
                className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
              }
            );
        })
        .catch((err) =>
          toast.error(
            err?.response?.data?.message ??
              "Error occured, Please try again...",
            {
              className: "!bg-[#992e27] text-sm !shadow  !shadow-slate-300",
              // icon: <BsShieldFillExclamation size={35} />,
            }
          )
        )
        .finally(() => {
          setOtpLoading(false);
        });
    }
  };

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  return (
    <form id="register-form">
      <div className="mb-2 !text-black">
        <label htmlFor="mobileNumber " className="text-[14px]">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          required
          id="mobileNumber"
          name="mobileNumber"
          placeholder="Enter Mobile"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.mobileNumber}
          className=" w-full px-[9px] py-[5px] border-2 border-[#ccc] border-solid rounded-xl shadow-sm text-base"
        />
      </div>
      <div className="mb-2 !text-black">
        <label htmlFor="password" className="text-[14px]">
          Password
        </label>
        <input
          required
          id="password"
          name="password"
          placeholder="Enter Password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className=" w-full px-[9px] py-[5px] border-2 border-[#ccc] border-solid rounded-xl shadow-sm text-base"
        />
      </div>
      <div className="mb-2 w-full">
        <label htmlFor="otp" className="text-[14px]">
          OTP<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap items-center justify-between">
          <input
            required
            id="otp"
            name="otp"
            type="number"
            placeholder="Enter OTP"
            pattern="[0-9]*"
            onChange={formik.handleChange}
            value={formik.values.otp}
            className=" px-[9px] py-[5px] border-2 border-[#ccc] border-solid rounded-xl shadow-sm text-base"
            style={{
              width: "calc(100% - 105px)",
            }}
          />
          <div className="!h-auto w-[100px]">
            <CustomButton
              disabled={otpLoading || timer > 0}
              onClick={(e) => handleOtp(e)}
              className="text-sm !font-bold !font-sans !h-auto !px-[9px] !py-[7px]"
            >
              {timer > 0 ? `Please wait ${timer}s` : "GET OTP"}
            </CustomButton>
          </div>
        </div>
      </div>
      <CustomButton
        disabled={formik.isSubmitting}
        // onClick={(e) => handleSubmit(e)}
        className="text-lg mt-[5px] lg:mt-[18px]  font-sans tracking-wider"
      >
        {formik.isSubmitting ? "Loading..." : "Sign Up Now!"}
      </CustomButton>
    </form>
  );
};

export default OtpRegisterForm;
