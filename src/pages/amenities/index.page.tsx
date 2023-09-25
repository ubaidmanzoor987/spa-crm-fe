// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyAmenities = React.lazy(
//   () => import("@/components/pages-partials/amenities")
// );

// export default function Amenities() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyAmenities />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicAmenities = dynamic(
  () => import("@/components/pages-partials/amenities"),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  }
);

export default function Amenities() {
  return <DynamicAmenities />;
}
