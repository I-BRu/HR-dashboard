'use client';
import { useBookmarks } from '@/store/useBookmarks';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow transition-all"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text"
      >
        📌 Bookmarked Employees
      </motion.h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">Age: {user.age}</p>
              <p className="text-sm text-gray-500">Department: <span className="font-medium text-blue-700">{user.department}</span></p>

              <div className="flex items-center my-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < user.rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex justify-between mt-4 gap-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all"
                  onClick={() => removeBookmark(user.id)}
                >
                  Remove
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all">
                  Promote
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all">
                  Assign
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
