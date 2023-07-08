import React from "react";
//  Interface
interface ModalInterface {
  children: any;
  onClose: () => void;
}
const Modal = ({ children, onClose }: ModalInterface) => {
  return (
    <div className="fixed top-0 z-50 left-0 w-full h-full z-1 flex items-center justify-center">
      {/** Outside click (black overlay) */}
      <div
        className="bg-black opacity-30 absolute top-0 left-0 w-full h-full z-[-1]"
        onClick={onClose}
      ></div>
      {/** Modal content */}

      {children}
    </div>
  );
};

export default Modal;
