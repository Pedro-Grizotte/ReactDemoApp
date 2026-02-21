import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/state/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

// For demo purposes, I hardcoded a valid phone number.
const VALID_PHONE = "+254712345678";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [phoneInput, setPhoneInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/main" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = phoneInput.trim();
    if (!trimmed) { setError("Phone number is required."); return; }
    if (!trimmed.startsWith("+254")) { setError("Phone must start with +254."); return; }
    if (trimmed !== VALID_PHONE) { setError("Invalid phone number. Use +254712345678."); return; }
    setSubmitting(true);

    setTimeout(() => {
      login(trimmed);
      navigate("/main");
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Phone className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your phone number to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl border bg-card p-6 card-shadow space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneInput}
                onChange={(e) => {
                  setPhoneInput(e.target.value);
                  setError(null);
                }}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Example: +257658456732
              </p>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={submitting}>
              {submitting ? "Signing in…" : "Login"}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Valid demo login: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">+254712345678</code>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
