export class DeletedCommentDTO {
  userId: string;
  createdAt: Date;
  review: {
    userId: string;
  };
}
