import { useState } from 'react';

interface PlayerNameDialogProps {
  onSaveName: (name: string) => void;
}

export default function PlayerNameDialog({
  onSaveName,
}: PlayerNameDialogProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateName = (value: string): boolean => {
    // Only allow letters, numbers, hyphens, and underscores
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    return validPattern.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (value === '') {
      setError('');
      return;
    }

    if (!validateName(value)) {
      setError(
        'Only letters, numbers, hyphens (-), and underscores (_) allowed',
      );
    } else {
      setError('');
    }
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    if (trimmedName && validateName(trimmedName)) {
      onSaveName(trimmedName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-1/3 rounded-lg bg-white p-8 text-center shadow-2xl dark:bg-[#1A1F26]">
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
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Your name"
            maxLength={20}
            className={`w-full rounded-lg border px-4 py-3 text-gray-900 focus:ring-2 focus:outline-none dark:bg-[#0C1116] dark:text-white ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500'
                : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400'
            }`}
            autoFocus
          />
          {error && (
            <p className="mt-2 text-xs text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={!name.trim() || !!error}
          className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 active:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-500"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}
