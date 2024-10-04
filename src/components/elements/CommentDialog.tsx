import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // If you're using Material UI

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ open, onClose, onSubmit }) => {
  const [comment, setComment] = useState<string>('');

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment(''); // Reset the comment after submission
      onClose(); // Close the dialog
    } else {
      // Optionally, handle empty comment submission
      alert('Please enter a comment');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submit Comment</DialogTitle>
      <DialogContent>
        <textarea
          className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter your comment here..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button className="btn-zinc" onClick={onClose}>Cancel</Button>
        <Button className="btn-cyan" onClick={handleCommentSubmit}>Submit Comment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;
