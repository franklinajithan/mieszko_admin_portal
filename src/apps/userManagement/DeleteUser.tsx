import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteUserProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteUser = ({ open, onClose, onDelete }: DeleteUserProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>

            
               
            <DialogTrigger>
                Delete User
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-lg bg-white shadow-lg">
                <DialogHeader className="text-left">
                    <DialogTitle className="text-lg font-semibold text-red-600  rounded-t-lg">
                        Delete User
                    </DialogTitle>
                </DialogHeader>
                

                <div>
                    <p className="text-gray-800">Are you sure you want to delete this user? This action cannot be undone.</p>
                </div>
                <DialogFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose} className="btn-zinc">
                        Cancel
                    </Button>
                    <Button color="red" onClick={onDelete} className="btn-danger">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteUser;
