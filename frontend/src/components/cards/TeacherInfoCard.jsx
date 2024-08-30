import { useState } from "react";
import { Card } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faMessage, faEdit } from "@fortawesome/free-solid-svg-icons";
import { H1, H4, P } from "../typography/typography";
import { websiteUrl } from "@/uitility/url";
import TeacherCreateForm from "../forms/TeacherCreateForm";
import { Button } from "../ui/button";
import axios from "axios";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";

const TeacherInfoCard = ({ tr_data, isEditable, isDeleteable }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const onDelete = async () => {
        try {
            await axios.post("/api/teacher/delete", {
                teacher_id: tr_data._id,
            });
            setIsDialogOpen(false); // Close the dialog after deletion
        } catch (err) {
            console.log(err);
        }
    };

    const currentLang = localStorage.getItem("language");
    return (
        <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
            <div className="flex">
                <img 
                    width="125px" 
                    height="125px" 
                    src={`${websiteUrl}/${tr_data.img}`} 
                    className="rounded-full w-[125px] h-[125px]" 
                    alt={currentLang === "en" ? "Teacher" : "教師"}
                />
                <div className="flex flex-col justify-between ml-4">
                    <div>
                        <H1>{tr_data.name}</H1>
                        <p className="text-lg text-muted-foreground">{tr_data.email}</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-md">
                        <div className="flex flex-col sm:flex-row justify-center items-center">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg mr-1" />
                            <p>{currentLang === "en" ? "4.9/5" : "4.9/5"}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center">
                            <FontAwesomeIcon icon={faUser} className="text-yellow-500 text-lg mr-1" />
                            <span>{currentLang === "en" ? "500" : "500"}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center">
                            <FontAwesomeIcon icon={faMessage} className="text-yellow-500 text-lg mr-1" />
                            <span>{currentLang === "en" ? "99.9%" : "99.9%"}</span>
                        </div>
                    </div>
                    {isEditable && (
                        <button
                            className="ml-auto p-2 text-blue-500 hover:text-blue-700"
                            onClick={handleEditClick}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    )}
                </div>
            </div>

            {!isEditing ? (
                <>
                    <H4 className="mt-8">{currentLang === "en" ? "About Me" : "關於我"}</H4>
                    <P>{tr_data.description}</P>
                </>
            ) : (
                <TeacherCreateForm defaultValues={tr_data} onCancel={handleEditClick} />
            )}

            {isDeleteable && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="my-2">
                            {currentLang === "en" ? "Delete" : "刪除"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>{currentLang === "en" ? "Confirm Deletion" : "確認刪除"}</DialogTitle>
                        <DialogDescription>
                            {currentLang === "en" ? "Are you sure you want to delete this teacher? This action cannot be undone." : "您確定要刪除此教師嗎？此操作無法撤銷。"}
                        </DialogDescription>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                                {currentLang === "en" ? "Cancel" : "取消"}
                            </Button>
                            <Button variant="destructive" onClick={onDelete}>
                                {currentLang === "en" ? "Delete" : "刪除"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </Card>
    );
};

export default TeacherInfoCard;
