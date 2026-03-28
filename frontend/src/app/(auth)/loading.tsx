import Spinner from "@/shared/components/ui/spinner/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spinner size="lg" />
    </div>
  );
}
