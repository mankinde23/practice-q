import {useAuth} from '@/hooks/useAuth';
import React from 'react';

export default function Home() {
  const {logout} = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await logout();
    } catch (error: any) {
    } finally {
    }
  };
  return (
    <div>
      Home
      <p className="text-[20px] text-green-900">Home</p>
      <button onClick={handleSubmit}>LOG OUT </button>
    </div>
  );
}
