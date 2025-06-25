import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";   // ✨ גם אייקון סגור
import axios from "axios";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  /* --- state --- */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPwd,  setShowPwd]  = useState(false);   // ברור יותר

  /* אם יש כבר טוקן – דלג למסך הניהול */
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/orders");
    }
  }, [navigate]);

  /* --- שליחת טופס --- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/Admin/login", {
        username,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/orders");
    } catch {
      setError("שם משתמש או סיסמה שגויים");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>התחברות מנהל</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* בועת הסיסמה */}
        <div className="password-container">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="password-input"
          />
          {/* האייקון מחליף צורה ולוחצים עליו */}
          {showPwd ? (
            <FaEyeSlash
              className="eye-icon"
              onClick={() => setShowPwd(false)}
              aria-label="הסתר סיסמה"
            />
          ) : (
            <FaEye
              className="eye-icon"
              onClick={() => setShowPwd(true)}
              aria-label="הצג סיסמה"
            />
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "טוען..." : "התחבר"}
        </button>
      </form>
    </div>
  );
}
