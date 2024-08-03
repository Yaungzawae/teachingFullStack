import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/auth/LoginForm"


const StudentLoginPage = () => {

    return (
        <div className="h-[90vh] flex justify-center items-center bg-[url('@/assets/bkk.jpg')] bg-cover">
            <Card className="w-[90%] sm:w-1/2 lg:w-1/3 min-h-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">
                        Student Login
                    </CardTitle>
                </CardHeader>
                <CardContent className="w-3/4 mx-auto h-full mt-10">
                    <LoginForm type="student"/>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudentLoginPage