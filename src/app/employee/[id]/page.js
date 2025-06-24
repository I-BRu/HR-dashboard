'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EmployeeDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {user.address?.address}, {user.address?.city}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
      </div>
    </main>
  );
}
