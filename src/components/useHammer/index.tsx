import React, { useContext } from 'react';

type O = Record<string, any>;

const StateContext = React.createContext<O>({});

export function createModal(hook: () => O) {
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <StateContext.Provider value={hook()}>{children}</StateContext.Provider>
  );
  return Provider;
}

export function useModel() {
  return useContext(StateContext);
}
