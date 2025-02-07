import { Table } from 'lucide-react';
import { ROW_LIMIT } from '../constants';

interface DataPreviewProps {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
}

export default function DataPreview({ headers, rows, totalRows }: DataPreviewProps) {
  const previewRows = rows.slice(0, ROW_LIMIT);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Table className="w-5 h-5 icon-theme" />
        <h3 className="text-lg font-medium neon-text">Data Preview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, index) => (
              <tr key={index} className="border-b border-gray-700">
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalRows > ROW_LIMIT && (
        <p className="text-sm text-gray-400 mt-2">
          Showing {ROW_LIMIT} of {totalRows} rows
        </p>
      )}
    </div>
  );
}