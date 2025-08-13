import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Sparkles,
  Download,
  Wand2,
  RefreshCw,
  Upload,
  FileJson,
  Palette,
  Bot,
  LayoutTemplate,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  RotateCcw,
  Star,
  X,
} from "lucide-react";

/**
 * ULTIMATE RESUME BUILDER - ENHANCED UI
 * - Modern glassmorphism UI with smooth animations
 * - Improved AI integration with visual feedback
 * - Enhanced template previews with theme switching
 * - ATS score visualization with progress bar
 * - Better mobile responsiveness
 */

const THEMES = [
  { id: "sky", name: "Sky", primary: "#0ea5e9", text: "#0f172a", subtle: "#e0f2fe" },
  { id: "violet", name: "Violet", primary: "#7c3aed", text: "#0f172a", subtle: "#ede9fe" },
  { id: "emerald", name: "Emerald", primary: "#10b981", text: "#064e3b", subtle: "#d1fae5" },
  { id: "rose", name: "Rose", primary: "#f43f5e", text: "#111827", subtle: "#ffe4e6" },
  { id: "slate", name: "Slate", primary: "#334155", text: "#0f172a", subtle: "#e2e8f0" },
  { id: "amber", name: "Amber", primary: "#f59e0b", text: "#451a03", subtle: "#fef3c7" },
];

const STARTER = {
  name: "Abhishek Singh",
  title: "Full‑Stack Developer (MERN)",
  email: "abhishek@example.com",
  phone: "+91 98765 43210",
  address: "Lucknow, UP, India",
  summary:
    "Full‑stack developer focusing on performant, accessible web apps. 2+ years with MERN, CI/CD, testing, and DX love.",
  projects: `GymX — AI lead-gen gym website with animated UI, payment links, and admin analytics.\nTaskTracker — Multi-user task app with JWT auth, Stripe/UPI, and real-time updates.`,
  education: "M.Tech (AI & DS), AKTU — 2025",
  technicalSkills:
    "JavaScript, TypeScript, React, Redux/Zustand, Tailwind, Node.js, Express, MongoDB, PostgreSQL, Prisma/Sequelize, Firebase, Stripe, REST, WebSockets, Docker, Git, Testing",
  activities: "Writing, Open-source, Hackathons, Fitness",
  conclusion: "I hereby declare that the details above are true to the best of my knowledge.",
  links: [
    { label: "Portfolio", url: "https://example.dev" },
    { label: "GitHub", url: "https://github.com/abhi" },
    { label: "LinkedIn", url: "https://linkedin.com/in/abhi" },
  ],
};

const defaultSections = [
  { id: "summary", label: "Summary" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "activities", label: "Activities" },
  { id: "declaration", label: "Declaration" },
];

function chip(text, theme) {
  return (
    <span 
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border shadow-sm"
      style={{ 
        background: theme.subtle, 
        borderColor: theme.primary,
        color: theme.text
      }}
    >
      {text}
    </span>
  );
}

function SectionHeader({ title, accent }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-5 w-1.5 rounded-full" style={{ background: accent }} />
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

// ---------- AI LAYER (Gemini integration) ----------
async function aiComplete({ provider, apiKey, system, prompt }) {
  // Use Gemini API
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          parts: [{ 
            text: `${system}\n\n${prompt}` 
          }] 
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      }),
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    })
    .catch(error => {
      console.error("AI Error:", error);
      return "(AI service unavailable)";
    });
}

// ---------- TEMPLATES ----------
function TemplatePro({ data, theme }) {
  const accent = theme.primary;
  const techList = (data.technicalSkills || "").split(",").map((s) => s.trim()).filter(Boolean);
  const actList = (data.activities || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[794px] min-h-[1123px] p-8 rounded-2xl shadow-xl border border-black/5" style={{ color: theme.text }}>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: accent }}>
          {data.name}
        </h1>
        <p className="text-lg opacity-80">{data.title}</p>
        <div className="flex justify-center gap-3 text-sm mt-2 opacity-80 flex-wrap">
          {chip(data.email, theme)} {chip(data.phone, theme)} {chip(data.address, theme)}
        </div>
        {data.links?.length ? (
          <div className="flex justify-center flex-wrap gap-2 mt-2">
            {data.links.map((l, i) => (
              <a key={i} href={l.url} className="text-xs underline opacity-90" target="_blank" rel="noreferrer" style={{ color: accent }}>
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left rail */}
        <div className="col-span-1 space-y-6">
          <div>
            <SectionHeader title="Skills" accent={accent} />
            <ul className="text-sm leading-6 list-disc pl-5">
              {techList.map((sk, i) => (
                <li key={i}>{sk}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader title="Education" accent={accent} />
            <p className="text-sm whitespace-pre-line leading-6">{data.education}</p>
          </div>
          <div>
            <SectionHeader title="Activities" accent={accent} />
            <ul className="text-sm leading-6 list-disc pl-5">
              {actList.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main */}
        <div className="col-span-2 space-y-6">
          <div>
            <SectionHeader title="Summary" accent={accent} />
            <p className="text-sm leading-7 whitespace-pre-line">{data.summary}</p>
          </div>
          <div>
            <SectionHeader title="Projects" accent={accent} />
            <ul className="text-sm leading-7 list-disc pl-5 whitespace-pre-line">
              {(data.projects || "").split("\n").map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader title="Declaration" accent={accent} />
            <p className="text-sm leading-7 whitespace-pre-line">{data.conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateMinimal({ data, theme }) {
  const accent = theme.primary;
  const techList = (data.technicalSkills || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="bg-white w-[794px] min-h-[1123px] p-10 rounded-xl shadow-xl border border-black/5" style={{ color: theme.text }}>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: accent }}>{data.name}</h1>
          <p className="opacity-80">{data.title}</p>
        </div>
        <div className="text-right text-sm opacity-80">
          <div>{data.email}</div>
          <div>{data.phone}</div>
          <div>{data.address}</div>
        </div>
      </div>

      <div className="h-1 w-full my-6 rounded" style={{ background: accent }} />

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Summary</h3>
            <p className="text-sm whitespace-pre-line leading-7">{data.summary}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Projects</h3>
            <ul className="text-sm list-disc pl-5 whitespace-pre-line">
              {(data.projects || "").split("\n").map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {techList.map((sk, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-1 rounded border" 
                  style={{ 
                    borderColor: theme.primary,
                    background: theme.subtle
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Education</h3>
            <p className="text-sm whitespace-pre-line leading-7">{data.education}</p>
          </div>
        </div>
      </div>

      {data.links?.length ? (
        <div className="mt-8 text-sm flex flex-wrap gap-3 opacity-90">
          {data.links.map((l, i) => (
            <a 
              key={i} 
              className="underline" 
              href={l.url} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: accent }}
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TemplateCreative({ data, theme }) {
  const accent = theme.primary;
  const techList = (data.technicalSkills || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 w-[794px] min-h-[1123px] p-8 rounded-3xl shadow-2xl border border-black/5 relative overflow-hidden" style={{ color: theme.text }}>
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-2xl opacity-40" style={{ background: accent }} />
      <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full blur-2xl opacity-30" style={{ background: theme.subtle }} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight" style={{ color: accent }}>{data.name}</h1>
          <p className="opacity-80">{data.title}</p>
        </div>
        <div className="flex flex-col items-end text-sm">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.address}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div>
            <SectionHeader title="About" accent={accent} />
            <p className="text-sm leading-7 whitespace-pre-line">{data.summary}</p>
          </div>
          <div>
            <SectionHeader title="Showcase" accent={accent} />
            <ul className="text-sm leading-7 list-disc pl-5 whitespace-pre-line">
              {(data.projects || "").split("\n").map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <SectionHeader title="Toolkit" accent={accent} />
            <div className="flex flex-wrap gap-2">
              {techList.map((sk, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-1 rounded-full border"
                  style={{ 
                    background: theme.subtle,
                    borderColor: theme.primary
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Education" accent={accent} />
            <p className="text-sm whitespace-pre-line leading-7">{data.education}</p>
          </div>
        </div>
      </div>

      {data.links?.length ? (
        <div className="mt-8 text-sm flex flex-wrap gap-3">
          {data.links.map((l, i) => (
            <a 
              key={i} 
              className="underline" 
              href={l.url} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: accent }}
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ---------- MAIN COMPONENT ----------
export default function UltimateResumeBuilder() {
  const [template, setTemplate] = useState("pro"); 
  const [themeId, setThemeId] = useState("sky");
  const theme = useMemo(() => THEMES.find((t) => t.id === themeId) || THEMES[0], [themeId]);

  const [data, setData] = useState(STARTER);
  const [sections, setSections] = useState(defaultSections);
  const [jd, setJd] = useState("");
  const [aiProvider, setAiProvider] = useState("gemini");
  const [apiKey, setApiKey] = useState("AIzaSyCpgaSyevRj5gq5Cz4rsN_4ro2OFOrArQk");
  const [busy, setBusy] = useState(false);
  const [busyAction, setBusyAction] = useState("");
  const [ats, setAts] = useState({ score: 0, missing: [] });
  const [aiStatus, setAiStatus] = useState({ type: "", message: "" });

  const previewRef = useRef(null);

  // ------- helpers -------
  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const moveSection = (idx, dir) => {
    setSections((arr) => {
      const next = [...arr];
      const swap = dir === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return next;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };

  const renderByTemplate = () => {
    const props = { data, theme };
    switch (template) {
      case "minimal":
        return <TemplateMinimal {...props} />;
      case "creative":
        return <TemplateCreative {...props} />;
      default:
        return <TemplatePro {...props} />;
    }
  };

  // ------ Export (retina, multipage) ------
  const exportPDF = async () => {
    if (!previewRef.current) return;
    const node = previewRef.current;

    // scale up for sharper text
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = canvas.width / canvas.height; // w/h
    const imgWidth = pageWidth;
    const imgHeight = imgWidth / ratio;

    let y = 0;
    let remaining = imgHeight;

    // If the resume height exceeds one page, slice it
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    while (remaining > 0) {
      const sliceHeight = Math.min(pageHeight, remaining);
      pageCanvas.width = canvas.width;
      pageCanvas.height = (sliceHeight * canvas.width) / pageWidth; // scale slice to canvas px

      pageCtx.drawImage(
        canvas,
        0,
        (y * canvas.width) / pageWidth,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        canvas.width,
        pageCanvas.height
      );

      const sliceData = pageCanvas.toDataURL("image/png");
      const sliceDisplayHeight = sliceHeight; // pt

      if (y > 0) pdf.addPage();
      pdf.addImage(sliceData, "PNG", 0, 0, pageWidth, sliceDisplayHeight);

      y += sliceHeight;
      remaining -= sliceHeight;
    }

    pdf.save(`${(data.name || "resume").replace(/\s+/g, "_")}.pdf`);
  };

  const exportPNG = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.name || "resume").replace(/\s+/g, "_")}.png`;
    a.click();
  };

  const saveJSON = () => {
    const blob = new Blob([JSON.stringify({ data, template, themeId }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume_${Date.now()}.json`;
    a.click();
  };

  const loadJSON = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (parsed.data) setData(parsed.data);
        if (parsed.template) setTemplate(parsed.template);
        if (parsed.themeId) setThemeId(parsed.themeId);
      } catch (e) {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  // ------ ATS score (simple keyword match) ------
  const computeATS = () => {
    const text = `${data.summary}\n${data.projects}\n${data.technicalSkills}\n${data.education}`.toLowerCase();
    const words = (jd || "").toLowerCase().match(/[a-z0-9+#.\-]{3,}/g) || [];
    const uniq = [...new Set(words)];
    const matched = uniq.filter((w) => text.includes(w));
    const missing = uniq.filter((w) => !text.includes(w)).slice(0, 25);
    const score = Math.round((matched.length / (uniq.length || 1)) * 100);
    setAts({ score, missing });
  };

  // ------ AI Actions ------
  const runAI = async (kind) => {
    setBusy(true);
    setBusyAction(kind);
    setAiStatus({ type: "processing", message: "Generating content..." });
    
    try {
      let system = "You are an expert resume writing assistant. Be concise, quantify impact, and keep a professional tone.";
      let prompt = "";

      if (kind === "objective") {
        prompt = `Create a 3-sentence professional summary for: ${data.title}. Use details: ${data.technicalSkills}.`;
        const out = await aiComplete({ provider: aiProvider, apiKey, system, prompt });
        update({ summary: String(out).trim() });
        setAiStatus({ type: "success", message: "Summary generated!" });
      }
      if (kind === "quantify") {
        prompt = `Rewrite the following project bullets, adding measurable impact, metrics, and outcomes. Keep each bullet under 22 words.\n\n${data.projects}`;
        const out = await aiComplete({ provider: aiProvider, apiKey, system, prompt });
        update({ projects: String(out).trim() });
        setAiStatus({ type: "success", message: "Projects quantified!" });
      }
      if (kind === "skills") {
        prompt = `Extract and rank at most 14 technical skills from this profile. Return comma-separated only.\n\nTitle: ${data.title}\nSummary: ${data.summary}\nProjects: ${data.projects}`;
        const out = await aiComplete({ provider: aiProvider, apiKey, system, prompt });
        update({ technicalSkills: String(out).replace(/\n/g, ", ").trim() });
        setAiStatus({ type: "success", message: "Skills extracted!" });
      }
      if (kind === "tailor") {
        prompt = `Tailor the resume summary and 6-8 bullets for the following job description. Keep it ATS-friendly.\n\nJD:\n${jd}\n\nCurrent Summary:\n${data.summary}\n\nCurrent Projects:\n${data.projects}`;
        const out = await aiComplete({ provider: aiProvider, apiKey, system, prompt });
        // naive split: first paragraph to summary, rest to projects
        const [first, ...rest] = String(out).split(/\n\n+/);
        update({ summary: first?.trim() || data.summary, projects: rest.join("\n").trim() || data.projects });
        setAiStatus({ type: "success", message: "Resume tailored to JD!" });
      }
    } catch (e) {
      console.error(e);
      setAiStatus({ type: "error", message: "AI action failed. Check API key." });
    } finally {
      setBusy(false);
      setBusyAction("");
      setTimeout(() => setAiStatus({ type: "", message: "" }), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-lg bg-white/80 border-b border-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Ultimate Resume Builder
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={exportPNG} 
              className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-sm flex items-center gap-2 shadow-sm transition-all hover:shadow"
            >
              <Download className="h-4 w-4" /> PNG
            </button>
            <button 
              onClick={exportPDF} 
              className="px-3 py-1.5 rounded-lg text-white text-sm flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
              style={{ background: theme.primary }}
            >
              <Download className="h-4 w-4" /> PDF
            </button>
            <button 
              onClick={saveJSON} 
              className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-sm flex items-center gap-2 shadow-sm transition-all hover:shadow"
            >
              <FileJson className="h-4 w-4" /> Save
            </button>
            <label className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-all hover:shadow">
              <Upload className="h-4 w-4" /> Load
              <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && loadJSON(e.target.files[0])} />
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Controls */}
        <motion.div 
          layout 
          className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-4 lg:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold">Template</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { id: "pro", label: "Professional" },
                { id: "minimal", label: "Minimal" },
                { id: "creative", label: "Creative" },
              ].map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTemplate(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                    template === t.id 
                      ? "text-white shadow-inner" 
                      : "bg-white hover:bg-gray-50"
                  }`}
                  style={template === t.id ? { 
                    background: theme.primary,
                    borderColor: theme.primary
                  } : {}}
                >
                  {t.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold">Theme</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {THEMES.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={t.name}
                  onClick={() => setThemeId(t.id)}
                  className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                    themeId === t.id ? "ring-2 ring-offset-2 ring-gray-800" : ""
                  }`}
                  style={{ 
                    background: t.subtle, 
                    borderColor: t.primary 
                  }}
                >
                  {themeId === t.id && <CheckCircle2 className="h-4 w-4 text-gray-800" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={data.name} onChange={(v) => update({ name: v })} />
            <Input label="Title" value={data.title} onChange={(v) => update({ title: v })} />
            <Input label="Email" value={data.email} onChange={(v) => update({ email: v })} />
            <Input label="Phone" value={data.phone} onChange={(v) => update({ phone: v })} />
            <Input label="Address" value={data.address} onChange={(v) => update({ address: v })} />
            <Input label="Education" value={data.education} onChange={(v) => update({ education: v })} />
            <Textarea label="Summary" value={data.summary} onChange={(v) => update({ summary: v })} rows={3} />
            <Textarea label="Projects (bullets, new line)" value={data.projects} onChange={(v) => update({ projects: v })} rows={5} />
            <Input label="Technical Skills (comma)" value={data.technicalSkills} onChange={(v) => update({ technicalSkills: v })} />
            <Input label="Activities (comma)" value={data.activities} onChange={(v) => update({ activities: v })} />
            <Textarea label="Declaration" value={data.conclusion} onChange={(v) => update({ conclusion: v })} rows={2} />
          </div>

          {/* Links */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Links</span>
              <button
                className="text-sm px-2 py-1 rounded border hover:bg-gray-50 transition-all"
                onClick={() => update({ links: [...(data.links || []), { label: "Website", url: "https://" }] })}
              >
                + Add Link
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.links || []).map((l, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="w-36 md:w-40 border rounded-lg px-2 py-1 text-sm focus:ring focus:ring-opacity-20"
                    style={{ 
                      borderColor: theme.primary,
                      backgroundColor: theme.subtle + "40",
                      focusRingColor: theme.primary
                    }}
                    value={l.label}
                    onChange={(e) => {
                      const next = [...(data.links || [])];
                      next[i] = { ...next[i], label: e.target.value };
                      update({ links: next });
                    }}
                  />
                  <input
                    className="flex-1 border rounded-lg px-2 py-1 text-sm focus:ring focus:ring-opacity-20"
                    style={{ 
                      borderColor: theme.primary,
                      backgroundColor: theme.subtle + "40",
                      focusRingColor: theme.primary
                    }}
                    value={l.url}
                    onChange={(e) => {
                      const next = [...(data.links || [])];
                      next[i] = { ...next[i], url: e.target.value };
                      update({ links: next });
                    }}
                  />
                  <button
                    className="px-2 rounded-lg border text-xs hover:bg-gray-50 transition-colors"
                    onClick={() => update({ links: (data.links || []).filter((_, j) => j !== i) })}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sections order */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-indigo-600" /> <span className="font-medium">Sections Order</span>
            </div>
            <div className="space-y-2">
              {sections.map((s, i) => (
                <motion.div 
                  key={s.id} 
                  className="flex items-center justify-between p-2 rounded-lg border bg-white"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-sm">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 border rounded hover:bg-gray-50 transition-colors"
                      onClick={() => moveSection(i, "up")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 border rounded hover:bg-gray-50 transition-colors"
                      onClick={() => moveSection(i, "down")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Panel */}
          <motion.div 
            className="mt-8 p-4 rounded-2xl border bg-gradient-to-br from-indigo-50/50 to-purple-50/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-indigo-600" /> 
                <span className="font-semibold">AI Assistant</span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">Gemini</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  placeholder="API Key"
                  className="border rounded-lg px-3 py-1.5 text-sm w-56 focus:ring-2 focus:ring-indigo-200"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>

            {aiStatus.message && (
              <motion.div 
                className={`p-3 rounded-lg mb-4 flex items-center gap-2 ${
                  aiStatus.type === "error" 
                    ? "bg-red-100 text-red-800" 
                    : aiStatus.type === "success" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {aiStatus.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : aiStatus.type === "error" ? (
                  <X className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                )}
                <span className="text-sm">{aiStatus.message}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AIButton 
                busy={busy} 
                busyAction={busyAction} 
                action="objective"
                onClick={() => runAI("objective")} 
                icon={<Wand2 className="h-4 w-4" />}
              >
                Write objective
              </AIButton>
              <AIButton 
                busy={busy} 
                busyAction={busyAction} 
                action="quantify"
                onClick={() => runAI("quantify")} 
                icon={<CheckCircle2 className="h-4 w-4" />}
              >
                Quantify achievements
              </AIButton>
              <AIButton 
                busy={busy} 
                busyAction={busyAction} 
                action="skills"
                onClick={() => runAI("skills")} 
                icon={<RefreshCw className="h-4 w-4" />}
              >
                Extract skills
              </AIButton>
              <AIButton 
                busy={busy} 
                busyAction={busyAction} 
                action="tailor"
                onClick={() => runAI("tailor")} 
                icon={<Search className="h-4 w-4" />}
              >
                Tailor to JD
              </AIButton>
            </div>

            <div className="mt-4">
              <Textarea 
                label="Paste Job Description (for tailoring & ATS)" 
                value={jd} 
                onChange={setJd} 
                rows={5} 
              />
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <button 
                  className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm flex items-center gap-2 transition-all"
                  onClick={computeATS}
                >
                  <Star className="h-4 w-4" /> Compute ATS Score
                </button>
                
                {ats.score > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">Score: <b>{ats.score}%</b></div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${ats.score}%`,
                          background: ats.score > 80 
                            ? "#10b981" 
                            : ats.score > 60 
                              ? "#f59e0b" 
                              : "#f43f5e"
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {!!ats.missing.length && (
                  <div className="text-xs opacity-70 bg-white/50 p-1.5 rounded">
                    <span className="font-medium">Missing:</span> {ats.missing.slice(0, 8).join(", ")}{ats.missing.length > 8 ? "…" : ""}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Live Preview */}
        <motion.div 
          layout 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            layout
            className="rounded-3xl border border-white/20 shadow-xl bg-white/90 backdrop-blur-sm p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600" /> 
                <span className="font-semibold">Live Preview</span>
              </div>
              <div className="text-xs opacity-60">A4 • 794×1123 px (print ready)</div>
            </div>
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${template}-${themeId}-${data.name}`}
                  ref={previewRef}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  {renderByTemplate()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <QuickStarts onPick={(preset) => setData({ ...data, ...preset })} theme={theme} />
        </motion.div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-xs opacity-60">
        Made with ❤️ — Tips: keep it one page, use action verbs, and quantify impact.
      </footer>
    </div>
  );
}

// ---------- UI PRIMITIVES ----------
function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <div className="text-sm mb-1 font-medium text-gray-700">{label}</div>
      <input
        type={type}
        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Textarea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="block">
      <div className="text-sm mb-1 font-medium text-gray-700">{label}</div>
      <textarea
        rows={rows}
        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function AIButton({ children, onClick, icon, busy, busyAction, action }) {
  const isActive = busy && busyAction === action;
  
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={busy}
      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm border shadow-sm transition-all ${
        isActive 
          ? "bg-indigo-100 text-indigo-800 border-indigo-300" 
          : "bg-white hover:shadow disabled:opacity-50"
      }`}
    >
      {isActive ? <RefreshCw className="h-4 w-4 animate-spin" /> : icon} 
      {children}
    </motion.button>
  );
}

// ---------- QUICK STARTS ----------
function QuickStarts({ onPick, theme }) {
  const presets = [
    {
      name: "Frontend",
      patch: {
        title: "Frontend Engineer",
        technicalSkills: "JavaScript, React, Redux, Tailwind, Webpack, Vite, Vitest, Cypress, Lighthouse, PWAs",
        summary:
          "Frontend engineer crafting fast, accessible UIs. Deep in React/Tailwind, testing, and performance budgets.",
      },
    },
    {
      name: "Backend",
      patch: {
        title: "Backend Engineer",
        technicalSkills: "Node.js, Express, PostgreSQL, MongoDB, Prisma, Redis, Kafka, Docker, CI/CD, Testing",
        summary:
          "Backend engineer shipping robust APIs and event-driven services with observability and rock‑solid DX.",
      },
    },
    {
      name: "Full‑Stack",
      patch: {
        title: "Full‑Stack Developer (MERN)",
        technicalSkills:
          "JavaScript, TypeScript, React, Node.js, Express, MongoDB, Tailwind, Firebase, Stripe, WebSockets, Testing",
        summary:
          "Full‑stack MERN dev building polished web apps end‑to‑end, from schema to pixels — with tests.",
      },
    },
  ];

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Wand2 className="h-5 w-5 text-indigo-600" /> <span className="font-semibold">Quick Starts</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <motion.button
            key={p.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPick(p.patch)}
            className="px-3 py-1.5 rounded-full border hover:bg-gray-50 text-sm transition-all"
            style={{ 
              borderColor: theme.primary,
              backgroundColor: theme.subtle + "40"
            }}
          >
            {p.name}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPick(STARTER)}
          className="px-3 py-1.5 rounded-full border hover:bg-gray-50 text-sm flex items-center gap-2 transition-all"
          style={{ 
            borderColor: theme.primary,
            backgroundColor: theme.subtle + "40"
          }}
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </motion.button>
      </div>
    </motion.div>
  );
}