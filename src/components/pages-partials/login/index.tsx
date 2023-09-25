import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";

import Button from "@/components/core/Button";
import { Checkbox, CircularProgress } from "@mui/material";
import { clearError, signIn } from "@/store/auth/authSlice";
import {
  StyledGridRight,
  StyledGridLeft,
  Heading,
  FlexRow,
  InnerFlex,
  H4,
  DivButton,
  Container,
  StyledTypography,
  DivSpace,
} from "./index.styles";
import FieldInput from "@/components/core/FieldInput";
import { loginValidation } from "@/validations";
import { useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAuthDataSelector } from "@/store/auth";
import { COLORS } from "@/constants/colors";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { status, error, isAuthenticated, isNavigated } =
    useAppSelector(getAuthDataSelector);

  const onFormSubmit = async (values: FormValues) => {
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (error && error.length > 0) {
      toast.error(error)
      dispatch(clearError());
    }
  }, [error]);

  if (isAuthenticated === true && !isNavigated) {
    router.push("/dashboard");
  }

  return (
    <Container container>
      <StyledGridLeft item xs={5}>
        <Image
          src={"/images/logincover.jpg"}
          objectFit="cover"
          layout="fill"
          priority
        />
        <StyledTypography>&copy; All Rights Reserved 2023</StyledTypography>
      </StyledGridLeft>
      <StyledGridRight item xs={7}>
        <Image src={"/svgs/cms-spa-logo.svg"} width={120} height={120} />
        <Heading>
          Welcome to SPA <br></br> CMS
        </Heading>
        <DivSpace />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={() => loginValidation}
          onSubmit={onFormSubmit}
        >
          {({ errors, touched, isValid, dirty }) => {
            return (
              <Form className="login-form">
                <Field
                  as={FieldInput}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  error={errors.email && touched.email ? true : false}
                  helperText={<ErrorMessage name="email" />}
                />
                <DivSpace />
                <Field
                  as={FieldInput}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password && touched.password ? true : false}
                  helperText={
                    <ErrorMessage name="password" className="color-white" />
                  }
                  // InputProps={{
                  //   endAdornment: (
                  //     <StyledInputAdornment position="end">
                  //       .near
                  //     </StyledInputAdornment>
                  //   ),
                  // }}
                />
                <FlexRow>
                  <InnerFlex>
                    <Checkbox
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 22 },
                        "&.Mui-checked": {
                          color: "white",
                        },
                        "&.MuiCheckbox-colorPrimary": {
                          color: "white",
                        },
                      }}
                    />
                    <H4>Remember me </H4>
                  </InnerFlex>
                  {/* <H4>Forget Password ?</H4> */}
                </FlexRow>
                <DivButton>
                  <Button  disabled={!(dirty && isValid)} type="submit">
                    {status === "pending" ? (
                      <CircularProgress
                        style={{ color: COLORS.WHITE_100 }}
                        size={20}
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </DivButton>
              </Form>
            );
          }}
        </Formik>
      </StyledGridRight>
    </Container>
  );
}
