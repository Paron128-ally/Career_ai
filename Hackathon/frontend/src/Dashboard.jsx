import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getAccessToken } from "./api.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/");
      return;
    }
    api("/auth/me")
      .then(setData)
      .catch((err) => setError(err.message));
  }, [navigate]);

  function signOut() {
    localStorage.removeItem("careerai_access_token");
    localStorage.removeItem("careerai_refresh_token");
    localStorage.removeItem("careerai_user");
    navigate("/");
  }

  return (
    <div className="h-full flex items-center justify-center p-8 bg-[#F7F6F2]">
      <div className="w-full max-w-[440px] bg-surface-container-lowest border border-outline-variant rounded-[12px] p-lg">
        <h1 className="font-headline-md text-headline-md text-primary mb-md">CareerAI</h1>
        {error ? <p className="font-body-md text-error mb-md">{error}</p> : null}
        {data ? (
          <div className="font-body-md text-on-surface-variant flex flex-col gap-2">
            <p>Signed in as {data.user?.email}</p>
            <p>Role: {data.user?.role || data.profile?.role || "—"}</p>
          </div>
        ) : (
          <p className="font-body-md text-on-surface-variant">Verifying session with Supabase...</p>
        )}
        <button
          className="w-full h-12 mt-6 bg-primary text-on-primary rounded-full font-button text-button"
          type="button"
          onClick={signOut}
        >
          Sign out
        </button>
        <p className="mt-4">
          <Link className="font-label-sm text-label-sm text-primary underline" to="/">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
