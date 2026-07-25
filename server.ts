import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client server-side safely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Bofferly Islamic Portal", timestamp: new Date().toISOString() });
});

// 1. AI Scholar & Fatwa Helper
app.post("/api/fatwa/ask", async (req, res) => {
  try {
    const { question, category } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Question is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback structured answer if key is missing
      return res.json({
        answer: `Thank you for your question regarding "${question}". In Islam, matters of ${category || "fiqh/aqeedah"} are grounded in the Quran and Sunnah. Please consult authentic scholars for personal rulings. Always seek guidance from verified classical texts like Sahih al-Bukhari and Sahih Muslim.`,
        references: ["Quran 16:43 - Ask the people of knowledge if you do not know.", "Sahih al-Bukhari 100"],
        disclaimer: "This response is provided for educational purposes based on general Islamic knowledge principles.",
        status: "fallback"
      });
    }

    const prompt = `You are Bofferly AI Scholar, an empathetic, highly knowledgeable, and authentic Islamic learning assistant.
Answer the user's question clearly, politely, and strictly adhering to classical Islamic consensus (Quran, authentic Hadith from Bukhari/Muslim, and recognized Fiqh schools).
Provide clear formatting with headings, Quranic verse citations (Arabic + English translation), authentic Hadith references, and practical summary advice.

Question: ${question}
Category: ${category || "General Islamic Knowledge"}

Include a brief disclaimer that personal complex fatwas should be confirmed with a local qualified Mufti.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        systemInstruction: "You are Bofferly AI Scholar. Provide respectful, authentic, well-referenced Islamic knowledge with Quran and Hadith citations."
      }
    });

    res.json({
      answer: response.text || "No response generated.",
      status: "success"
    });
  } catch (error: any) {
    console.error("Fatwa API error:", error);
    res.status(500).json({
      error: "Unable to process Islamic scholar query.",
      message: error.message
    });
  }
});

// 2. AI Quran & Hadith Search
app.post("/api/quran/ai-search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query required." });

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        explanation: `Quranic & Hadith guidance regarding "${query}": Islam emphasizes righteousness, patience, and devotion to Allah in all aspects of life.`,
        suggestedVerses: [{ surah: 2, ayah: 153, text: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient." }],
        suggestedHadiths: [{ book: "Sahih al-Bukhari", text: "The Prophet ﷺ said: 'The best among you are those who have the best manners and character.'" }]
      });
    }

    const prompt = `Provide relevant Quranic verses and authentic Hadiths related to this topic or search term: "${query}".
Return a JSON response with:
1. "explanation": A brief overview of the topic in Islamic teachings.
2. "verses": Array of objects { surahName, surahNumber, ayahNumber, arabicText, englishTranslation }
3. "hadiths": Array of objects { collection, narrator, text, grade }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Quran AI search error:", error);
    res.status(500).json({ error: "Search failed." });
  }
});

// 3. AI Tafsir generator/explainer
app.post("/api/quran/tafsir", async (req, res) => {
  try {
    const { surahName, surahNumber, ayahNumber, ayahText } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        tafsirSummary: `Tafsir for Surah ${surahName || surahNumber}:${ayahNumber}: This noble verse provides divine guidance on righteousness, faith, and reliance upon Allah. Classical commentators emphasize the spiritual depth and context of revelation for this verse.`,
        historicalContext: "Revealed in Makkah/Madinah with key lessons for the early Muslim community.",
        keyLessons: ["Firmness in faith", "Reliance on Allah", "Striving for good deeds"]
      });
    }

    const prompt = `Provide a comprehensive Tafsir summary for Surah ${surahName} (${surahNumber}:${ayahNumber}).
Verse Text: "${ayahText || ""}"
Include context of revelation (Asbab al-Nuzul), detailed word-by-word themes, and key spiritual takeaways for daily life.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ tafsir: response.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express Server with Vite integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bofferly Islamic Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
