'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState([]);
  const [filterRating, setFilterRating] = useState([]);

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
    <main className="p-6 bg-gradient-to-r from-slate-100 to-gray-200 min-h-screen">
  <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">💼 HR Performance Dashboard</h1>

  {/* 🔍 Search & Filter */}
  <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    {/* Search */}
    <input
      type="text"
      placeholder="Search by name, email, or department"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Filters */}
    <div className="flex flex-wrap gap-2">
      {/* Department Filter */}
      {['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'].map((dept) => (
        <button
          key={dept}
          onClick={() => toggleFilter(dept, setFilterDept)}
          className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
            filterDept.includes(dept)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {dept}
        </button>
      ))}

      {/* Rating Filter */}
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => toggleFilter(rating, setFilterRating)}
          className={`px-2 py-1 rounded-full border text-sm transition ${
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

  {/* User Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredUsers.map((user) => (
      <div
        key={user.id}
        className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
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
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            View
          </a>
          <button className="px-4 py-1.5 bg-yellow-400 text-black rounded-lg text-sm font-medium hover:bg-yellow-500 transition">
            Bookmark
          </button>
          <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
            Promote
          </button>
        </div>
      </div>
    ))}
  </div>
</main>

  );
}
