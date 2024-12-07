/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

interface ModalState {
  isOpen: boolean;
  data?: any;
}

interface ModalStates {
  [key: string]: ModalState;
}

export const useModalManager = (initialModals: string[]) => {
  const [modals, setModals] = useState<ModalStates>(
    initialModals.reduce((acc, modalName) => ({
      ...acc,
      [modalName]: { isOpen: false, data: null }
    }), {})
  );

  const openModal = useCallback((modalName: string, data?: any) => {
    setModals(prev => ({
      ...prev,
      [modalName]: { isOpen: true, data }
    }));
  }, []);

  const closeModal = useCallback((modalName: string) => {
    setModals(prev => ({
      ...prev,
      [modalName]: { isOpen: false, data: null }
    }));
  }, []);

  const getModalState = useCallback((modalName: string): ModalState => {
    return modals[modalName] || { isOpen: false, data: null };
  }, [modals]);

  return {
    modals,
    openModal,
    closeModal,
    getModalState
  };
};