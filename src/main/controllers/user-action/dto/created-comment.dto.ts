export class CreatedCommentDTO {
  userId: string;
  createdAt: Date;
  review: {
    userId: string;
  };
}
