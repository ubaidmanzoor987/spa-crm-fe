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

import FullPageLoader from "@/components/fullPageLoader";
import dynamic from "next/dynamic";
import React from "react";

const DynamicBooking = dynamic(
  () => import("@/components/pages-partials/booking"),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  }
);

export default function Booking() {
  return <DynamicBooking />;
}
