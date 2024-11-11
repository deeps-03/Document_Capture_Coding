import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: 'bg-green-900/50 border-green-700',
  error: 'bg-red-900/50 border-red-700',
  info: 'bg-blue-900/50 border-blue-700',
};

export function Notification({ type, message, onClose }: NotificationProps) {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification fixed top-4 right-4 ${colors[type]} border rounded-lg p-4 shadow-lg flex items-start max-w-sm`}>
      <Icon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}