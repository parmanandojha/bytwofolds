import "server-only";
import nodemailer from "nodemailer";
import { site } from "./content";

export type Lead = {
  source: "form" | "chat";
  name: string; email: string; website: string; message: string;
  services: string[]; campaign: Record<string, string>; transcript: string; receivedAt: string;
};

export const mailReady = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.INQUIRY_EMAIL_TO);
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function mailLead(lead: Lead) {
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com", port, secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
  });
  const rows = ([
    ["Name", lead.name], ["Email", lead.email], ["Website", lead.website], ["Needs", lead.services.join(", ")],
    ["Message", lead.message], ["Campaign", Object.entries(lead.campaign).map(([k, v]) => `${k}: ${v}`).join("\n")],
    ["Chat before this", lead.transcript], ["Came from", lead.source === "chat" ? "Chat assistant" : "Contact form"], ["Received", lead.receivedAt],
  ] as const).filter(([, v]) => v);
  await transport.sendMail({
    from: { name: `${site.name} website`, address: process.env.SMTP_USER! },
    to: process.env.INQUIRY_EMAIL_TO,
    replyTo: { name: oneLine(lead.name), address: lead.email },
    subject: oneLine(`New ${lead.source === "chat" ? "chat query" : "inquiry"} from ${lead.name}`),
    text: rows.map(([k, v]) => `${k}:\n${v}`).join("\n\n"),
    html: `<table cellpadding="10" style="font:15px/1.5 sans-serif;border-collapse:collapse">${rows.map(([k, v]) => `<tr style="border-top:1px solid #ddd"><td style="color:#666;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}</table>`,
  });
}
