import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

const FALLBACK = {
  question: "Who do you think will win the 2026 Tamil Nadu elections?",
  options: [
    { id: null, option_text: "DMK", votes: 420 },
    { id: null, option_text: "AIADMK", votes: 310 },
    { id: null, option_text: "BJP", votes: 95 },
    { id: null, option_text: "Others", votes: 175 },
  ],
};

export default function QuizWidget({ poll = null }) {
  const data = poll ?? FALLBACK;
  const options = (data.options || []).map((o) =>
    typeof o === "string"
      ? {
          id: null,
          option_text: o,
          votes: Math.floor(Math.random() * 300 + 50),
        }
      : o,
  );

  const [votes, setVotes] = useState(options.map((o) => o.votes ?? 0));
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!poll?.id) return;

    checkExistingVote();
  }, [poll?.id]);

  async function checkExistingVote() {
    try {
      setLoadingResults(true);

      const voteRes = await axios.get(
        `${API_URL}/news-poll/${poll.id}/check-vote`,
      );

      if (voteRes.data?.voted) {
        setHasVoted(true);

        const votedOptionId = voteRes.data?.data?.option_id;

        const selectedIndex = options.findIndex((o) => o.id === votedOptionId);

        if (selectedIndex !== -1) {
          setSelected(selectedIndex);
        }

        await fetchPollResults();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingResults(false);
    }
  }

  async function fetchPollResults() {
    try {
      const res = await axios.get(`${API_URL}/news-poll/${poll.id}/results`);

      const results = res.data?.data?.results || [];

      const updatedVotes = options.map((opt) => {
        const found = results.find((r) => r.id === opt.id);

        return found ? found.votes : 0;
      });

      setVotes(updatedVotes);
    } catch (err) {
      console.error(err);
    }
  }

  const total = votes.reduce((a, b) => a + b, 0);
  const voted = selected !== null;
  const maxVotes = Math.max(...votes);

  async function handleVote(i) {
    if (hasVoted || submitting) return;

    const optionId = options[i]?.id;

    if (!optionId) return;

    try {
      setSubmitting(true);
      setError("");

      await axios.post(`${API_URL}/news-poll/vote`, {
        poll_id: poll.id,
        option_ids: [optionId],
      });

      setSelected(i);
      setHasVoted(true);

      await fetchPollResults();
    } catch (err) {
      const msg = err?.response?.data?.message || "";

      if (msg.toLowerCase().includes("already")) {
        setHasVoted(true);

        await fetchPollResults();

        setError("You have already voted for this poll.");
      } else {
        setError(msg || "Failed to submit vote. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
        <span className="text-[9px] font-bold tracking-[0.16em] uppercase bg-red-600 text-white px-2 py-0.5">
          Poll
        </span>
        <span className="text-[11px] text-white/50">Cast your vote</span>
        <span className="ml-auto text-[10.5px] text-white/40 tabular-nums">
          {total.toLocaleString()} votes
        </span>
      </div>

      {/* Question */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-[14px] font-semibold text-white leading-snug">
          {data.question}
        </p>
      </div>

      {/* Options */}
      <div className="px-5 pb-4 flex flex-col gap-2 flex-1">
        {options.map((opt, i) => {
          const pct = total ? Math.round((votes[i] / total) * 100) : 0;
          const voted = hasVoted;
          const isVoted = selected === i;
          const isWinner = voted && votes[i] === maxVotes;

          return (
            <button
              key={i}
              disabled={hasVoted || submitting || loadingResults}
              onClick={() => handleVote(i)}
              className="relative w-full text-left overflow-hidden rounded disabled:cursor-default"
            >
              {/* Progress bar */}
              {voted && (
                <div
                  className={`absolute inset-y-0 left-0 rounded transition-all duration-700 ${
                    isWinner ? "bg-red-700/50" : "bg-white/[0.08]"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              )}

              <div
                className={`relative flex items-center justify-between px-3 py-2.5 border rounded transition-colors ${
                  voted
                    ? isVoted
                      ? "border-red-500 bg-white/5"
                      : "border-white/10"
                    : "border-white/20 bg-white/5 hover:border-red-500 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold rounded-full shrink-0 ${
                      isVoted
                        ? "bg-red-600 text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[12.5px] font-medium text-white/90 truncate">
                    {opt.option_text}
                  </span>
                  {isVoted && !submitting && (
                    <svg
                      className="w-3 h-3 text-red-400 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {isVoted && submitting && (
                    <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin shrink-0" />
                  )}
                </div>
                {voted && (
                  <span
                    className={`text-[12px] font-bold shrink-0 ml-2 tabular-nums ${
                      isWinner ? "text-red-400" : "text-white/50"
                    }`}
                  >
                    {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/10 mt-auto">
        {error ? (
          <p className="text-[11px] text-red-400">{error}</p>
        ) : (
          <p className="text-[11px] text-white/40">
            {voted
              ? "Thanks for voting! Results are live."
              : "Select an option to cast your vote"}
          </p>
        )}
      </div>
    </div>
  );
}
