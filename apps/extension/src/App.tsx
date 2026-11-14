
import { useEffect, useState } from "react";

function App() {
  const [website, setWebsite] = useState("Loading...");
  const [isYouTube, setIsYouTube] = useState(false);

  useEffect(() => {
    if (!chrome?.tabs) return;

    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        const tab = tabs[0];

        if (!tab?.url) {
          setWebsite("Unable to detect website");
          return;
        }

        const url = new URL(tab.url);

        setWebsite(url.hostname);
        setIsYouTube(
          url.hostname === "youtube.com" ||
          url.hostname.endsWith(".youtube.com")
        );
      }
    );
  }, []);

  return (
    <main className="w-[360px] min-h-[420px] p-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          veni<span className="text-cyan-400">.</span>
        </h1>

        <span className="text-xs text-gray-400">
          DIGITAL WELLBEING
        </span>
      </header>

      <section className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">
          CURRENT WEBSITE
        </p>

        <p className="mt-2 text-lg font-semibold break-all">
          {website}
        </p>

        <div className="mt-4">
          {isYouTube ? (
            <span className="text-sm text-green-400">
              YouTube detected
            </span>
          ) : (
            <span className="text-sm text-gray-400">
              Not on YouTube
            </span>
          )}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-semibold text-gray-300">
          YOUR ATTENTION MATTERS
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Understand what you consume.
          Take control of your attention.
        </p>
      </section>

      <footer className="mt-10 border-t border-gray-800 pt-4">
        <p className="text-xs text-gray-500">
          Veni v1.0 · Built for intentional consumption.
        </p>
      </footer>
    </main>
  );
}

export default App;

