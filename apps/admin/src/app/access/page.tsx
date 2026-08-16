"use client";
import React, { useEffect, useState } from 'react';
import { Card, Container } from "@pasadium/ui";
import { adminApi } from "@/lib/api-client";
import { AdminUser } from "@/lib/mock-api";

export default function AccessPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    await adminApi.updateUserStatus(userId, newStatus as string);
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus as any } : u));
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Access Control...</div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1>Access Control</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage platform administrators, operators, and permission levels.</p>
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Administrator Registry</h2>
          <button style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Add New User</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td className={`status-${user.status.toLowerCase()}`}>{user.status}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <button 
                    onClick={() => toggleUserStatus(user.id, user.status)}
                    style={{ 
                      padding: '4px 8px', 
                      fontSize: '0.8rem', 
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px'
                    }}
                  >
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
