"use client";

import Logo from "@/app/components/logo";
import Background from "./components/background";
import ThemeSwitcher from "./components/themeSwitcher";
import CharCountPattern from "./components/charCountPattern";
import SentenceCountPattern from "./components/sentenceCountPattern";
import WordCountPattern from "./components/wordCountPattern";
import { useEffect, useState } from "react";
import ProgressBar from "./components/progressBar";
import DownArrowIcon from "./components/downArrowIcon";
import IconInfo from "./components/iconInfo";

export default function Home() {
  const [text, setText] = useState("");
  const [seeMore, setSeeMore] = useState(false);
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(false);
  const [limitCharacterNum, setLimitCharacterNum] = useState(0);
  const error = !characterLimit ? false : text.length > limitCharacterNum;

  useEffect(() => {
    setSeeMore((prev) => (prev === false ? prev : false));
  }, [text]);

  const maxDensityRows = 3;
  const characterCount = excludeSpaces
    ? text.replace(/\s/g, "").length
    : text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceCount = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  const readingTime = Math.floor(wordCount / 25); // Approx. 25 words per minute

  const letterDensity = text
    .replace(/[^a-zA-Z]/g, "") // Remove non-letters
    .split("")
    .reduce(
      (acc, char) => {
        char = char.toUpperCase();
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const sortedLetterDensity = Object.entries(letterDensity)
    .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
    .reduce(
      (acc, [char, count]) => {
        acc[char] = count;
        return acc;
      },
      {} as Record<string, number>,
    );

  const displayedLetterDensity = Object.entries(sortedLetterDensity).slice(
    0,
    seeMore ? Object.keys(sortedLetterDensity).length : maxDensityRows,
  );

  return (
    <main className="relative pb-8 text-neutral-900 sm:pb-16 sm:pt-8 dark:text-neutral-100">
      <Background />
      <div className="sm:mx-auto sm:max-w-[990px]">
        <div className="flex items-center justify-between max-lg:p-4">
          <Logo />
          <ThemeSwitcher className="h-[32px] w-[32px] rounded-md bg-neutral-100 p-1.5 sm:h-[44px] sm:w-[44px] sm:p-[11px] dark:bg-neutral-700" />
        </div>

        <div className="mx-4 my-10 lg:mx-[240px] sm:my-12">
          <h1 className="text-center text-[40px] font-bold leading-none tracking-[-1px] sm:text-[64px]">
            Analyze your text in real-time.
          </h1>
        </div>
        <div className="flex flex-col items-start space-y-4 max-lg:px-4">
          <textarea
            className={`h-[200px] w-full resize-none rounded-xl border-2 bg-neutral-400 p-3 text-[20px] font-normal leading-[28px] tracking-[-0.6px] text-neutral-700 focus:ring-0 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 ${
              error
                ? "border-orange-800 focus:border-orange-800 focus:shadow-text-area-error dark:border-orange-500 dark:focus:border-orange-500 dark:focus:shadow-text-area-error-dark"
                : "border-neutral-500 focus:border-purple-500 focus:shadow-text-area dark:border-neutral-700"
            }`}
            placeholder="Start typing here… (or paste your text)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {error && (
            <div className="flex items-center gap-x-2 text-orange-800 dark:text-orange-500">
              <IconInfo />
              <p className="text-[16px] leading-[20.8px] tracking-[-0.6px]">
                Limit reached! Your text exceeds {limitCharacterNum} characters.
              </p>
            </div>
          )}
          <div className="w-full max-sm:space-y-3 sm:flex sm:items-center sm:justify-between">
            <div className="max-sm:space-y-3 sm:flex sm:items-center sm:justify-center sm:gap-x-6">
              <div>
                <input
                  type="checkbox"
                  id="excludeSpaces"
                  name="excludeSpaces"
                  value="excludeSpaces"
                  defaultChecked={excludeSpaces}
                  onChange={() => setExcludeSpaces(!excludeSpaces)}
                  className="border-1 mr-2.5 h-4 w-4 rounded-[4px] border-neutral-900 bg-transparent text-purple-400 checked:bg-purple-400 indeterminate:bg-purple-400 hover:checked:bg-purple-500 focus:ring-2 focus:ring-purple-400 dark:border-neutral-200"
                />
                <label
                  htmlFor="excludeSpaces"
                  className="text-[16px] leading-[20.8px] tracking-[-0.6px]"
                >
                  Exclude Spaces
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="characterLimit"
                  name="characterLimit"
                  value="characterLimit"
                  className="border-1 mr-2.5 h-4 w-4 rounded-[4px] border-neutral-900 bg-transparent text-purple-400 checked:bg-purple-400 indeterminate:bg-purple-400 hover:checked:bg-purple-500 focus:ring-2 focus:ring-purple-400 dark:border-neutral-200"
                  defaultChecked={characterLimit}
                  onChange={() => setCharacterLimit(!characterLimit)}
                />
                <label
                  htmlFor="characterLimit"
                  className="text-[16px] leading-[20.8px] tracking-[-0.6px]"
                >
                  Set Character Limit
                </label>
                {characterLimit && (
                  <input
                    type="text"
                    value={limitCharacterNum}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLimitCharacterNum(value ? parseInt(value) || 0 : 0);
                    }}
                    className="border-1 ml-[10px] w-[55px] rounded-md border-neutral-900 p-1 px-3 text-[16px] leading-[20.8px] tracking-[-0.6px] focus:border-purple-500 focus:ring-0 dark:border-neutral-600 dark:bg-transparent"
                  />
                )}
              </div>
            </div>
            <p>
              Approx. reading time:
              {readingTime === 0
                ? " < 1 minute"
                : `${readingTime} ${
                    readingTime === 1 ? " minute" : " minutes"
                  }`}
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6 sm:mt-12 max-lg:px-4">
          <div className="text-neutral-900 max-sm:space-y-4 sm:grid sm:w-full sm:grid-cols-3 sm:gap-x-4">
            <div className="relative z-10 h-[130px] rounded-xl bg-purple-400 p-5 sm:h-[150px] sm:p-4">
              <h2 className="mt-[7px] sm:mt-[10.5px] text-[40px] font-bold leading-none tracking-[-1px] sm:text-[64px]">
                {characterCount === 0 ? "00" : characterCount}
              </h2>
              <h2 className="mt-[5px] text-[20px] font-normal leading-[28px] tracking-[-0.6px]">
                Total Characters
                {excludeSpaces && (
                  <span className="text-[16px] leading-[20.8px] tracking-[-0.6px]">
                    (no space)
                  </span>
                )}
              </h2>
              <CharCountPattern className="absolute right-0 top-0 -z-10" />
            </div>

            <div className="relative z-10 h-[130px] rounded-xl bg-yellow-500 p-5 sm:h-[150px] sm:p-4">
              <h2 className="mt-[7px] sm:mt-[10.5px] text-[40px] font-bold leading-none tracking-[-1px] sm:text-[64px]">
                {wordCount === 0 ? "00" : wordCount}
              </h2>
              <h2 className="text-[20px] font-normal leading-[28px] tracking-[-0.6px]">
                Word Count
              </h2>
              <WordCountPattern className="absolute right-0 top-0 -z-10" />
            </div>

            <div className="relative z-10 h-[130px] rounded-xl bg-orange-500 p-5 sm:h-[150px] sm:p-4">
              <h2 className="mt-[7px] sm:mt-[10.5px] text-[40px] font-bold leading-none tracking-[-1px] sm:text-[64px]">
                {sentenceCount === 0 ? "00" : sentenceCount}
              </h2>
              <h2 className="text-[20px] font-normal leading-[28px] tracking-[-0.6px]">
                Sentence Count
              </h2>
              <SentenceCountPattern className="absolute right-0 top-0 -z-10" />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-[24px] font-semibold leading-[31.2px] tracking-[-1px]">
              Letter Density
            </h2>

            {displayedLetterDensity.length > 0 ? (
              <>
                {displayedLetterDensity.map(([char, count]) => (
                  <div
                    key={char}
                    className="mb-4 flex items-center justify-center gap-x-3.5 text-[16px] leading-[20.8px] tracking-[-0.6px]"
                  >
                    <span>{char}</span>
                    <ProgressBar progress={(count / characterCount) * 100} />
                    <span className="flex-shrink-0">
                      {`${letterDensity[char]} (${(
                        (count / characterCount) *
                        100
                      ).toFixed(2)}%)`}
                    </span>
                  </div>
                ))}
                {!seeMore && (
                  <button
                    className="flex items-center justify-center gap-x-2 text-[20px] font-normal leading-[28px] tracking-[-0.6px] text-neutral-700 dark:text-neutral-200"
                    onClick={() => setSeeMore(true)}
                  >
                    <span>See More</span>
                    <DownArrowIcon />
                  </button>
                )}
              </>
            ) : (
              <p className="text-[16px] leading-[20.8px] tracking-[-0.6px]">
                No characters found. Start typing to see letter density.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
