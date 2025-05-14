'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';

export default function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState<{ name: string; message: string; time: any }[]>([]);

  // 저장된 이름 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) setName(savedName);
  }, []);

  // 메시지 불러오기 (실시간)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'guestbook'), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data()).sort((a, b) => b.time?.seconds - a.time?.seconds);
      setChatList(data as any);
    });
    return () => unsub();
  }, []);

  // 메시지 추가
  const handleSubmit = async () => {
    if (!name || !message) return;
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      time: Timestamp.now()
    });
    localStorage.setItem('name', name);
    setMessage('');
  };

  return (
    <div style={{ backgroundColor: '#e0f7fa', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>방명록</h1>

      <div style={{ maxWidth: 600, margin: 'auto', background: 'white', borderRadius: 8, padding: '1rem' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지"
          style={{ width: '100%', height: '100px', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <button
          onClick={handleSubmit}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#4dd0e1', border: 'none', borderRadius: 4 }}
        >
          작성하기
        </button>
      </div>

      <div style={{ maxWidth: 600, margin: '2rem auto', background: 'white', borderRadius: 8, padding: '1rem' }}>
        {chatList.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <strong>{item.name}</strong>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
