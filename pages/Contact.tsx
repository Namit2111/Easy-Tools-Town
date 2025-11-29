import React from 'react';
import NeoCard from '../components/NeoCard';
import NeoButton from '../components/NeoButton';

const Contact = () => (
  <div className="max-w-2xl mx-auto p-6 min-h-screen text-black">
    <NeoCard title="Get In Touch" color="bg-[#ffc6ff]">
      <form className="space-y-3">
        <div>
          <label className="block font-bold text-xs mb-1.5 uppercase">Your Name</label>
          <input type="text" className="w-full p-2.5 text-sm border-2 border-black focus:outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label className="block font-bold text-xs mb-1.5 uppercase">Email</label>
          <input type="email" className="w-full p-2.5 text-sm border-2 border-black focus:outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block font-bold text-xs mb-1.5 uppercase">Message</label>
          <textarea className="w-full p-2.5 text-sm border-2 border-black h-24 focus:outline-none" placeholder="What is on your mind?"></textarea>
        </div>
        <NeoButton type="submit" className="text-sm">SEND IT</NeoButton>
      </form>
    </NeoCard>
  </div>
);

export default Contact;