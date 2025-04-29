import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:3000/usuarios', {
      headers: {
        'Authorization': token
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          window.location.href = '/login';
        }
        return res.json();
      })
      .then(data => setData(data))
      .catch(() => window.location.href = '/login');
  }, []);

  return (
    <div>
      <h2>Panel de administración</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Cargando...</p>}
    </div>
  );
}

export default Dashboard;
