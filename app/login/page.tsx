'use client'

import {useState} from 'react';
import {useLoginWithEmail} from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

export default function LoginWithEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const {sendCode, loginWithCode} = useLoginWithEmail();

  const handleSendCode = async () => {
    setIsSendingCode(true);
    try {
      await sendCode({email});
      setIsCodeSent(true);
    } catch (error) {
      toast.error("Error sending code");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithCode({code});
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          <p className="text-gray-500">
            {isCodeSent 
              ? `Enter the verification code sent to ${email}`
              : 'Enter your email to receive a login code'
            }
          </p>
        </div>

        <div className="space-y-6">
          {!isCodeSent ? (
            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="flex gap-2 mt-2">
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  onChange={(e) => setEmail(e.currentTarget.value)} 
                  value={email}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={handleSendCode}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSendingCode}
                  loading={isSendingCode}
                >
                  Send Code
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label htmlFor="code" className="text-sm font-medium text-gray-700">
                Verification code
              </label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter verification code"
                  className="w-full"
                  onChange={(e) => setCode(e.currentTarget.value)}
                  value={code}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoggingIn}
                  loading={isLoggingIn}
                >
                  Login
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsCodeSent(false)}
                  className="w-full"
                  variant="outline"
                >
                  Use different email
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}