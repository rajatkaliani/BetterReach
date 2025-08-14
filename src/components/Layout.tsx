import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'instructor':
        return 'bg-accent/10 text-accent-foreground border-accent/20'
      case 'student':
        return 'bg-success/10 text-success border-success/20'
      case 'parent':
        return 'bg-warning/10 text-warning border-warning/20'
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  }

  const getUserInitials = () => {
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase()
    }
    return user?.role?.substring(0, 2).toUpperCase() || 'U'
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full page-container">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-lg font-semibold text-foreground">Student Life Manager</h1>
                {user && (
                  <Badge variant="outline" className={getRoleColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                )}
              </div>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}