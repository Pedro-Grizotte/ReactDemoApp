import { Loader2 } from "lucide-react";

const LoadingState = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export default LoadingState;
