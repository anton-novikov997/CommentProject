import React, { useState } from 'react';
import { useReplyCommentMutation } from '../api/commentApi';
import { usePortal } from '../hooks/usePortal';
import { createPortal } from 'react-dom';
import {
  ModalContent,
  ModalForm,
  ReplyCommentAdd,
  ReplyCommentAddContainer,
  ReplyModalTextArea,
} from './styledComponents/StyledComponents';

interface ReplyFormProps {
  parentId: string;
  onClose: () => void;
}

export const ReplyModalForm: React.FC<ReplyFormProps> = ({
  parentId,
  onClose,
}) => {
  const [content, setContent] = useState('');
  const [addReplyComment] = useReplyCommentMutation();

  const isDisabledReplyAdd = content.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReplyComment({
      parentId: parentId,
      content,
      username: 'Jane Doe',
      avatar: '/img/default-avatar.jpg',
      userId: null,
    });
    setContent('');
    onClose();
  };
  const portalAddReplyModal = usePortal('ReplyModalForm');
  return createPortal(
    <ModalForm>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ReplyModalTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add new reply"
          />
          <ReplyCommentAddContainer>
            <ReplyCommentAdd
              isDisabledFormAdd={isDisabledReplyAdd}
              type="submit"
              disabled={isDisabledReplyAdd}
            >
              Ответить
            </ReplyCommentAdd>
          </ReplyCommentAddContainer>
        </form>
      </ModalContent>
    </ModalForm>,
    portalAddReplyModal,
  );
};
