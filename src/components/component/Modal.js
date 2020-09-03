import React from "react";
import {
  MODAL_BUTTON,
  MODAL_COLUMN,
  MODAL_OVERLAY,
  MODAL_INNER,
  MODAL_WRAPPER,
  HEADER_COLUMN,
} from "../../styles/index";

export default ({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  name,
  username,
  file,
  size,
  album,
  artist,
}) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };
  return (
    <>
      <MODAL_OVERLAY visible={visible} />
      <MODAL_WRAPPER
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <MODAL_INNER tabIndex="0" className="modal-inner">
          <HEADER_COLUMN>등록자: {username}</HEADER_COLUMN>
          <HEADER_COLUMN>파일명: {file}</HEADER_COLUMN>
          <HEADER_COLUMN>파일크기: {size}MB</HEADER_COLUMN>
          <HEADER_COLUMN>노래제목: {name}</HEADER_COLUMN>
          <HEADER_COLUMN>앨범명: {album}</HEADER_COLUMN>
          <HEADER_COLUMN>가수: {artist}</HEADER_COLUMN>
        </MODAL_INNER>
        {closable && (
          <MODAL_COLUMN>
            <MODAL_BUTTON className="modal-close" onClick={close}>
              닫기
            </MODAL_BUTTON>
          </MODAL_COLUMN>
        )}
      </MODAL_WRAPPER>
    </>
  );
};
