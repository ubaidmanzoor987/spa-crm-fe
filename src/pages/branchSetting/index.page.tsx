// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyBooking = React.lazy(
//   () => import("@/components/pages-partials/booking")
// );

// export default function Booking() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyBooking />
//     </Suspense>
//   );
// }

import BranchSettingLoader from "@/components/core/BranchSettingPageLoader";
import FullPageLoader from "@/components/fullPageLoader";
import dynamic from "next/dynamic";
import React from "react";

const DynamicBranchSetting = dynamic(
  () => import("@/components/pages-partials/branchSetting"),
  {
    ssr: false,
    loading: () => <BranchSettingLoader />,
  }
);

export default function BranchSetting() {
  return <DynamicBranchSetting />;
}
