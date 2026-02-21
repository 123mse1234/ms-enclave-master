import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
