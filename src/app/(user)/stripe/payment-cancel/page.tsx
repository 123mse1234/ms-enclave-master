import { Suspense } from "react";
import PaymentCancelPage from "./PaymentCancelContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCancelPage />
    </Suspense>
  );
}
