'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tabs = ['Overview', 'Projects', 'Feedback'];

const mockFeedback = [
  'Very punctual and disciplined.',
  'Consistently exceeds performance expectations.',
  'Needs improvement in communication.',
];

export default function EmployeeDetails() {
  const params = useParams();
  const id = params?.id;
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      const enhanced = {
        ...data,
        department: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 5) + 1,
        bio: 'A dynamic and passionate employee with a growth mindset.',
        performanceHistory: [
          'Exceeded Q1 Targets',
          'Led successful project launch',
          'Received Employee of the Month in May',
        ],
      };
      setUser(enhanced);
    };
    if (id) fetchUser();
  }, [id]);

  if (!user) return <div className="p-10 text-center animate-pulse text-gray-500">Loading...</div>;

  return (
    <main className="p-10 max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-10 transition-all duration-500 border border-gray-200">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block hover:text-blue-800 transition-colors">← Back to Dashboard</Link>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold mb-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text tracking-tight"
      >
        {user.firstName} {user.lastName}
      </motion.h1>
      <p className="text-gray-700 mb-1 text-lg font-medium">{user.email} • {user.phone}</p>
      <p className="text-md text-gray-500 mb-6 italic">Department: {user.department}</p>

      <div className="flex items-center gap-2 mb-10">
        {[...Array(5)].map((_, i) => (
          <motion.span 
            key={i} 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: i * 0.1 }} 
            className={i < user.rating ? 'text-yellow-400 text-2xl drop-shadow-md' : 'text-gray-300 text-2xl'}
          >
            ★
          </motion.span>
        ))}
        <span className="text-md text-gray-500 font-semibold">({user.rating}/5)</span>
      </div>

      <div className="flex gap-4 mb-8 border-b pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`py-2 px-6 rounded-full font-semibold text-md transition-all duration-300 ${
              activeTab === tab
                ? 'bg-blue-100 text-blue-700 shadow-md'
                : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Bio</h2>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-5 rounded-2xl shadow-sm border border-gray-100">{user.bio}</p>

            <h2 className="text-2xl font-bold text-blue-700">Performance History</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {user.performanceHistory.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'Projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Projects</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Website Redesign – Q1</li>
              <li>Internal Dashboard – Q2</li>
              <li>Client CRM Migration – Q3</li>
            </ul>
          </div>
        )}

        {activeTab === 'Feedback' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Manager Feedback</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {mockFeedback.map((fb, idx) => (
                <li key={idx}>{fb}</li>
              ))}
            </ul>

            <form className="space-y-4">
              <label className="block text-md font-medium text-gray-700">Leave Feedback:</label>
              <textarea className="w-full border px-4 py-2 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all" rows="3" placeholder="Write something..." />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </main>
  );
}
