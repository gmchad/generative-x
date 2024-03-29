import { Suspense } from "react";
import TwitterList from "@/components/twitter-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Suspense>
        <TwitterList />
      </Suspense>
    </main>
  );
}
