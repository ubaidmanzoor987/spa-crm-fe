// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyRooms = React.lazy(() => import("@/components/pages-partials/rooms"));

// export default function Rooms() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyRooms />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicRooms = dynamic(() => import("@/components/pages-partials/rooms"), {
  ssr: false,
  loading: () => <FullPageLoader />,
});

export default function Rooms() {
  return <DynamicRooms />;
}
