
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Login } from "@/utils/supabaseClient";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  const handleLogin = async(e)=>{
      
        e.preventDefault();
        try {
          await Login(email, password);
          toast.success('Login Successfull')
          navigate('/dashboard')
        } catch (error) {
          toast.error(error.message);
        }
        
     
  }
  
  return (
    <>
    <div className="flex flex-col gap-7">
      <Card className="border-none shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold mt-4">Welcome Again</CardTitle>
          <CardDescription className="text-xs">
            Login to your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  className="rounded-none outline-none shadow-2xs"
                  value={email} onChange={(e) => setEmail(e.target.value)}

                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-none outline-none shadow-2xs" id="password" type="password" required />
                </div>
                <Button className="w-full border rounded-none shadow-2xl bg-black text-white hover:bg-gray-900 cursor-pointer border-none hover:text-white" type="submit">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signupForm" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
