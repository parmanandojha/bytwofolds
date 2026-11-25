"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { site } from "@/lib/content";
import { Arrow } from "./ui";

type Msg = { role: "user" | "assistant"; content: string };
const hello = "Hello. I am the automated assistant for this site. Ask me about our services, process or work. If I do not know, I can pass your question to a person.";
const starters = ["What do you do?", "How does the process work?", "Show me your work"];
const wantsPerson = /\b(price|pricing|cost|quote|budget|hire|call|contact|talk|speak|human|person|start|project|meeting|email|phone)\b/i;
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Turns site paths in an answer into links. Text is rendered as text, never as HTML. */
function Linked({ text, onGo }: { text: string; onGo: () => void }) {
  return text.split(/((?<![\w/.:])\/(?:services|work|process|about|contact|privacy)(?:\/[a-z0-9-]+)?)/g).map((t, i) =>
    i % 2 ? <Link key={i} href={t} onClick={onGo} className="underline underline-offset-4">{t}</Link> : t,
  );
}

const field = "w-full border-b border-ink/60 bg-transparent py-2 text-base placeholder:text-ink/60";

export function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState<"chat" | "lead" | "sent">("chat");
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  const close = () => { setOpen(false); launcher.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    if (!calm()) {
      animate(panel.current!, { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"], duration: 600, ease: "outExpo" });
      animate(panel.current!.querySelectorAll("[data-in]"), { y: [16, 0], opacity: [0, 1], duration: 500, ease: "outQuad", delay: stagger(60, { start: 150 }) });
    }
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [msgs, view, open]);

  async function ask(q: string) {
    q = q.trim();
    if (!q || busy) return;
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    let text = "";
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
      if (!res.ok && res.status !== 429) throw new Error();
      const reader = res.body!.getReader(), dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
        setMsgs([...history, { role: "assistant", content: text }]);
      }
      if (!text) throw new Error();
    } catch {
      setMsgs([...history, { role: "assistant", content: text || "I could not connect just now. Please try again, or leave your details and a person will reply." }]);
    }
    setBusy(false);
  }

  async function sendLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "chat", transcript: msgs.map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`).join("\n\n").slice(-8000) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setView("sent");
    } catch (x) {
      setError(x instanceof Error && x.message ? x.message : "Your message did not go through.");
    }
    setBusy(false);
  }

  const asked = msgs.filter((m) => m.role === "user");
  const offer = !busy && view === "chat" && asked.length > 0 && (asked.length >= 2 || wantsPerson.test(asked.at(-1)!.content) || /would rather not guess/.test(msgs.at(-1)!.content));

  return (
    <div className={`fixed right-4 bottom-4 tab:right-6 tab:bottom-6 ${open ? "z-[60]" : "z-30"}`}>
      <button
        ref={launcher}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="chat"
        className={`label group flex h-12 items-center gap-3 bg-white px-4 text-ink shadow-lg shadow-black/40 transition-colors duration-300 hover:bg-signal hover:text-white ${open ? "invisible" : ""}`}
      >
        <span className="size-2 rounded-full bg-signal group-hover:bg-white" aria-hidden="true" />
        Ask us
      </button>

      {open && (
        <div
          id="chat"
          ref={panel}
          role="dialog"
          aria-label={`Chat with the ${site.name} assistant`}
          className="fixed inset-x-2 bottom-2 z-[60] flex h-[min(40rem,calc(100dvh-1rem))] flex-col bg-mist text-ink shadow-2xl shadow-black/50 tab:inset-x-auto tab:right-6 tab:bottom-6 tab:w-96 tab:h-[min(40rem,calc(100dvh-3rem))]"
        >
          <div className="flex items-center justify-between bg-ink py-2 pr-2 pl-6 text-white">
            <p className="label flex items-center gap-2"><span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />Ask {site.name}</p>
            <button onClick={close} className="grid size-10 place-items-center hover:bg-white/15" aria-label="Close chat">
              <svg viewBox="0 0 14 14" className="size-3.5" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m2 2 10 10M12 2 2 12" /></svg>
            </button>
          </div>

          {view === "chat" ? (
            <>
              <div ref={log} data-lenis-prevent className="flex grow flex-col gap-4 overflow-y-auto overscroll-contain p-6" role="log" aria-live="polite" aria-busy={busy}>
                <p data-in className="max-w-[85%] text-base leading-snug">{hello}</p>
                {!msgs.length && (
                  <div className="flex flex-col items-start gap-2">
                    {starters.map((s) => <button data-in key={s} onClick={() => ask(s)} className="border border-ink/50 px-4 py-2 text-left text-sm transition-colors hover:bg-ink hover:text-white">{s}</button>)}
                  </div>
                )}
                {msgs.map((m, i) => (
                  <p key={i} className={`max-w-[85%] text-base leading-snug whitespace-pre-wrap wrap-anywhere ${m.role === "user" ? "self-end bg-ink px-4 py-2 text-white" : ""}`}>
                    <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                    {m.content ? (m.role === "user" ? m.content : <Linked text={m.content} onGo={() => setOpen(false)} />) : <span className="animate-pulse">Thinking</span>}
                  </p>
                ))}
                {offer && <button onClick={() => setView("lead")} className="label self-start bg-signal px-4 py-4 text-ink transition-colors hover:bg-ink hover:text-white">Leave your details</button>}
              </div>
              <form
                className="flex items-center gap-2 border-t border-ink/20 p-2"
                onSubmit={(e) => { e.preventDefault(); if (busy) return; const el = input.current!; ask(el.value); el.value = ""; }}
              >
                <input ref={input} aria-label="Your question" placeholder="Type your question" maxLength={600} autoComplete="off" className="min-w-0 grow bg-transparent px-4 py-4 text-base placeholder:text-ink/60" />
                <button disabled={busy} aria-label="Send question" className="grid size-12 shrink-0 place-items-center bg-ink text-white transition-colors hover:bg-signal disabled:opacity-50"><Arrow /></button>
              </form>
              <p className="flex justify-between gap-4 px-6 pb-4 text-xs">
                <span>Automated answers. Check anything important.</span>
                <button onClick={() => setView("lead")} className="shrink-0 underline underline-offset-4">Reach a person</button>
              </p>
            </>
          ) : view === "lead" ? (
            <form onSubmit={sendLead} data-lenis-prevent className="flex grow flex-col gap-6 overflow-y-auto overscroll-contain p-6">
              <p className="text-lead snug">Leave your question. A person will write back.</p>
              <label className="text-sm">Your name<input autoFocus className={field} name="name" required maxLength={120} autoComplete="name" /></label>
              <label className="text-sm">Email<input className={field} name="email" type="email" required maxLength={200} autoComplete="email" /></label>
              <label className="text-sm">Your question<textarea className={`${field} min-h-24 resize-y`} name="message" required maxLength={2000} defaultValue={asked.at(-1)?.content} /></label>
              <label className="absolute -left-[9999px]" aria-hidden="true">Leave empty<input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
              <p className="text-xs">We send your details and this chat to our team so they can reply. <Link href="/privacy" onClick={() => setOpen(false)} className="underline underline-offset-4">Privacy</Link></p>
              {error && <p role="alert" className="border-l-4 border-signal pl-4 text-sm">{error} You can write to <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>}
              <div className="mt-auto flex gap-2">
                <button type="button" onClick={() => setView("chat")} className="label h-12 px-4 underline underline-offset-4">Back</button>
                <button disabled={busy} className="label h-12 grow bg-ink text-white transition-colors hover:bg-signal disabled:opacity-60">{busy ? "Sending" : "Send question"}</button>
              </div>
            </form>
          ) : (
            <div className="flex grow flex-col justify-between p-6">
              <p role="status" className="text-title tight">Thank you. Your question is with a person now.</p>
              <button onClick={() => setView("chat")} className="label h-12 bg-ink text-white hover:bg-signal">Back to chat</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
