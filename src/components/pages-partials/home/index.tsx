import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  Main,
  DivLogo,
  DivTitle,
  DivDesc,
  DivButton,
  Icon,
  Container,
  StyleDiv,
  StyledTypography,
} from "./index.styles";

import Button from "@/components/core/Button";
import { useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAuthDataSelector } from "@/store/auth";

export default function Home() {
  const router = useRouter();

  const { isAuthenticated } = useAppSelector(getAuthDataSelector);

  if (isAuthenticated === true) {
    router.push("/dashboard");
  }
  
  return (
    <Container container>
      <Main item xs={12}>
        <Image
          src={"/images/home-background.jpg"}
          layout="fill"
          objectFit="cover"
        />
      </Main>

      <StyleDiv item xs={12}>
        <DivLogo>
          <Image src={"/svgs/cms-spa-logo.svg"} width={300} height={200} />
        </DivLogo>
        <DivTitle>About Wishah Appointment Booking & Schedules</DivTitle>
        <DivDesc>
          Wishah SPA booking is one of the best spa, salon and any kinds of
          Therapist's appointment and schedules booking application with
          integrated CMS website. Using this system admin can Customize Service
          time slot, Daily/Weekly/Monthly Booking & cancelation limitation,
          Employee wise service and service price.
        </DivDesc>
        <Link href="/login">
          <DivButton>
            <Button>
              Get Started
              <Icon src="/svgs/RightArrow.svg" alt="Right Arrow" />
            </Button>
          </DivButton>
        </Link>
      </StyleDiv>
      <StyledTypography>&copy; All Rights Reserved 2023</StyledTypography>
    </Container>
  );
}
