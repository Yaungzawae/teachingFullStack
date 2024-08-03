import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faCheck, faCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { P } from "../typography/typography";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export function TimeTableCell(props) {
    const { type, role, day, time, userId, changeTimeTable, removeStudent, removedStudents, setRemovedStudents } = props;

    const isTeacher = role === "teacher";
    const isStudent = role === "student";

    const handleStudentAction = () => {
        changeTimeTable(day, time, "A");
    };

    const handleAvailableSlot = () => {
        if (isStudent) {
            changeTimeTable(day, time, "S");
        }
    };

    const handleUnavailableSlot = () => {
        changeTimeTable(day, time, "A");
    };

    const handleRemoveStudent = () => {
        removeStudent(day, time, type);
    };

    return (
        <Fragment>
            {type === userId && isStudent ? (
                <TableCell className="bg-green-600 stripes deg45 border-black border-2" />
            ) : type === "S" ? (
                <TableCell className="bg-green-300 border-black border-2" onClick={handleStudentAction}>
                    {isStudent && <FontAwesomeIcon icon={faCheck} className="text-green-700" />}
                </TableCell>
            ) : type === "A" ? (
                <TableCell className="bg-green-300 border-black border-2" onClick={handleAvailableSlot}>
                    {isStudent && <FontAwesomeIcon icon={faCircle} className="text-white" />}
                    {isTeacher && (
                        <div className="flex justify-end">
                            <ActionDialog
                                icon={faPlus}
                                primaryAction={() => changeTimeTable(day, time, "U")}
                                secondaryAction={changeTimeTable}
                                removedStudents={removedStudents}
                                setRemovedStudents={setRemovedStudents}
                                day={day}
                                time={time}
                            />
                        </div>
                    )}
                </TableCell>
            ) : type === "U" ? (
                <TableCell className="bg-gray-600 border-black border-2">
                    {isTeacher && <div className="flex flex-col justify-center items-end">
                        {<ActionDialog icon={faTrash} primaryAction={handleUnavailableSlot} />}
                    </div>}
                </TableCell>
            ) : (
                <TableCell className="bg-red-300 border-black border-2">
                    <div className="flex justify-between items-center">
                        {isTeacher && 
                        <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {type}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                        }
                        {isTeacher && <ActionDialog icon={faTrash} primaryAction={handleRemoveStudent} />}
                    </div>
                </TableCell>
            )}
        </Fragment>
    );
}

function ActionDialog({ icon, primaryAction, secondaryAction, removedStudents, setRemovedStudents, day, time }) {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleSecondaryAction = () => {
        secondaryAction(day, time, selectedStudent);
        setRemovedStudents(prev => {
            const index = prev.indexOf(selectedStudent);
            if (index > -1) {
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
            }
            return prev;
        });
    };

    const handleStudentSelect = (id) => {
        setSelectedStudent(id);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="filled" className="rounded-full block">
                    <FontAwesomeIcon icon={icon} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                    {removedStudents && (
                        <Fragment>
                            <P>Please Select One Student</P>
                            <RadioGroup defaultValue={null}>
                                {[...new Set(removedStudents)].map(student => (
                                    <div key={student} className="inline px-3">
                                        <RadioGroupItem id={student} value={student} onClick={(e) => handleStudentSelect(e.target.value)} />
                                        <Label htmlFor={student}>{student} ({removedStudents.filter(x => x === student).length} Slots)</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </Fragment>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {primaryAction && <AlertDialogAction onClick={primaryAction}>Delete</AlertDialogAction>}
                    {secondaryAction && <AlertDialogAction onClick={handleSecondaryAction} disabled={selectedStudent==null}>Add Student</AlertDialogAction>}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}