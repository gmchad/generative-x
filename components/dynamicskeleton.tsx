import { Skeleton } from "@/components/ui/skeleton";

export default function DynamicSkeleton() {
  return (
    <div className="flex border-b border-gray-700 bg-black p-4">
      {/*<div className="flex flex-col">*/}
      {/*<div className="flex items-center">*/}
      {/*	<Skeleton className="h-5 w-72 rounded-md" />*/}
      {/*</div>*/}
      <div className="flex w-72 items-center ">
        <Skeleton className="h-48 w-72 rounded-md" />
      </div>
      {/*</div>*/}
    </div>
  );
}
