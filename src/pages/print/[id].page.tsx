import PrintForm from "@/components/pages-partials/print";
import { useRouter } from "next/router";

export default function Current() {
  const router = useRouter();
  const { id } = router.query;
  return <PrintForm id={id}/>;
}
