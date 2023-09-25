// import FullPageLoader from "@/components/fullPageLoader";
// import React, { Suspense } from "react";

// const LazyLogin = React.lazy(() => import("@/components/pages-partials/login"));

// export default function Login() {
//   return (
//     <Suspense fallback={<FullPageLoader />}>
//       <LazyLogin />
//     </Suspense>
//   );
// }

import React from "react";
import dynamic from "next/dynamic";
import FullPageLoader from "@/components/fullPageLoader";

const DynamicLogin = dynamic(
  () => import("@/components/pages-partials/login"),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  }
);

export default function Login() {
  return <DynamicLogin />;
}
