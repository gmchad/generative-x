import TwitterList from "@/components/twitter-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-2 bg-black">
      <TwitterList/>
    </main>
  );
}
