import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center page-container p-4">
      <div className="w-full max-w-md">
        <Card className="card-enhanced">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-12 w-12 bg-destructive/10 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access this page. Please contact your administrator if you believe this is an error.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}