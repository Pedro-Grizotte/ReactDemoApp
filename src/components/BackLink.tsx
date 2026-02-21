import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label?: string;
}

const BackLink = ({ to, label = "Back" }: BackLinkProps) => (
  <Link
    to={to}
    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
  >
    <ArrowLeft className="h-4 w-4" />
    {label}
  </Link>
);

export default BackLink;
