import TeacherCreateForm from "@/components/forms/TeacherCreateForm";
import { H1 } from "@/components/typography/typography";

const AdminPage = (props) => {
    return (
        <div>
            <div className="text-center">
                <H1>ADMIN</H1>
            </div>
            <TeacherCreateForm/>

        </div>
    )
}

export default AdminPage;