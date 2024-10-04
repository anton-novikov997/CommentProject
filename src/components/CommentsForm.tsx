import React, { useCallback, useState } from 'react';
import { useAddCommentMutation } from '../api/commentApi';
import { AiOutlineBold, AiOutlineItalic, AiOutlineLink } from 'react-icons/ai';
import {
  Avatar,
  IconButton,
  IconContainer,
  FormContainer,
  Username,
  TextArea,
  ButtonsContainer,
  AddCommentButton,
  CommentFormAvNameContainer,
} from './styledComponents/StyledComponents';

export interface CommentFormProps {
  parentId?: number | null;
  username: string;
  avatar?: string;
  initialContent?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
                                                          parentId,
                                                          username,
                                                          avatar,
                                                          initialContent,
                                                        }) => {
  const [addComment] = useAddCommentMutation();

  const [content, setContent] = useState(initialContent || '');

  const isDisabledFormAdd = content.length === 0;

  const handleTextFormatClick = useCallback((tag: string) => {
    const newText = `${tag}${content}${tag}`;
    setContent(newText);
  }, [content]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content) {
      const newComment = {
        content,
        parentId: parentId || null,
        userId: 1,
        avatar: '/img/avatar1.jpg',
        username: username,
        createdAt: new Date().toISOString(),
        like: 0,
        dislike: 0,
      };

      try {
        await addComment(newComment);
        setContent('');
      } catch (error) {
        console.error('Failed to add comment', error);
      }
    }
  }, [content, addComment, parentId, username]);

  return (
    <FormContainer>
      <CommentFormAvNameContainer>
        <Avatar src={avatar} alt={username} />
        <Username>{'John Doe'}</Username>
      </CommentFormAvNameContainer>
      <form onSubmit={handleSubmit}>
        <TextArea
          id="commentTextarea"
          placeholder="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <ButtonsContainer>
          <IconContainer>
            <IconButton
              isDisabledFormAdd={isDisabledFormAdd}
              title="Bold"
              onClick={() => handleTextFormatClick('<b>')}
              disabled={isDisabledFormAdd}
            >
              <AiOutlineBold />
            </IconButton>
            <IconButton
              isDisabledFormAdd={isDisabledFormAdd}
              title="Italic"
              onClick={() => handleTextFormatClick('<em>')}
              disabled={isDisabledFormAdd}
            >
              <AiOutlineItalic />
            </IconButton>
            <IconButton isDisabledFormAdd={isDisabledFormAdd} title="Link">
              <AiOutlineLink />
            </IconButton>
          </IconContainer>
          <AddCommentButton
            isDisabledFormAdd={isDisabledFormAdd}
            type="submit"
            disabled={isDisabledFormAdd}
          >
            Comment
          </AddCommentButton>
        </ButtonsContainer>
      </form>
    </FormContainer>
  );
};
