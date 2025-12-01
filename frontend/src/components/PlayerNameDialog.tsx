import { useState } from 'react';

interface PlayerNameDialogProps {
  onSaveName: (name: string) => void;
}

export default function PlayerNameDialog({
  onSaveName,
}: PlayerNameDialogProps) {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSaveName(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="rounded-lg bg-white p-8 text-center shadow-2xl dark:bg-[#1A1F26]">
        <div className="mb-4 text-5xl">👤</div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Snake Game!
        </h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Please enter your name to save your scores
        </p>

        <div className="mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Your name"
            maxLength={20}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-[#0C1116] dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400"
            autoFocus
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 active:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-500"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}
