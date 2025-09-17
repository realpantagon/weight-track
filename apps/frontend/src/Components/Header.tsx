interface HeaderProps {
  totalEntries: number;
  latestEntryDate?: string;
  formatDate: (dateStr: string) => string;
}

export default function Header({ totalEntries, latestEntryDate, formatDate }: HeaderProps) {
  return (
    <div className="text-center mb-8 pt-4">
      <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
        Pantagon Weight Tracking
      </h1>
      {totalEntries > 0 && latestEntryDate && (
        <div className="text-sm text-gray-400">
          {totalEntries} entries • Latest: {formatDate(latestEntryDate)}
        </div>
      )}
    </div>
  );
}
