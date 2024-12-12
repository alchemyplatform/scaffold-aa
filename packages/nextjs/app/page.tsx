"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BookOpenIcon, BugAntIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useSmartAccount } from "~~/hooks/useSmartAccount";

declare global {
  interface HTMLDialogElement extends HTMLElement {
    showModal(): void;
  }
}

const Home: NextPage = () => {
  const { account } = useSmartAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-AA</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={account?.address} />
          </div>
          <p className="text-center text-lg">
            Scaffold AA is a fork of{" "}
            <Link href="https://scaffoldeth.io/" passHref className="link" rel="noopener noreferrer" target="_blank">
              ETH Scaffold 2
            </Link>{" "}
            using{" "}
            <Link
              href="https://accountkit.alchemy.com/getting-started/overview.html"
              passHref
              className="link"
              rel="noopener noreferrer"
              target="_blank"
            >
              Alchemy Embedded Accounts
            </Link>{" "}
          </p>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>

            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BookOpenIcon className="h-8 w-8 fill-secondary" />
              <p>
                Learn more about the aa-sdk in the{" "}
                <Link
                  href="https://accountkit.alchemy.com/"
                  passHref
                  className="link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Account Kit docs
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
