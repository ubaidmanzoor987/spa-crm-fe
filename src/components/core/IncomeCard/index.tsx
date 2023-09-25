import * as React from "react";

import Card from "@mui/material/Card";
import {
  CardContentStyle,
  FlexColumn,
  FlexRow,
  TypographyStyle,
  SubTypographyStyle,
  FlexCol,
  P,
} from "./index.style";
import { COLORS } from "@/constants/colors";

type CardProps = {
  heading: string;
  Tincome: number;
  Tdue: number;
  Tcash: number;
  Tonline: number;
};

export default function IncomeCard(props: CardProps) {
  const { heading, Tincome, Tdue, Tcash, Tonline } = props;
  return (
    <Card
      sx={{
        borderRadius: "15px",
      }}
    >
      <CardContentStyle>
        <FlexColumn>
          <TypographyStyle color={COLORS.BLACK_100} marginBottom={2}>
            {heading}
          </TypographyStyle>

          <FlexRow>
            <FlexCol>
              <div>
                <SubTypographyStyle color={COLORS.GREEN_THEME}>
                  Total Income
                </SubTypographyStyle>
                <P>{Tincome ? Tincome : "0.00"}</P>
              </div>
              <div>
                <SubTypographyStyle color={"#F05F97"}>
                  Total Due
                </SubTypographyStyle>
                <P>{Tdue ? Tdue : "0.00"}</P>
              </div>
            </FlexCol>
            <FlexCol>
              <div>
                <SubTypographyStyle color={COLORS.GREEN_THEME}>
                Total Cash Payment
                </SubTypographyStyle>
                <P>{Tcash ? Tcash : "0.00"}</P>
              </div>
              <div>
                <SubTypographyStyle color={"#F05F97"}>
                Total Online Payment
                </SubTypographyStyle>
                <P>{Tonline ? Tonline : "0.00"}</P>
              </div>
            </FlexCol>
          </FlexRow>
        </FlexColumn>
      </CardContentStyle>
    </Card>
  );
}
