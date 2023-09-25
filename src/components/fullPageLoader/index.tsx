import { Grid } from "@mui/material";
import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  Div,
  StyledBar,
  StyledButton,
  StyledGrid,
  StyledHeader,
  StyledMainGrid,
  StyledTable,
  WraperGrid,
} from "./index.style";
import SharedLayout from "../layout/shared-layout";

function FullPageSkeleton() {
  return (
    <StyledMainGrid>
      <Stack>
        <WraperGrid>
          <StyledGrid>
            <Grid>
              <StyledButton variant="rounded" width={120} height={43} />
            </Grid>
            <Grid>
              <Div>
                <StyledBar variant="rounded" width="100%" height={120} />
              </Div>
            </Grid>
            <Grid>
              <Div>
                <StyledTable variant="rounded" width="100%" height={330} />
              </Div>
            </Grid>
          </StyledGrid>
        </WraperGrid>
      </Stack>
    </StyledMainGrid>
  );
}

export default function FullPageLoader() {
  return <SharedLayout children={<FullPageSkeleton />} title={"Rooms"} />;
  // return (
  //   <StyledMainGrid>
  //     <Stack>
  //       <WraperGrid>
  //         <Grid>
  //           <Skeleton variant="rectangular" width={250} height={850} />
  //         </Grid>
  //         <Grid>
  //           <Grid>
  //             <StyledHeader variant="rectangular" width={1590} height={100} />
  //           </Grid>
  //           <Grid>
  //             <StyledButton variant="rounded" width={120} height={50} />
  //           </Grid>
  //           <Grid>
  //             <StyledBar variant="rounded" width={1470} height={100} />
  //           </Grid>
  //           <Grid>
  //             <StyledTable
  //               variant="rounded"
  //               width={1470}
  //               height={300}
  //             />
  //           </Grid>
  //         </Grid>
  //       </WraperGrid>
  //     </Stack>
  //   </StyledMainGrid>
  // );
}
