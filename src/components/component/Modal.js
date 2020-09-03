import React from "react";
import {
  MODAL_BUTTON,
  MODAL_COLUMN,
  MODAL_OVERLAY,
  MODAL_INNER,
  MODAL_WRAPPER,
} from "../../styles/index";

export default ({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
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
          {children}
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
