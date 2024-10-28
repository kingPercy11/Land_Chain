import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Move these functions outside the component
const createChatSession = async (apiKey: string, externalUserId: string) => {
  const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      pluginIds: [],
      externalUserId: externalUserId
    })
  });

  const data = await response.json();
  return data.data.id; // Extract session ID
};

const submitQuery = async (apiKey: string, sessionId: string, query: string) => {
  const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      endpointId: 'predefined-openai-gpt4o',
      query: query,
      pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
      responseMode: 'sync'
    })
  });

  const data = await response.json();
  return data;
};

export function Chatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'Hello! I\'m the LandChain AI assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userMessage = formData.get('userMessage') as string;
    if (userMessage.trim()) {
      setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setIsLoading(true);
      
      const apiKey = '9FnzU4m6vxBmJLowv6eTfsTQX2Ivrhq6';
      const externalUserId = 'user-' + Date.now(); // Generate a unique user ID

      try {
        const sessionId = await createChatSession(apiKey, externalUserId);
        const response = await submitQuery(apiKey, sessionId, userMessage);
        
        if (response.data && response.data.answer) {
          setChatMessages(prev => [...prev, { role: 'system', content: response.data.answer }]);
        } else {
          setChatMessages(prev => [...prev, { role: 'system', content: "I'm sorry, I couldn't process your request. Please try again." }]);
        }
      } catch (error) {
        console.error('Error:', error);
        setChatMessages(prev => [...prev, { role: 'system', content: "I'm sorry, there was an error processing your request. Please try again later." }]);
      } finally {
        setIsLoading(false);
      }

      e.currentTarget.reset();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <Card className="w-96">
          <CardHeader>
            <CardTitle>LandChain AI Assistant</CardTitle>
            <Button size="icon" className="absolute top-2 right-2" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {msg.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <span className="inline-block p-2 rounded-lg bg-gray-100">Thinking...</span>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit}>
              <div className="flex">
                <input
                  type="text"
                  name="userMessage"
                  placeholder="Ask a question..."
                  className="flex-grow mr-2 p-2 border rounded"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>Send</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
