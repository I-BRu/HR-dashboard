'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useBookmarks } from '@/store/useBookmarks';


export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filterDept, setFilterDept] = useState([]);
  const [filterRating, setFilterRating] = useState([]);
  const { addBookmark } = useBookmarks();
  const [recentlyBookmarkedId, setRecentlyBookmarkedId] = useState(null);




  const toggleFilter = (value, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());

    const matchesDept = filterDept.length === 0 || filterDept.includes(user.department);
    const matchesRating = filterRating.length === 0 || filterRating.includes(user.rating);

    return matchesSearch && matchesDept && matchesRating;
  });

  useEffect(() => {
    const getRandomDepartment = () => {
      const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
      return departments[Math.floor(Math.random() * departments.length)];
    };

    const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();

      const enhancedUsers = data.users.map((user) => ({
        ...user,
        department: getRandomDepartment(),
        rating: getRandomRating(),
      }));

      setUsers(enhancedUsers);
    };

    fetchUsers();
  }, []);

  
  return (
    <main className="p-6 min-h-screen bg-gradient-to-tr from-[#f7f9fc] via-[#eef1f7] to-[#f7f9fc] transition-all duration-1000 ease-in-out">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-12 tracking-wide drop-shadow-sm"
      >
        🚀 Empower HR Performance
      </motion.h1>
      <div className="flex justify-end mb-6 gap-4">
  <Link
    href="/analytics"
    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition shadow-sm hover:shadow-md"
  >
    📊 Analytics
  </Link>

  <Link
    href="/bookmarks"
    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition shadow-sm hover:shadow-md"
  >
    🔖 Bookmarks
  </Link>
</div>




      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full md:w-1/3"
        >
          <motion.div
            animate={{ width: isSearchActive || search ? '100%' : '50%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="flex items-center bg-white shadow-lg rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all overflow-hidden cursor-pointer"
            onClick={() => setIsSearchActive(true)}
            onMouseLeave={() => !search && setIsSearchActive(false)}
          >
            <span className="mr-2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, or department"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
            />
            {search && (
              <span
                className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => setSearch('')}
              >
                ✕
              </span>
            )}
          </motion.div>


        </motion.div>

        <div className="flex flex-wrap gap-2">
          {['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'].map((dept) => (
            <button
              key={dept}
              onClick={() => toggleFilter(dept, setFilterDept)}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105 ${
                filterDept.includes(dept)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {dept}
            </button>
          ))}

          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => toggleFilter(rating, setFilterRating)}
              className={`px-2 py-1 rounded-full border text-sm transition duration-300 ease-in-out transform hover:scale-105 ${
                filterRating.includes(rating)
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.01] duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Age: {user.age}</p>
            <p className="text-sm text-gray-500">Department: <span className="font-medium">{user.department}</span></p>

            <div className="flex items-center my-3">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < user.rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>
                  ★
                </span>
              ))}
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <a
                href={`/employee/${user.id}`}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
              >
                View
              </a>
              <button
  onClick={() => {
    addBookmark(user);
    setRecentlyBookmarkedId(user.id);
    setTimeout(() => setRecentlyBookmarkedId(null), 2000);
  }}
   
  className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500 transition duration-200 cursor-pointer"
>
  Bookmark
</button>

              <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition duration-200">
                Promote
              </button>
              </div>
              {recentlyBookmarkedId === user.id && (
  <p className="mt-2 text-green-600 text-sm font-medium transition duration-300">
    ✅ Bookmarked!
  </p>
)}

            

          </motion.div>
        ))}
      </div>
    </main>
  );
}
