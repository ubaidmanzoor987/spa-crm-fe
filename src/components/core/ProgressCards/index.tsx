import * as React from "react";
import CircularProgress from "../CircularProgressBar";
import Card from "@mui/material/Card";
import {
  CardContentStyle,
  FlexColumn,
  FlexRow,
  TypographyStyle,
} from "./index.style";
import { COLORS } from "@/constants/colors";

type CardProps = {
  heading: string;
  number: number;
  range: number;
  color: string;
};

export default function ProgressCards(props: CardProps) {
  const { heading, number, range, color } = props;
  return (
    <Card
      sx={{
        borderRadius: "15px",
      }}
    >
      <CardContentStyle>
        <FlexColumn>
          <TypographyStyle color={color} marginBottom={3}>{heading}</TypographyStyle>
          <FlexRow>
            <TypographyStyle color={COLORS.BLACK_100}>{number}</TypographyStyle>
            <CircularProgress value={range} colors={color} />
          </FlexRow>
        </FlexColumn>
      </CardContentStyle>
    </Card>
  );
}
