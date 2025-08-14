import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, User, Users, BookOpen, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth, Role } from "@/context/AuthContext"

export default function Login() {
  const [step, setStep] = useState<'role' | 'credentials'>('role')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { login } = useAuth()

  const roles = [
    { 
      key: 'admin' as Role, 
      title: 'Administrator', 
      description: 'Manage users, locations, and system settings',
      icon: Users,
      color: 'bg-primary'
    },
    { 
      key: 'instructor' as Role, 
      title: 'Instructor', 
      description: 'Manage students, roll calls, and communications',
      icon: BookOpen,
      color: 'bg-accent'
    },
    { 
      key: 'student' as Role, 
      title: 'Student', 
      description: 'Check in/out, view schedule, and communicate',
      icon: User,
      color: 'bg-success'
    },
    { 
      key: 'parent' as Role, 
      title: 'Parent', 
      description: 'Monitor children and approve leave requests',
      icon: Heart,
      color: 'bg-warning'
    }
  ]

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setStep('credentials')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return
    
    setIsLoading(true)

    try {
      const success = await login(selectedRole, { username, password })
      
      if (success) {
        toast({
          title: "Login successful",
          description: `Welcome to Student Life Manager!`,
        })
        navigate("/")
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setStep('role')
    setSelectedRole(null)
    setUsername("")
    setPassword("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center page-container p-4">
      <div className="w-full max-w-md">
        <Card className="card-enhanced">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-12 w-12 bg-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                {step === 'role' ? 'Select Your Role' : `Login as ${selectedRole}`}
              </CardTitle>
              <CardDescription>
                {step === 'role' 
                  ? 'Choose your role to continue' 
                  : 'Enter your credentials to access the dashboard'
                }
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {step === 'role' ? (
              <div className="space-y-3">
                {roles.map((role) => (
                  <Button
                    key={role.key}
                    variant="outline"
                    className="w-full h-auto p-4 justify-start text-left"
                    onClick={() => handleRoleSelect(role.key)}
                  >
                    <div className={`h-10 w-10 ${role.color} rounded-lg flex items-center justify-center mr-4`}>
                      <role.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{role.title}</div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={`Enter your ${selectedRole} username`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 font-medium" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}