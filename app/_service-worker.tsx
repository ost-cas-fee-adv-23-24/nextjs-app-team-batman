/* eslint-disable no-console */
'use client';
import { useEffect } from 'react';

export const ServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          async function (registration) {
            console.log('🔥');
            console.log('Service Worker registration successful with scope: ', registration.scope);
            if (navigator.onLine) {
              await registration.update();
            }
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          },
        );
      });
    }
  }, []);

  return null;
};
