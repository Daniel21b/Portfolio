'use client';

interface HighlightTextProps {
  children: React.ReactNode;
  color?: 'indigo' | 'purple' | 'blue' | 'green' | 'amber';
}

const colorClasses = {
  indigo: 'hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-400',
  purple: 'hover:bg-purple-500/20 hover:text-purple-600 dark:hover:text-purple-400',
  blue: 'hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400',
  green: 'hover:bg-green-500/20 hover:text-green-600 dark:hover:text-green-400',
  amber: 'hover:bg-amber-500/20 hover:text-amber-600 dark:hover:text-amber-400',
};

const HighlightText = ({ children, color = 'indigo' }: HighlightTextProps) => {
  return (
    <span
      className={`
        inline cursor-default rounded-md px-1 py-0.5
        font-medium text-zinc-900 dark:text-white
        transition-all duration-200 ease-out
        ${colorClasses[color]}
      `}
    >
      {children}
    </span>
  );
};

export default HighlightText;
