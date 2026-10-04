import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, saveSession } from "./api.js";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Completing Google sign-in...");

  useEffect(() => {
    async function run() {
      const params = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const code = params.get("code");
      const accessToken = hash.get("access_token");
      const error = params.get("error_description") || params.get("error") || hash.get("error_description");

      if (error) {
        setMessage(error);
        return;
      }

      try {
        if (code) {
          const data = await api("/auth/google/exchange", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ code }),
          });
          saveSession(data);
          navigate("/dashboard");
          return;
        }

        if (accessToken) {
          saveSession({
            access_token: accessToken,
            refresh_token: hash.get("refresh_token") || "",
            user: {},
          });
          await api("/auth/me");
          navigate("/dashboard");
          return;
        }

        setMessage("No OAuth code returned. Check Google provider settings in Supabase.");
      } catch (err) {
        setMessage(err.message);
      }
    }
    run();
  }, [navigate]);

  return (
    <div className="h-full flex items-center justify-center p-8">
      <p className="font-body-md text-on-surface-variant">{message}</p>
    </div>
  );
}
