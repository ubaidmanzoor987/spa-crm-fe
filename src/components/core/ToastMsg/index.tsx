import Image from "next/image";
import { COLORS } from "@/constants/colors";
import { Grid } from "@mui/material";
import { Description, GridStyle, ToastImage, Heading } from "./index.style";

export const ToastMsg = (props: any) => {
  const { closeToast, toastProps, description } = props;
  let bgColor = COLORS.GREEN_THEME;
  let icon = "/svgs/success.svg";
  let heading = "Success";

  if (toastProps.type === "error") {
    bgColor = COLORS.THEME_COLOR;
    icon = "/svgs/error.svg";
    heading = "Error";
  }
  if (toastProps.type === "success") {
    bgColor = COLORS.GREEN_THEME;
    icon = "/svgs/success.svg";
    heading = "Success";
  }
  console.log({ toastProps });
  return (
    <GridStyle container>
      <Grid item xs={2}>
        <ToastImage>
          <Image src={icon} width={25} height={25} />
        </ToastImage>
      </Grid>
      <Grid item xs={10}>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
      </Grid>
    </GridStyle>
  );
};
