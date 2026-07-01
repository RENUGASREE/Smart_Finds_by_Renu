'use client'

import { useActionState } from 'react'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await login(formData);
    },
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-3xl border">
        <CardHeader className="space-y-2 text-center pb-8 pt-8">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="renu@example.com"
                required
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="h-12 rounded-xl"
              />
            </div>
            {state?.error && (
              <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-lg text-center">
                {state.error}
              </div>
            )}
          </CardContent>
          <CardFooter className="pb-8">
            <Button className="w-full h-12 rounded-xl text-md" type="submit" disabled={isPending}>
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
