import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function StudentsPage({ token, onLogout }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load students');
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Students</h1>
          <button onClick={onLogout} className="text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-1">Logout</button>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Class</th>
                  <th className="px-4 py-2">Roll</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-4 py-2">{s.firstName} {s.lastName}</td>
                    <td className="px-4 py-2">{s.classSection}</td>
                    <td className="px-4 py-2">{s.rollNumber || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}