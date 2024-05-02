"use client";

import { useExportAccount } from "@alchemy/aa-alchemy/react";
import type { NextPage } from "next";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

declare global {
  interface HTMLDialogElement extends HTMLElement {
    showModal(): void;
  }
}

const Home: NextPage = () => {
  const { writeContractAsync } = useScaffoldWriteContract("AlchemyU");

  const { exportAccount, isExported, isExporting, ExportAccountComponent } = useExportAccount();

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <button
        className="btn btn-primary"
        onClick={async () => {
          try {
            await writeContractAsync({
              functionName: "mint",
              args: [999999n],
            });
          } catch (e) {
            console.error("Error setting greeting:", e);
          }
        }}
      >
        Mint 999999 tokens
      </button>

      {!isExported ? (
        <button
          onClick={() => {
            console.log("export account!");
            exportAccount();
          }}
          disabled={isExporting}
        >
          Export Account
        </button>
      ) : (
        <strong>Seed Phrase</strong>
      )}
      <ExportAccountComponent className="w-full" isExported={isExported} />
    </div>
  );
};

export default Home;
