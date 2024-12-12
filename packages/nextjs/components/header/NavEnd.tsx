"use client";

import React from "react";
import { AddressInfoDropdown } from "../scaffold-eth/AddressInfoDropdown";
import { AddressQRCodeModal } from "../scaffold-eth/AddressQRCodeModal";
import { useAuthModal, useSignerStatus } from "@account-kit/react";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useSmartAccount } from "~~/hooks/useSmartAccount";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

export const NavEnd = () => {
  const { isConnected } = useSignerStatus();
  const { targetNetwork } = useTargetNetwork();
  const { account } = useSmartAccount();

  const { openAuthModal } = useAuthModal();

  if (isConnected || account) {
    return (
      <div className="navbar-end flex-grow mr-4">
        {account && (
          <>
            <AddressInfoDropdown
              address={account.address}
              blockExplorerAddressLink={getBlockExplorerAddressLink(targetNetwork, account.address)}
            />
            <AddressQRCodeModal address={account.address} />
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="navbar-end flex-grow mr-4">
        <div className="btn btn-primary" onClick={openAuthModal}>
          Login
        </div>
      </div>
    </>
  );
};
