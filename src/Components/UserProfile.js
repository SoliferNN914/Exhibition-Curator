import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  return (
    <div>
      <h2>Welcome to your profile</h2>
      <Link to="/exhibition">View Your Exhibition</Link>
    </div>
  );
}