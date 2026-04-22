interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full mb-5 py-3 rounded border border-neon-green/40 bg-dark-card text-neon-green text-xs font-bold tracking-widest font-mono hover:bg-neon-green hover:text-dark-base transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] active:scale-[0.98]"
    >
      [ + LOG WEIGHT ENTRY ]
    </button>
  );
}
