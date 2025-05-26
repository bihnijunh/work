"use client";

import React, { useState } from 'react';
import { SenderConfiguration } from '@/components/SenderConfiguration';

export default function SenderDemoPage() {
  const [paypalSender, setPaypalSender] = useState('');
  const [zelleSender, setZelleSender] = useState('');
  const [chimeSender, setChimeSender] = useState('');
  const [cashappSender, setCashappSender] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🎯 Random Email Sender Generator Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test the random email sender generator for all services. Each service can generate
            realistic department suffixes like "mt", "dp", "ops", "mgmt", etc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PayPal Sender */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💙 PayPal Sender
            </h2>
            <SenderConfiguration
              service="paypal"
              currentSender={paypalSender}
              onSenderChange={setPaypalSender}
            />
          </div>

          {/* Zelle Sender */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💜 Zelle Sender
            </h2>
            <SenderConfiguration
              service="zelle"
              currentSender={zelleSender}
              onSenderChange={setZelleSender}
            />
          </div>

          {/* Chime Sender */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💚 Chime Sender
            </h2>
            <SenderConfiguration
              service="chime"
              currentSender={chimeSender}
              onSenderChange={setChimeSender}
            />
          </div>

          {/* Cash App Sender */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💰 Cash App Sender
            </h2>
            <SenderConfiguration
              service="cashapp"
              currentSender={cashappSender}
              onSenderChange={setCashappSender}
            />
          </div>
        </div>

        {/* Current Senders Summary */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            📧 Current Senders Summary
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">PayPal:</p>
              <p className="text-sm text-blue-600 dark:text-blue-300 font-mono break-all">
                {paypalSender || 'Not configured'}
              </p>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Zelle:</p>
              <p className="text-sm text-purple-600 dark:text-purple-300 font-mono break-all">
                {zelleSender || 'Not configured'}
              </p>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Chime:</p>
              <p className="text-sm text-green-600 dark:text-green-300 font-mono break-all">
                {chimeSender || 'Not configured'}
              </p>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Cash App:</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-300 font-mono break-all">
                {cashappSender || 'Not configured'}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ✨ Gmail Display Examples
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Gmail will show:</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-blue-600 dark:text-blue-300">📧 <strong>PayPal Support Agency</strong> (not domain)</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">📧 <strong>Zelle Support Agency</strong> (not domain)</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">📧 <strong>Chime Support Agency</strong> (not domain)</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">📧 <strong>Cash App Support Agency</strong> (not domain)</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">🎲 Random Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generates realistic department suffixes automatically
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">✏️ Custom Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allows manual entry of custom sender addresses
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">🔄 Always Different</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Each email uses a different random suffix for authenticity
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">🏢 Professional</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Short, clean names that look authentic in Gmail
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
