import { createContext, useContext } from "react";
import { useAccount, useSmartAccountClient } from "@account-kit/react";

type SmartAccountContextType = {
  client: ReturnType<typeof useSmartAccountClient>["client"];
  account: ReturnType<typeof useAccount>["account"];
  isLoadingAccount: boolean;
  isLoadingClient: boolean;
  address: string | undefined;
};

const SmartAccountContext = createContext<SmartAccountContextType | undefined>(undefined);

export function SmartAccountProvider({ children }: { children: React.ReactNode }) {
  const { account, address, isLoadingAccount } = useAccount({
    type: "LightAccount",
  });
  const { client, isLoadingClient } = useSmartAccountClient({
    type: "LightAccount",
  });

  const value = {
    client,
    account,
    address,
    isLoadingAccount,
    isLoadingClient,
  };

  return <SmartAccountContext.Provider value={value}>{children}</SmartAccountContext.Provider>;
}

export function useSmartAccount() {
  const context = useContext(SmartAccountContext);
  if (!context) {
    throw new Error("useSmartAccount must be used within a SmartAccountProvider");
  }
  return context;
}
