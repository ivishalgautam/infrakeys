import React, { useEffect, useRef, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { H1, P, Small } from "@/components/ui/typography";
import { useForm, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const sendOtp = async () => {
  return await http().post(endpoints.otp.send);
};

const verifyOtp = async ({ otp }) => {
  return await http().post(`${endpoints.otp.verify}/${otp}`);
};

export default function OTPForm() {
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { otp: "" },
  });
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [minute] = useState(5);

  const sendMutation = useMutation(sendOtp, {
    onSuccess: (data) => {
      toast.success(data.message);
      setIsResendDisabled(true);
      setRemainingTime(60 * minute);
      setTimeout(() => setIsResendDisabled(false), 1000 * 60 * minute);
    },
    onError: (error) => {
      console.log(error);
      if (error.response.status === 500) {
        return toast.error("Error sending otp!");
      }
      toast.error(error.message);
    },
  });

  const verifyMutation = useMutation(verifyOtp, {
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (isResendDisabled) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); // Update remaining time every second
      return () => clearInterval(interval);
    }
  }, [isResendDisabled]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSendOtp = () => {
    sendMutation.mutate();
  };

  const handleVerifyOtp = (otp) => {
    verifyMutation.mutate({ otp });
  };

  const onSubmit = ({ otp }) => {
    handleVerifyOtp(otp);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 p-8">
        <div className="relative mb-8 before:absolute before:-bottom-5 before:left-0 before:h-1.5 before:w-20 before:bg-black">
          <H1>Verify OTP</H1>
        </div>
        <div>
          <Label>OTP</Label>
          <Controller
            control={control}
            name="otp"
            rules={{ required: "Please enter your OTP" }}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                render={({ slots }) => (
                  <>
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  </>
                )}
                {...field}
              />
            )}
          />
          {/* {errors.otp && <span>{errors.otp.message}</span>} */}
          <Small className={"text-center"}>Enter your one-time password.</Small>
        </div>
        <div className="space-x-2">
          <Button>Submit</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSendOtp}
            disabled={isResendDisabled}
          >
            {isResendDisabled
              ? `Resend in ${formatTime(remainingTime)}`
              : "Resend OTP"}
          </Button>
        </div>
      </div>
    </form>
  );
}
