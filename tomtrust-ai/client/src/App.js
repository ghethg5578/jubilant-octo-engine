import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setReply("⚠️ Error: could not reach the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <h1 style={{ color: "#1e3a8a", marginBottom: "20px" }}>💬 TomTrust AI Assistant</h1>

      <textarea
        rows="5"
        cols="60"
        placeholder="Ask TomTrust AI anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          fontSize: "16px",
          width: "100%",
          maxWidth: "600px",
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 25px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      <div style={{
        marginTop: "20px",
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        textAlign: "left",
        minHeight: "100px"
      }}>
        <strong>Response:</strong>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {reply || (loading ? "Waiting for AI reply..." : "No response yet.")}
        </p>
      </div>
    </div>
  );
}

export default App;
