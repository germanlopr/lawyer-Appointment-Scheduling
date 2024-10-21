import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to LegalScheduler</h1>
      <p className="text-xl mb-8">Effortlessly schedule appointments with top legal professionals</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Calendar className="w-12 h-12 text-blue-500" />}
          title="Easy Scheduling"
          description="Book appointments with just a few clicks"
        />
        <FeatureCard
          icon={<Clock className="w-12 h-12 text-green-500" />}
          title="Flexible Timing"
          description="Choose from a wide range of available time slots"
        />
        <FeatureCard
          icon={<MessageCircle className="w-12 h-12 text-purple-500" />}
          title="Instant Notifications"
          description="Receive reminders via Telegram and WhatsApp"
        />
      </div>
      <Link
        to="/register"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;