'use client';

import { useState, useEffect, useRef } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  source?: { page: number };
  isLoading?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      role: 'ai',
      content: 'Olá! Sou o DocPilot. Como posso ajudar com a leitura do seu PDF hoje?',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: string) => {
    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Adicionar loading state
    const loadingMessage: Message = {
      id: `msg-${Date.now() + 1}`,
      role: 'ai',
      content: '',
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);

    // Simular resposta da IA (placeholder)
    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: `msg-${Date.now() + 2}`,
          role: 'ai',
          content:
            'Resposta simulada da IA. Para integrar com Gemini/LangChain, substitua este placeholder pela chamada real da API.',
          source: { page: 4 },
        };
        return updated;
      });
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-background-dark transition-colors duration-200">
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 sm:px-6 md:px-20 py-3 transition-colors">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white flex-shrink-0">
            <span className="material-symbols-outlined text-lg sm:text-xl">
              description
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            DocPilot
          </h2>
        </div>
      </header>

      {/* Main - Chat Messages Area */}
      <main className="flex-1 overflow-y-auto pb-36 sm:pb-40">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isLoading={msg.isLoading}
              source={msg.source}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <ChatInput onSubmit={handleSendMessage} />
    </div>
  );
}
