import * as React from "react";
import Card from "@mui/material/Card";
import {
  CardContentStyle,
  FlexColumn,
  FlexRow,
  TypographyStyle,
  DIV,
  DivButton,
} from "./index.style";
import { COLORS } from "@/constants/colors";
import { Divider } from "@mui/material";

type CardProps = {
  heading: string;
};

export default function BookingServise(props: CardProps) {
  const { heading } = props;

  return (
    <Card
      sx={{
        borderRadius: "15px",
      }}
    >
      <CardContentStyle>
        <FlexColumn>
          <FlexRow>
            <TypographyStyle color={COLORS.BLACK_100} marginBottom={2}>
              {heading ? heading : "Top Booking Services"}
            </TypographyStyle>
            <DIV />
              
          </FlexRow>
          <Divider />
          <div style={{ paddingBlock: "10rem" }}></div>
        </FlexColumn>
      </CardContentStyle>
    </Card>
  );
}
