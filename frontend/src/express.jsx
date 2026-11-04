
import React, { useState } from "react";
import "./express.css";

function Express() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setLoading(true);
    setReply("");

    setTimeout(() => {
      setReply(
        "Thank you for opening up."
      );

      setLoading(false);
    }, 1000);
  };

  const startAgain = () => {
    setMessage("");
    setReply("");
  };

  return (
    <div className="soothe-feelings-page">
      <div className="soothe-feelings-container">

        <div className="soothe-feelings-header">
          <span className="soothe-label">SOOTHE · YOUR SAFE SPACE</span>

          <h1>What's on your mind?</h1>

          <p>
            Sometimes, putting your feelings into words can help.
            Take your time. We're here to listen.
          </p>
        </div>

        <div className="soothe-chat-card">

          <div className="soothe-welcome">
            <span className="soothe-heart">💜</span>

            <h2>Hey, I'm here for you.</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="feeling-message">
              Tell me how you're feeling
            </label>

            <textarea
              id="feeling-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I've been feeling a little low lately because..."
              rows={7}
              required
            />

            <div className="soothe-input-footer">
              <span>Your feelings matter. Take your time.</span>

              <span>{message.length} characters</span>
            </div>

            <button
              type="submit"
              className="soothe-submit-button"
              disabled={loading || !message.trim()}
            >
              {loading ? "Soothe is listening..." : "Talk to Soothe →"}
            </button>
          </form>

          {loading && (
            <div className="soothe-loading">
              <span>💜</span>
              <p>Taking a moment to understand...</p>
            </div>
          )}

          {reply && (
            <div className="soothe-reply">
              <div className="soothe-reply-heading">
                <span>💜</span>
                <h3>A message for you</h3>
              </div>

              <p>{reply}</p>

              <button
                type="button"
                onClick={startAgain}
                className="soothe-again-button"
              >
                Share something else
              </button>
            </div>
          )}

        </div>

        <div className="soothe-bottom-note">
          <p>
            A little reminder: You deserve kindness, especially from yourself.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Express;
