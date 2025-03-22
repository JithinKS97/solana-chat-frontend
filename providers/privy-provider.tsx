'use client';

import {PrivyProvider as Privy} from '@privy-io/react-auth';
 
export default function PrivyProvider({children}: {children: React.ReactNode}) {
  return (
    <Privy
      appId="cm8jig00e00d6hdzpr4dwxjvs"
      clientId="client-WY5i2UXCak2k2ct2rgbmVgfNnPbYfv2bcTWfHSxpcUppW"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url'
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      {children}
    </Privy>
  );
}