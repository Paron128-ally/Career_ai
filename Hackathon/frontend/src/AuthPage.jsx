import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, api, saveSession } from "./api.js";

const ROLES = [
  { id: "student", label: "Student", icon: "school" },
  { id: "fresher", label: "Fresher", icon: "rocket_launch" },
  { id: "working_professional", label: "Working Professional", icon: "work" },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [role, setRole] = useState("student");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSignIn() {
    setBusy(true);
    try {
      const data = await api("/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      saveSession(data);
      navigate("/dashboard");
    } catch (err) {
      window.alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSignUp() {
    setBusy(true);
    try {
      const data = await api("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,
          role,
        }),
      });
      if (data.needs_email_confirmation) {
        window.alert("Account created. Confirm your email, then sign in.");
        setTab("signin");
        return;
      }
      saveSession(data);
      navigate("/dashboard");
    } catch (err) {
      window.alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  function handleGoogle() {
    window.location.href = `${API_URL}/auth/google/start`;
  }

  return (
    <div className="flex h-full w-full">
      <div className="hidden md:flex flex-col w-1/2 h-full p-margin-desktop bg-[#F7F6F2] relative overflow-hidden">
        <div className="z-10 mb-auto">
          <span className="font-display-lg text-headline-md text-primary tracking-tight">CareerAI</span>
        </div>
        <div className="z-10 mt-auto pb-xl">
          <h1 className="font-display-lg text-display-lg text-primary mb-md max-w-[80%]">
            Your next career move starts here.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Leverage AI to map your skills, discover personalized pathways, and confidently step into your
            future.
          </p>
        </div>
        <div
          className="absolute right-0 bottom-0 w-3/4 h-3/4 opacity-40 mix-blend-multiply"
          data-alt="Abstract, minimal illustration representing career growth and artificial intelligence. Soft, warm ivory background with intersecting elegant geometric lines and gentle gradients in warm grays and subtle hints of deep violet. The style is modern, editorial, and highly professional, avoiding any cartoonish elements. Lighting is bright, soft, and diffuse, fitting seamlessly into a high-end corporate application."
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvdhHVsB7Aj9uC_DoLk--iHXA-OW12Slh3QZd3jHo3wyRUzuOd5_c0LLZCaMFRkMXdn5YhzRD9rSqKteuohY6OghK1_mnBx46RTztj0Eo6-kDhMDiPx6RPkk8BNxyeBA41jG1s2mm8ZodTfn4aup0XzqtJLPsBq-jhWDhol3fHC9BsH7CtwQtU0Jt3KAayW3e9nDwjwKbJuetJpAsTSIfXVQsDS0oHP0WfNMy5KPUW4Ce1Z1LG2pi5')",
          }}
        ></div>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-margin-mobile md:p-margin-desktop bg-surface relative z-20 md:rounded-l-[32px] md:shadow-[-12px_0_40px_rgba(24,25,28,0.04)] overflow-y-auto">
        <div className="md:hidden w-full max-w-[440px] mb-8 text-center">
          <span className="font-display-lg text-headline-md text-primary tracking-tight">CareerAI</span>
        </div>
        <div className="w-full max-w-[440px] bg-surface-container-lowest border border-outline-variant rounded-[12px] p-lg">
          <div className="flex w-full mb-8 border-b border-outline-variant">
            <button
              className={`flex-1 pb-3 text-center font-button text-button ${tab === "signin" ? "auth-tab-active" : "auth-tab-inactive"}`}
              type="button"
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 pb-3 text-center font-button text-button ${tab === "signup" ? "auth-tab-active" : "auth-tab-inactive"}`}
              type="button"
              onClick={() => setTab("signup")}
            >
              Create Account
            </button>
          </div>
          <form
            className={`${tab === "signin" ? "flex" : "hidden"} flex-col gap-6`}
            id="signin-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <div>
              <label className="block font-label-sm text-label-sm text-primary mb-xs">Email Address</label>
              <input
                className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="name@example.com"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-xs">
                <label className="block font-label-sm text-label-sm text-primary">Password</label>
                <a
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <input
                className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="••••••••"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full h-12 mt-2 bg-primary text-on-primary rounded-full font-button text-button hover:bg-on-surface transition-colors flex items-center justify-center"
              type="button"
              disabled={busy}
              onClick={handleSignIn}
            >
              Continue
            </button>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-on-surface-variant">or</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>
            <button
              className="w-full h-12 bg-transparent text-primary border border-primary rounded-full font-button text-button hover:bg-surface-container-low transition-colors flex items-center justify-center gap-3"
              type="button"
              disabled={busy}
              onClick={handleGoogle}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              Continue with Google
            </button>
          </form>
          <form
            className={`${tab === "signup" ? "flex" : "hidden"} flex-col gap-6`}
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <div className="mb-2">
              <label className="block font-label-sm text-label-sm text-primary mb-3">
                What best describes you?
              </label>
              <div className="grid grid-cols-1 gap-3">
                {ROLES.map((item) => {
                  const active = role === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`${active ? "role-card-active" : "role-card-inactive"} border rounded-xl p-4 flex items-center cursor-pointer transition-colors${active ? "" : " hover:border-outline"}`}
                      onClick={() => setRole(item.id)}
                    >
                      <span
                        className={`material-symbols-outlined mr-3 ${active ? "text-primary" : "text-on-surface-variant"}`}
                        data-icon={item.icon}
                      >
                        {item.icon}
                      </span>
                      <div className="flex-grow">
                        <h4
                          className={`font-button text-button ${active ? "text-primary" : "text-on-surface-variant"}`}
                        >
                          {item.label}
                        </h4>
                      </div>
                      <span
                        className={`material-symbols-outlined ${active ? "text-primary" : "text-transparent"} check-icon`}
                        data-icon="check_circle"
                      >
                        check_circle
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-primary mb-xs">Email Address</label>
              <input
                className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="name@example.com"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-primary mb-xs">Create Password</label>
              <input
                className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Min. 8 characters"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            <button
              className="w-full h-12 mt-2 bg-primary text-on-primary rounded-full font-button text-button hover:bg-on-surface transition-colors flex items-center justify-center"
              type="button"
              disabled={busy}
              onClick={handleSignUp}
            >
              Create Account
            </button>
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-2">
              By signing up, you agree to our <a className="text-primary underline" href="#">Terms</a> &{" "}
              <a className="text-primary underline" href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
