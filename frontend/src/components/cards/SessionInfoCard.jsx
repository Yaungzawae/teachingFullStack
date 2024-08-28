import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { H3, H4, Muted } from "@/components/typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import CourseEditForm from '../forms/CourseEditForm';

import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '../ui/button';
import PaymentDialog from '../dialogs/PaymentDialog';
import UserHoverCard from '../hoverCards/User';

const SessionInfoCard = ({ sessions_data, editable = false, bookable = false, onBook }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionToDelete, setCourseToDelete] = useState(null);

  const confirmDelete = (sessionId) => {
    setCourseToDelete(sessionId);
    setShowDeleteConfirm(true);
  };

  const onDelete = async () => {
    if (!sessionToDelete) return;
    try {
      await axios.post(
        "/api/session/delete-session",
        { class_id: sessionToDelete },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowDeleteConfirm(false);
      setCourseToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
      <CardContent className="flex flex-col gap-x-8 gap-y-1">
        {sessions_data.map((session) => (
          <React.Fragment key={session._id}>
              <>
                <div className="flex justify-between items-center">
                  <div className="max-w-[66%]">
                    <H3>{session.title}</H3>
                    <p>{session.date}</p>
                    <p>{session.start_time} to {session.end_time}</p>
                    <Muted>{session.description}</Muted>
                  </div>
                  <div>
                    <H4>{session.price}$</H4>
                    <p>{session.isBooked ? "Not Available" : "Available"}</p>
                  </div>
                </div>
                {editable && (
                  <div className="mb-6 flex gap-4">
                    <Button onClick={() => onEdit(session)}>Edit</Button>
                    <p>Student</p>
                    <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                      <DialogTrigger asChild>
                        <Button onClick={() => confirmDelete(session._id)}>Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p>Are you sure you want to delete this session?</p>
                          <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={onDelete}>Delete</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                {
                    session.isBooked && !bookable && 
                    <UserHoverCard userId={session.student}/>
                }
                 {
                    bookable &&  <div className="mb-6">
                        <Button className="bg-green-600 hover:bg-green-700 mr-2 w-auto" onClick={() => onBook(session)}>Enroll Now</Button>
                    </div>
                    }
              </>
            
            <hr />
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default SessionInfoCard;
